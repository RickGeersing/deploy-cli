import { prismaClient } from "../prismaClient";

export async function addProject(name: string, path: string): Promise<void> {
    await prismaClient.project.create({
        data: {
            name,
            path
        }
    });
}