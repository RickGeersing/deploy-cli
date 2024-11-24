import { createBuildEntry } from "../../../../utilities/builds/createBuild";
import { checkCommits } from "../../../../utilities/git/checkCommits";
import { pullChanges } from "../../../../utilities/git/pullChanges";
import type { CommandLineArgs } from "../../../../utilities/parseCommandLineArgs";
import { getProjectByName } from "../../../../utilities/project/getProjectByName";
import { MissingArgumentError } from "../../../errors/missingArgumentError";
import { commands } from "../commands";

export async function addCommand(args: CommandLineArgs) {
    if (args.positionals.length === 4) {
        throw new MissingArgumentError('name', commands, commands.add.usage);
    }

    const project = await getProjectByName(args.positionals[4]);
    if (!project) {
        console.log(`Project with name ${args.positionals[4]} not found`);
        return;
    }

    // Get commit hash
    const commits = await checkCommits(project);
    if (commits.localHash !== commits.remoteHash) {
        await pullChanges(project);
    }

    console.log(`Adding new build to queue for project ${project.name}`);
    await createBuildEntry(project, commits.remoteHash);
}