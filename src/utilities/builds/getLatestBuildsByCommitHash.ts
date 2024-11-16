import type { Build, Project } from "@prisma/client";
import { prismaClient } from "../prismaClient";

export async function getLatestBuildByCommitHash(project: Project, commitHash: string): Promise<Build | null> {
    return prismaClient.build.findFirst({
        where: {
            projectId: project.id,
            commit: commitHash,
        },
        select: {
            id: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            projectId: true,
            commit: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
    });
}