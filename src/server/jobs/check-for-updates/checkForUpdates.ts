import { createBuildEntry } from "../../../utilities/builds/createBuild";
import { checkCommits } from "../../../utilities/git/checkCommits";
import { getAllProjects } from "../../../utilities/project/getAllProjects";
import { getLatestBuildByCommitHash } from "../../../utilities/builds/getLatestBuildsByCommitHash";
import { pullChanges } from "../../../utilities/git/pullChanges";
import { logger } from "../../../utilities/logging";
import { projectPrechecks } from "../../../utilities/project/projectPrechecks";

export async function checkForUpdates() {
    const projects = await getAllProjects();

    await Promise.all(projects.map(async project => {
        try {
            await projectPrechecks(project.path);
            logger.info(`[UPDATE] Checking for new commits on "${project.name}" ...`);
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
                logger.info(`[UPDATE] Pulling latest changes for "${project.name}" ...`);
                await pullChanges(project);
                logger.info(`[UPDATE] Added a build for "${project.name}" to build queue ...`);
                await createBuildEntry(project, commits.remoteHash);
            }

        } catch (e) {
            if (e instanceof Error) {
                logger.error(`[UPDATE] ${e.message}`);
            }
        }
    }));
}