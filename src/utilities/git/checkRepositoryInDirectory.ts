import { $ } from "bun";

export async function checkRepositoryInDirectory(path: string): Promise<void> {
    try {
        await $`git status`.cwd(path).quiet();
    } catch (e) {
        throw new Error(`Directory ${path} is not a git repository`);
    }
}