import type { Project } from "@prisma/client";
import { prismaClient } from "../prismaClient";

export async function getProjectById(id: string): Promise<Project | null> {
    return prismaClient.project.findUnique({
        where: {
            id,
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