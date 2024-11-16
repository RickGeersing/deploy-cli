import type { Project } from "@prisma/client";
import { $ } from "bun";
import { logger } from "../logging";

export async function checkCommits(project: Project): Promise<{ localHash: string, remoteHash: string }> {
    try {
        logger.info(`Checking for new commits on "${project.name}" ...`);

        await $`git fetch --all`.cwd(project.path).quiet();
        const branch = await currentBranch(project.path);

        const localHash = await latestCommitHash(project.path, branch);
        const remoteHash = await latestCommitHash(project.path, `origin/${branch}`);

        return {
            localHash,
            remoteHash
        }
    }
    catch (e) {
        throw new Error(`Failed to check local and remote commit hash for "${project.name}"`);
    }
}

async function latestCommitHash(path: string, branch: string): Promise<string> {
    const hash = await $`git rev-parse ${branch}`
        .cwd(path)
        .quiet()
        .text();
    return hash.trim();
}

async function currentBranch(path: string): Promise<string> {
    const branch = await $`git rev-parse --abbrev-ref HEAD`
        .cwd(path)
        .quiet()
        .text();
    return branch.trim();
}