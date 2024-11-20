import type { Build, Project } from "@prisma/client";
import { prismaClient } from "../prismaClient";
import { BuildStatus } from "./buildStatus";
import { logger } from "../logging";

export async function createBuildEntry(project: Project, commitHash: string): Promise<Build> {
    try {
        logger.info(`[UPDATE] Added a build for "${project.name}" to build queue ...`);

        return prismaClient.build.create({
            data: {
                project: {
                    connect: {
                        id: project.id,
                    },
                },
                status: BuildStatus.PENDING,
                commit: commitHash,
            },
        });
    }
    catch (e) {
        throw new Error(`Failed to create build for ${project.name}`);
    }
}