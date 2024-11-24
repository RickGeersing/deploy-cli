import type { Project } from "@prisma/client";
import { $ } from "bun";
import { logger } from "../logging";

export async function pullChanges(project: Project) {
    try {
        await $`git pull`.cwd(project.path).quiet();
    }
    catch (e) {
        throw new Error(`Failed to pull latest changes for "${project.name}"`);
    }
}