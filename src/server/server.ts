import { Elysia } from 'elysia'
import { cron, Patterns } from '@elysiajs/cron'
import { checkForUpdates } from './jobs/check-for-updates/checkForUpdates'
import { buildProjects } from './jobs/build-projects/buildProjects'

new Elysia()
    .use(
        cron({
            name: 'heartbeat',
            pattern: Patterns.EVERY_30_SECONDS,
            run() {
                buildProjects()
            }
        }),
    )
    .use(
        cron({
            name: 'checkForUpdates',
            pattern: Patterns.EVERY_30_SECONDS,
            run() {
                checkForUpdates()
            }
        }),
    )
    .listen(3000)