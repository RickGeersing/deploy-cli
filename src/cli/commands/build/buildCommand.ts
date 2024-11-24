import type { CommandLineArgs } from "../../../utilities/parseCommandLineArgs"
import { MissingArgumentError } from "../../errors/missingArgumentError"
import { UnknownCommandError } from "../../errors/unknownCommandError";
import { logCommands } from "../../logging/logCommands"
import { addCommand } from "./add/addCommand";
import { commands } from "./commands"
import { lsCommand } from "./ls/lsCommand";

export async function buildCommand(args: CommandLineArgs) {
    if (args.positionals.length === 3) {
        throw new MissingArgumentError('command', commands, 'deploy build <command>');
    }

    switch (args.positionals[3]) {
        case "add":
            await addCommand(args)
            break
        case "ls":
            await lsCommand(args)
            break
        default:
            throw new UnknownCommandError(args.positionals[3], commands, 'deploy build <command>');
    }
}