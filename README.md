# linguo-web

Marketing and documentation site for [Linguo](https://github.com/BoxingOctopusCreative/linguo), built with SvelteKit and deployed as a static site.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

The static output is written to `build/`.

## Project structure

- `src/routes/` — pages (marketing homepage + docs)
- `src/routes/docs/` — documentation (Markdown via mdsvex)
- `src/lib/components/` — shared UI components
- `src/lib/docs.ts` — docs navigation config

## Adding documentation

1. Create a new Markdown file at `src/routes/docs/<slug>/+page.md`
2. Add frontmatter with `title` and `description`
3. Register the page in `src/lib/docs.ts`
