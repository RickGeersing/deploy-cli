import { checkWorkingDirectory } from "../../../utilities/checkWorkingDirectory";
import { checkRepositoryInDirectory } from "../../../utilities/git/checkRepositoryInDirectory";
import type { CommandLineArgs } from "../../../utilities/parseCommandLineArgs";
import { addProject } from "../../../utilities/project/addProject";
import { getProjectByName } from "../../../utilities/project/getProjectByName";
import { readDeployConfig } from "../../../utilities/readDeployConfig";
import { MissingArgumentError } from "../../errors/missingArgumentError";
import { commands } from "../commands";

export async function addCommand(args: CommandLineArgs): Promise<void> {
    if (args.positionals.length === 3) {
        throw new MissingArgumentError('path', commands.add.usage);
    }

    const path = args.positionals[3];

    await checkWorkingDirectory(path);
    await checkRepositoryInDirectory(path);
    const config = await readDeployConfig(path);

    const name = args.positionals[4] || config.name;
    const project = await getProjectByName(name);
    if (project) {
        throw new Error(`Project with name "${name}" already exists`);
    }

    await addProject(name, path);
    console.log(`Project "${name}" added`);
}