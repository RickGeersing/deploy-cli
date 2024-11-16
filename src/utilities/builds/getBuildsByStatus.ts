import type { Build } from "@prisma/client";
import { prismaClient } from "../prismaClient";
import { BuildStatus } from "./buildStatus";

export async function getBuildsByStatus(status: BuildStatus): Promise<Build[]> {
    return prismaClient.build.findMany({
        where: {
            status,
        },
        select: {
            id: true,
            status: true,
            commit: true,
            createdAt: true,
            updatedAt: true,
            projectId: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
}