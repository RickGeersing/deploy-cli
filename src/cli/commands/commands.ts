type Command = "add" | "ls" | "help" | "rm" | "build";

type CommandInformation = {
    usage: string;
    description: string;
}

export const commands: Record<Command, CommandInformation> = {
    add: { usage: "deploy add <path> <name>", description: "Add a new project" },
    ls: { usage: "deploy ls", description: "List all projects" },
    rm: { usage: "deploy rm <name>", description: "Remove a project" },
    build: { usage: 'deploy build', description: 'Overview of build commands' },
    help: { usage: "deploy help", description: "Shows list of all commands" },
}