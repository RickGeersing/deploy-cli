import type { CommandInformation } from "../../logging/logCommands";

type Command = "add" | "ls";

export const commands: Record<Command, CommandInformation> = {
    add: { usage: "deploy build add <name>", description: "Add build for project" },
    ls: { usage: "deploy build ls", description: "Show all recent builds" },
}