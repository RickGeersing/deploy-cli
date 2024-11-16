import { parseArgs } from 'util'

export type CommandLineArgs = {
    values: {
        force: boolean | undefined;
    };
    positionals: string[];
}

export function parseCommandLineArgs(): CommandLineArgs {
    return parseArgs({
        args: Bun.argv,
        options: {
            force: {
                type: 'boolean'
            }
        },
        strict: true,
        allowPositionals: true,
    });
}
