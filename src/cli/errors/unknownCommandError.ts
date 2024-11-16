export class UnknownCommandError extends Error {
    constructor(command: string | undefined) {
        super(`Unknown command: "${command}"`);
        this.name = "UnknownCommandError";
    }
}