import type { Project } from "@prisma/client";
import { prismaClient } from "../prismaClient";

export async function getProjectByName(name: string): Promise<Project | null> {
    return prismaClient.project.findUnique({
        where: {
            name,
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            path: true,
        }
    });
}