import type { Project } from "@prisma/client";
import { $ } from "bun";

export async function pullChanges(project: Project) {
    try {
        console.log(`Pulling latest changes for "${project.name}" ...`);
        await $`git pull`.cwd(project.path).quiet();
    }
    catch (e) {
        throw new Error(`Failed to pull latest changes for "${project.name}"`);
    }
}