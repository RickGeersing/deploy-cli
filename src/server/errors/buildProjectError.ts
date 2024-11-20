import type { Project } from "@prisma/client";

export class BuildProjectError extends Error {
    constructor(
        message: string,
        public projectId: string,
        public projectName: string | undefined = undefined
    ) {
        super(message);
        this.name = "BuildError";
    }
}