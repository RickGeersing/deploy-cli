import type { CommandInformation } from "../logging/logCommands";
import { IncorrectUsageError } from "./incorrectUsageError";

export class MissingArgumentError extends IncorrectUsageError {
    constructor(argumentName: string, commands: Record<string, CommandInformation>, usage?: string) {
        super(`Missing argument(s): ${argumentName}`, commands, usage);
    }
}