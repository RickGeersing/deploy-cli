import type { Build } from "@prisma/client";
import { prismaClient } from "../prismaClient";

type GetLatestBuildsResult = Omit<Build & { projectName: string }, 'projectId' | 'updatedAt'>[];

export async function getLatestBuilds(): Promise<GetLatestBuildsResult> {
    return prismaClient.build.findMany({
        select: {
            id: true,
            status: true,
            createdAt: true,
            projectId: true,
            commit: true,
            project: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    }).then((builds) => {
        return builds.map((build) => ({
            id: build.id,
            status: build.status,
            createdAt: build.createdAt,
            commit: build.commit,
            projectName: build.project.name
        }))
    })
}