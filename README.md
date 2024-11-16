# deploy-cli

1. To install dependencies:

```bash
bun install
```

2. To run migrations
```bash
bun prisma migrate dev
```

3. To generate client
```bash
bun prisma generate
```


4. How to add deploy-cli to global path:

```bash
bun link
bun link deploy-cli
```

5. To run the cron job server:

```bash
bun run src/server/server.ts
```

This project was created using `bun init` in bun v1.1.33. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
