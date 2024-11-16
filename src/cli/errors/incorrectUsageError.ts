export class IncorrectUsageError extends Error {
    public usage: string = "Usage: deploy <command> [options]"

    constructor(message: string, usage?: string) {
        super(message)
        this.name = "IncorrectUsageError"

        if (usage) {
            this.usage = usage
        }
    }
}