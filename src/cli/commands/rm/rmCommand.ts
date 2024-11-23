import { MissingArgumentError } from "../../errors/missingArgumentError";
import type { CommandLineArgs } from "../../../utilities/parseCommandLineArgs";
import { getProjectByName } from "../../../utilities/project/getProjectByName";
import { removeProject } from "../../../utilities/project/removeProject";
import { commands } from "../commands";

export async function rmCommand(args: CommandLineArgs): Promise<void> {
    if (args.positionals.length === 3) {
        throw new MissingArgumentError('name', commands, commands.rm.usage);
    }

    const name = args.positionals[3];
    const project = await getProjectByName(name);

    if (!project) {
        throw new Error(`Project "${name}" does not exist`);
    }

    await removeProject(name);
    console.log(`Project "${name}" removed`);
}