import { z } from "zod";

const deployConfigSchema = z.object({
    name: z.string(),
    commands: z.array(z.string())
});

export async function readDeployConfig(path: string): Promise<z.infer<typeof deployConfigSchema>> {
    try {
        const deployFile = Bun.file(`${path}/deploy.json`);

        const exists = await deployFile.exists();
        if (!exists) {
            throw new Error(`No deploy.json file found in ${path}`);
        }

        const deployFileContent = await deployFile.json();
        return deployConfigSchema.parse(deployFileContent);
    } catch (error) {
        throw new Error('Invalid deploy.json file');
    }
}