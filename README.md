# Portfolio Template

A reusable portfolio website template built with Vite, TypeScript, and a styled animated background.

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

## Notes

- The site uses `vite` for local development and production builds.
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
