# Agentwork landing page

A production-ready reconstruction of the Agentwork marketing page from a single full-page
screenshot, built with the [`design-to-code`](../design-to-code) skill.

**Next.js 16 (App Router) · React 19 · TypeScript strict · no runtime dependencies beyond React.**

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (the page prerenders to static HTML) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint with `next/core-web-vitals` + `next/typescript` |
| `npm run capture` | Build, serve, and run the full visual/accessibility gate into `.captures/` |
| `npm run capture:check` | The same gates without writing screenshots |

`npm run capture` needs Chromium via Playwright. It resolves Playwright from the project if present
and otherwise from a global install, so it stays out of `dependencies`.

## Layout

```
app/
  layout.tsx        document shell, metadata, OpenGraph, viewport, font preload
  page.tsx          section composition + Organization/WebSite/FAQPage JSON-LD
  globals.css       design tokens and every component style
  not-found.tsx     404
  robots.ts         robots.txt
  sitemap.ts        sitemap.xml
  icon.svg          favicon
components/
  Icon.tsx          typed glyph names -> sprite references
  Sprite.tsx        the single inline SVG symbol sheet
  SiteHeader.tsx    the one client component (sticky state + mobile disclosure)
  SiteFooter.tsx
  Thread.tsx        the demo exchange, rendered at two sizes
  ProductWindow.tsx the hero app window (treated as media)
  sections/         one component per page section
lib/
  content.ts        all copy and data, typed
public/
  fonts/            self-hosted Inter variable (latin + latin-ext)
  sky-hero.svg      hero sky
  sky-cta.svg       closing-CTA sky
tools/
  capture.mjs       verification harness (dev only)
```

## Notes on the implementation

- **No third-party requests.** Fonts are self-hosted and preloaded; all artwork is SVG authored in
  this repository. Nothing is fetched at runtime.
- **JavaScript is an enhancement.** The page is statically prerendered; the only client component is
  the header, and it only affects the mobile disclosure and the scroll hairline. The FAQ is native
  `<details>`, the marquee is CSS. A gate runs the page with JavaScript disabled.
- **SVG-only iconography, zero emoji.** One sprite, one stroke language, `currentColor` throughout.
  Enforced by a gate over rendered text and images.
- **Every action is inert.** "Log in", "Create account" and "Book a demo" are in-page anchors, and
  the multifactor tile is decorative — the page collects no input of any kind.
- **Third-party logos are not reproduced.** Integration and agent rows pair accurate product names
  with neutral placeholder marks.

`DESIGN-NOTES.md` records the reference forensics, the evidence ledger (observed / inferred /
substituted), the fidelity contract, the responsive plan, and the verification results.
