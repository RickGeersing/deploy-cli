import { $ } from "bun";
import { DirectoryNotFoundError } from "../cli/errors/directoryNotFoundError";
import { UnknownError } from "../cli/errors/unknownError";

export async function checkWorkingDirectory(path: string): Promise<void> {
    try {

        await $.cwd(path)
        await $`ls`.quiet();
    } catch (e) {
        if (e instanceof Error && e.name === "ENOENT") {
            throw new DirectoryNotFoundError(path);
        }
        throw new UnknownError('Unknown error occurred while changing working directory');

    }
}