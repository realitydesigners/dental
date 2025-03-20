# Protocoding AI Sanity Page Builder

```shell
bun install
```

run the nextjs app

```shell
bun run dev
```

Open the Studio running locally in your browser on [http://localhost:3000](http://localhost:3000). Use the same service (Google, GitHub, or email)

These are the enviroment variables needed. Navigate to [https://www.sanity.io/manage](https://www.sanity.io/manage) to get project ID, dataset, read, and write tokens

```shell
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
NEXT_PUBLIC_SANITY_STUDIO_URL=/studio
SANITY_STUDIO_PRESENTATION_URL=http://localhost:3000
SANITY_STUDIO_TITLE="My Studio"
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN= #
```

To generate a new block run this

```shell
bun scripts/generate-block.ts TestBlock
```
