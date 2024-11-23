export type CommandInformation = {
    usage: string;
    description: string;
}

export function logCommands(commands: Record<string, CommandInformation>): void {
    const cmds = Object.entries(commands);
    const longestUsage = cmds.reduce((acc, [_, { usage }]) => usage.length > acc ? usage.length : acc, 0);

    console.log("Commands:");
    for (const [cmd, { usage, description }] of cmds) {
        console.log(`  ${cmd.padEnd(10)}${usage.padEnd(longestUsage + 10)}${description}`);
    }
}