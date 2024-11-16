import type { Project } from "@prisma/client";
import { prismaClient } from "../prismaClient";

export async function getAllProjects(): Promise<Project[]> {
    return prismaClient.project.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            path: true,
        }
    });
}
