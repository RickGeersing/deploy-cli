import type { Project } from "@prisma/client";

export class BuildProjectError extends Error {
    constructor(message: string, public projectName: string) {
        super(message);
        this.name = "BuildError";
    }
}