# deploy-cli

To install dependencies:

```bash
bun install
```

To run migrations
```bash
bun prisma migrate dev
```

To generate client
```bash
bun prisma generate
```

To run:

```bash
bun run src/server/server.ts
```

How to add deploy-cli to global path:

```bash
bun link
bun link deploy-cli
```

This project was created using `bun init` in bun v1.1.33. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
