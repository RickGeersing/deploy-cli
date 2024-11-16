import { getAllProjects } from "../../../utilities/project/getAllProjects";

export async function lsCommand(): Promise<void> {
    const projects = await getAllProjects();

    if (projects.length === 0) {
        console.log("No projects found");
        return;
    }

    console.log("Projects:");
    console.table(projects, ["name", "path", "createdAt"]);
}