import type { Build, Project } from "@prisma/client";
import { prismaClient } from "../prismaClient";
import { BuildStatus } from "./buildStatus";

export async function createBuildEntry(project: Project, commitHash: string): Promise<Build> {
    try {
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