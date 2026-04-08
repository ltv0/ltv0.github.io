# Portfolio Template

A reusable portfolio website template built with Vite, TypeScript, and a styled animated background. The link in the repo is my site that is using this template.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal.

## Customize the Template

Edit `index.html` to replace placeholders with your own content:

- `Your Name` in the header
- hero title, description, and buttons
- about section text
- education section details
- skills chips
- experience timeline entries
- project cards and links
- contact URLs and email address

## Build for Production

```bash
npm run build
```

The output will be generated into the `docs/` folder.

## GitHub Pages Deployment

This repository is configured to deploy automatically to GitHub Pages from the built `docs/` folder.

### Automatic deployment with GitHub Actions

The workflow at `.github/workflows/deploy.yml` builds the site and deploys the generated `docs/` folder to GitHub Pages.

1. Commit your changes and push them to the `main` branch.
2. GitHub Actions runs the deploy workflow automatically.
3. The workflow installs dependencies, runs `npm run build`, uploads the `docs/` output, and deploys it via `actions/deploy-pages@v5`.

### Manual deployment trigger

If you prefer to run the workflow manually, open the Actions tab in GitHub, select the `Deploy to GitHub Pages` workflow, and click `Run workflow`.

### Configuration notes

- `vite.config.ts` uses `base: './'` so the built site works correctly from the `docs/` folder.
- The workflow expects `docs/` as the production output directory.
- If you use a custom domain, keep or update the `CNAME` file in the repository root.
- Confirm GitHub Pages is set to use GitHub Actions deployment in your repository settings if it is not already configured.

## Notes

- The site uses `vite` for local development and production builds.
- Vite is chosen because it is fast to update and makes it easy to see live changes to your site while you work.
- The animated canvas background is powered by `src/main.ts` and `src/canvas.ts`.
- Keep the `base: './'` Vite config so the site works in subdirectories or GitHub Pages.

## How Pretext is used

This template uses `@chenglou/pretext` to calculate text layout and drawing details for the canvas-based header and background.

- `src/pretext-renderer.ts` wraps Pretext helpers like `prepare`, `prepareWithSegments`, `layout`, `layoutWithLines`, and `walkLineRanges`.
- It caches prepared text and layout blocks so repeated measurements and drawing operations stay fast.
- The renderer provides methods such as `measureWidth`, `measureParagraphHeight`, `getBlock`, `drawBlock`, `drawHRule`, and `drawVRule`.
- In `src/main.ts`, the `drawHeading()` function uses `renderer.getBlock()` and `renderer.drawBlock()` to layout the header title text and draw responsive horizontal rules that adjust with the canvas size.
- In `src/background.ts`, the background grid uses `renderer.measureWidth('M', this.font)` to determine the character width for the animated glyph grid, keeping the columns evenly spaced.
- `src/pretext-renderer.ts` also exposes `clearCache()` and `setLocale()` so the text layout cache can be reset if the locale or text rendering settings change.
