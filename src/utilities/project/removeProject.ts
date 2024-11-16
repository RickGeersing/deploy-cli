import { prismaClient } from "../prismaClient";

export async function removeProject(name: string): Promise<void> {
    await prismaClient.project.delete({
        where: {
            name,
        },
    });
}