import { IncorrectUsageError } from "./incorrectUsageError";

export class MissingArgumentError extends IncorrectUsageError {
    constructor(argumentName: string, usage?: string) {
        super(`Missing argument(s): ${argumentName}`, usage);
    }
}