import type { CommandInformation } from "../logging/logCommands"

export class IncorrectUsageError extends Error {
    public usage: string = "deploy <command> [options]"
    public commands: Record<string, CommandInformation>

    constructor(message: string, commands: Record<string, CommandInformation>, usage?: string) {
        super(message)
        this.name = "IncorrectUsageError"
        this.commands = commands

        if (usage) {
            this.usage = usage
        }
    }
}