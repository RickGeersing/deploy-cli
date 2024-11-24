import { Elysia } from 'elysia'
import { cron, Patterns } from '@elysiajs/cron'
import { checkForUpdates } from './jobs/check-for-updates/checkForUpdates'
import { buildProjects } from './jobs/build-projects/buildProjects'

if (!process.env.UPDATE_INTERVAL || Number.isNaN(process.env.UPDATE_INTERVAL)) {
    throw new Error('UPDATE_INTERVAL is required')
}

if (!process.env.BUILD_INTERVAL || Number.isNaN(process.env.BUILD_INTERVAL)) {
    throw new Error('BUILD_INTERVAL is required')
}

new Elysia()
    .use(
        cron({
            name: 'buildProjects',
            pattern: Patterns.everySenconds(Number(process.env.UPDATE_INTERVAL)),
            run() {
                buildProjects()
            }
        }),
    )
    .use(
        cron({
            name: 'checkForUpdates',
            pattern: Patterns.everySenconds(Number(process.env.UPDATE_INTERVAL)),
            run() {
                checkForUpdates()
            }
        }),
    )
    .listen(3000)