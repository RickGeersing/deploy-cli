import type { Project } from "@prisma/client";
import { checkWorkingDirectory } from "../checkWorkingDirectory";
import { checkRepositoryInDirectory } from "../git/checkRepositoryInDirectory";
import { deployConfigSchema, readDeployConfig } from "../readDeployConfig";
import type { z } from "zod";

export async function projectPrechecks(path: string): Promise<z.infer<typeof deployConfigSchema>> {
    await checkWorkingDirectory(path);
    await checkRepositoryInDirectory(path);
    const config = await readDeployConfig(path);

    return config;
}