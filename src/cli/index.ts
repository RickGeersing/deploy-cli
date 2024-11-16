#! /usr/bin/env bun
import { MissingArgumentError } from './errors/missingArgumentError';
import { UnknownCommandError } from './errors/unknownCommandError';
import { parseCommandLineArgs, type CommandLineArgs } from "../utilities/parseCommandLineArgs";
import { IncorrectUsageError } from "./errors/incorrectUsageError";
import { lsCommand } from "./commands/ls/lsCommand";
import { rmCommand } from "./commands/rm/rmCommand";
import { addCommand } from "./commands/add/addCommand";
import { logCommands } from "./logging/logCommands";

async function main() {
    try {
        const args = parseCommandLineArgs();

        await run(args);
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message)
        }

        if (e instanceof IncorrectUsageError) {
            console.log(`\n${e.usage}\n`)
            logCommands();
        }
    }
}


async function run(args: CommandLineArgs): Promise<void> {
    if (args.positionals.length === 2) {
        throw new MissingArgumentError('command');
    }

    switch (args.positionals[2]) {
        case "add":
            await addCommand(args);
            break;
        case "ls":
            await lsCommand();
            break;
        case "rm":
            await rmCommand(args);
            break;
        case "help":
            logCommands();
            break;
        default:
            throw new UnknownCommandError(args.positionals[2]);
    }
}

main();