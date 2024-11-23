import { getLatestBuilds } from "../../../../utilities/builds/getLatestBuilds";
import type { CommandLineArgs } from "../../../../utilities/parseCommandLineArgs";

export async function lsCommand(args: CommandLineArgs) {
    const builds = await getLatestBuilds();

    if (builds.length === 0) {
        console.log("No builds found")
        return;
    }

    console.log("Latest builds:")
    console.table(builds, ['projectName', 'status', 'createdAt', 'commit', 'id',])
}