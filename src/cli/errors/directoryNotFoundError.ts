export class DirectoryNotFoundError extends Error {
    constructor(directory: string) {
        super(`Directory not found: ${directory}`);
    }
}