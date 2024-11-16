import type { Build } from "@prisma/client";
import { prismaClient } from "../prismaClient";
import type { BuildStatus } from "./buildStatus";

export async function updateBuildStatus(build: Build, status: BuildStatus): Promise<void> {
    await prismaClient.build.update({
        where: {
            id: build.id,
        },
        data: {
            status,
        },
    });
}

export async function updateBuildStatusBulk(builds: Build[], status: BuildStatus): Promise<void> {
    await prismaClient.build.updateMany({
        where: {
            id: {
                in: builds.map((b) => b.id),
            },
        },
        data: {
            status,
        },
    });
}