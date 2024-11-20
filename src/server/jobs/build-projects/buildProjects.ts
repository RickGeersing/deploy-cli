import type { Build } from "@prisma/client";
import { BuildStatus } from "../../../utilities/builds/buildStatus";
import { getBuildsByStatus } from "../../../utilities/builds/getBuildsByStatus";
import { updateBuildStatus, updateBuildStatusBulk } from "../../../utilities/builds/updateBuildStatus";
import { logger } from "../../../utilities/logging";
import { checkWorkingDirectory } from "../../../utilities/checkWorkingDirectory";
import { getProjectById } from "../../../utilities/project/getProjectById";
import { BuildProjectError } from "../../errors/buildProjectError";
import { checkRepositoryInDirectory } from "../../../utilities/git/checkRepositoryInDirectory";
import { readDeployConfig } from "../../../utilities/readDeployConfig";
import { $ } from "bun";


export async function buildProjects(): Promise<void> {
    try {
        if (!process.env.MAX_CONCURRENT_BUILDS || Number.isNaN(process.env.MAX_CONCURRENT_BUILDS)) {
            throw new Error("MAX_CONCURRENT_BUILDS is missing or not a number, aborting building projects ...");
        }
        // Get all running and pending builds
        const runningBuilds = await getBuildsByStatus(BuildStatus.RUNNING);
        const pendingBuilds = await getBuildsByStatus(BuildStatus.PENDING)
            .then((pendingBuilds) => // Filter out pending builds for projects that already have a running build
                pendingBuilds.filter((pb) => !runningBuilds.some((rb) => rb.projectId === pb.projectId))
            );

        if (pendingBuilds.length === 0) {
            logger.info("[BUILD] No pending builds to run at the moment, aborting ...");
            return;
        }

        // Create a list of builds to cancel
        // If there are multiple pending builds for the same project, only the latest one should run
        const buildsToCancel: Build[] = [];
        const latestPendingBuilds = pendingBuilds.reduce((acc, build) => {
            const existingBuild = acc.get(build.projectId);

            if (!existingBuild || existingBuild.createdAt < build.createdAt) {
                acc.set(build.projectId, build);
            }

            if (existingBuild && existingBuild.createdAt > build.createdAt) {
                buildsToCancel.push(build);
            } else if (existingBuild && existingBuild.createdAt < build.createdAt) {
                buildsToCancel.push(existingBuild);
            }
            return acc;
        }, new Map<string, Build>());

        if (buildsToCancel.length > 0) {
            await updateBuildStatusBulk(buildsToCancel, BuildStatus.CANCELLED);
        }

        // Run the latest pending builds if there are available build slots
        const buildsToRun = Array.from(latestPendingBuilds.values())
            .slice(0, Number(process.env.MAX_CONCURRENT_BUILDS) - runningBuilds.length);

        if (buildsToRun.length === 0) {
            logger.info("[BUILD] No builds can be run at the moment, aborting ...");
            return;
        }

        await updateBuildStatusBulk(buildsToRun, BuildStatus.RUNNING);
        await Promise.all(buildsToRun.map(buildProject));
    } catch (error) {
        logger.error(error);
    }
}

async function buildProject(build: Build): Promise<void> {
    try {
        const project = await getProjectById(build.projectId);

        if (!project) {
            throw new BuildProjectError(`Project with id ${build.projectId} not found`, build.projectId);
        }

        logger.info(`[BUILD] Starting build for project ${project.name}`);
        await checkWorkingDirectory(project.path);
        await checkRepositoryInDirectory(project.path);
        const config = await readDeployConfig(project.path);

        for (const command of config.commands) {
            try {
                logger.info(`[BUILD] Running command: ${command} for project ${project.name}`);
                await $`${{ raw: command }}`.cwd(project.path).quiet();
            } catch (error) {
                throw new BuildProjectError(`Failed to run command ${command}`, project.id, project.name);
            }
        }

        await updateBuildStatus(build.id, BuildStatus.SUCCESS);
        logger.info(`[BUILD] Successfully built project ${project.name}`);

    } catch (error) {
        if (error instanceof BuildProjectError) {
            await updateBuildStatus(build.id, BuildStatus.FAILED);
            logger.error(`[BUILD] Failed to build project ${error.projectName ?? error.projectId}: ${error.message}`);
        }
    }
}