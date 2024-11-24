import type { CommandLineArgs } from "../../../utilities/parseCommandLineArgs";
import { addProject } from "../../../utilities/project/addProject";
import { getProjectByName } from "../../../utilities/project/getProjectByName";
import { projectPrechecks } from "../../../utilities/project/projectPrechecks";
import { MissingArgumentError } from "../../errors/missingArgumentError";
import { commands } from "../commands";

export async function addCommand(args: CommandLineArgs): Promise<void> {
    if (args.positionals.length === 3) {
        throw new MissingArgumentError('path', commands, commands.add.usage);
    }

    const path = args.positionals[3];
    const config = await projectPrechecks(path)

    const name = args.positionals[4] || config.name;
    const project = await getProjectByName(name);
    if (project) {
        throw new Error(`Project with name "${name}" already exists`);
    }

    await addProject(name, path);
    console.log(`Project "${name}" added`);
}