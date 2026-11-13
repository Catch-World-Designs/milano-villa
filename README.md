# Milano Villa website

Independent, production-ready source for the approved Milano Villa website. The project preserves the Arena prototype's visual identity while removing runtime dependencies on Arena, Google Fonts, and remote stock-image CDNs.

## Technology

- React 19, TypeScript, Vite 7, and Tailwind CSS 4
- Static prerendering for all public routes
- Local Fontsource packages and responsive WebP imagery
- Biome linting, TypeScript checks, Playwright browser tests, and visual regression snapshots
- GitHub Actions deployment to GitHub Pages

## Requirements

- Node.js 22 LTS or newer
- npm 10 or newer

## Local development

```powershell
npm ci
npm run dev
```

Open the local address printed by Vite. No account or external service is required.

## Production build

Copy `.env.example` to `.env.local`, set the final public URL, then run:

```powershell
npm run check
npm run preview
```

The deployable output is `dist/`. The build creates clean, trailing-slash URLs such as `/atelier/` and `/commissions/grand-salon/`.

## Quality checks

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:routes
npm run test:visual
npm audit
```

Install Playwright's browser once on a new machine with `npx playwright install chromium`. Approved full-page references are in `tests/baseline/`; automated responsive snapshots are beside `tests/e2e/visual.spec.ts`.

## Editing the site

- Page composition: `src/pages/`
- Shared header, footer, forms, and image component: `src/components/`
- Navigation, contact details, disciplines, projects, text, and image assignments: `src/data/site.ts`
- Route metadata and SEO copy: `src/data/routes.ts`
- Theme, typography, spacing, motion, and global styles: `src/index.css`
- Source images: `assets/image-sources.json`; generated versions: `public/images/`

Run `npm run assets:prepare` only when approved source images change. It downloads the recorded Pexels originals and regenerates all responsive sizes; licensing/source records are retained in `public/images/SOURCES.md`.

The approved design is protected by visual tests. Review screenshot diffs before accepting any intentional visual change.

## Contact form

No credentials are stored in the frontend. With no endpoint configured, the form opens a prefilled email draft to the existing approved address. A production endpoint can be added later using the documented [request contract](docs/contact-endpoint.md). Phone and principal placeholders remain unpublished until real details are supplied.

## Deployment and maintenance

The `main` branch deploys through `.github/workflows/deploy-pages.yml`. See the [deployment guide](docs/deployment.md) for GitHub Pages, custom-domain, and other static-hosting instructions.

For routine maintenance, update dependencies in a separate branch, run every quality check, inspect responsive snapshots, and confirm the prerendered metadata before merging. The repository does not currently declare an open-source license.
