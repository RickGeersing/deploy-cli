import { createBuildEntry } from "../../../utilities/builds/createBuild";
import { checkWorkingDirectory } from "../../../utilities/checkWorkingDirectory";
import { checkRepositoryInDirectory } from "../../../utilities/git/checkRepositoryInDirectory";
import { checkCommits } from "../../../utilities/git/checkCommits";
import { getAllProjects } from "../../../utilities/project/getAllProjects";
import { readDeployConfig } from "../../../utilities/readDeployConfig";
import { getLatestBuildByCommitHash } from "../../../utilities/builds/getLatestBuildsByCommitHash";
import { pullChanges } from "../../../utilities/git/pullChanges";
import { logger } from "../../../utilities/logging";

export async function checkForUpdates() {
    const projects = await getAllProjects();

    await Promise.all(projects.map(async project => {
        try {
            await checkWorkingDirectory(project.path);
            await checkRepositoryInDirectory(project.path);
            await readDeployConfig(project.path);

            const commits = await checkCommits(project);

            // If the local and remote hashes are the same, we can assume that there are no new commits
            if (commits.localHash === commits.remoteHash) {
                // Check if there is a build for the latest local commit, if not, queue a build
                const localCommitBuild = await getLatestBuildByCommitHash(project, commits.localHash);
                if (!localCommitBuild) {
                    await createBuildEntry(project, commits.localHash);
                } else {
                    logger.info(`[UPDATE] No new commits in ${project.name}, skipping ...`);
                }
            } else {
                await pullChanges(project);
                await createBuildEntry(project, commits.remoteHash);
            }

        } catch (e) {
            if (e instanceof Error) {
                logger.error(`[UPDATE] ${e.message}`);
            }
        }
    }));
}