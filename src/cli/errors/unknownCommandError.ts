import type { CommandInformation } from "../logging/logCommands";
import { IncorrectUsageError } from "./incorrectUsageError";

export class UnknownCommandError extends IncorrectUsageError {
    constructor(command: string | undefined, commands: Record<string, CommandInformation>, usage?: string) {
        super(`Unknown command: "${command}"`, commands, usage);
        this.name = "UnknownCommandError";
    }
}