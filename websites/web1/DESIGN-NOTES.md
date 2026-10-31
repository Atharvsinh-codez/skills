# Agentwork landing page — reconstruction notes

Working notes for the `design-to-code` reconstruction in this directory.

## Dispatch

| Decision | Value |
| --- | --- |
| Source mode | **Reference reconstruction** — a supplied full-page screenshot is the authority |
| Surface track | **Marketing / brand** |
| Target route | `/` (plus `/404`, `robots.txt`, `sitemap.xml`) |
| Stack | **Next.js 16 App Router, React 19, TypeScript strict** — statically prerendered, one small client component |

## Reference inventory

| Source | Route | Viewport / DPR | Theme | State | Scroll | Authority |
| --- | --- | --- | --- | --- | --- | --- |
| Agentwork full-page screenshot (supplied in chat, not on disk) | `/` | unknown CSS width, inferred **~1440 px**; DPR unknown | light | default, all accordions collapsed | full page, top → bottom | primary |

Classification: **full page**, single sampled viewport, single theme, single state.

### Reference limitations that shaped the build

1. The screenshot arrived inline in the conversation, **not as a file**, so it could not be
   re-opened, cropped or magnified for a second inspection pass — and it is a tall full-page
   capture, so small copy renders below legible size.
2. Consequence: **section structure, layout, geometry, colour and component anatomy are observed**;
   **long body copy, FAQ answers and a few product labels are inferred**, written to match the
   visible line counts, measure and tone. They are not presented as a transcription.
3. No tablet or mobile reference, no hover/focus/open states, no motion sample. Everything below
   ~1200 px, every interaction state, and all motion is **inferred**.

To raise copy accuracy and add a true pixel-diff gate, drop the original PNG into
`reference/` and extend `tools/capture.mjs` with an image comparison.

## Evidence ledger

| Element | Status | Source | Decision | Validation |
| --- | --- | --- | --- | --- |
| Page canvas | observed | reference | white `#ffffff`, no alternating section bands | full-page capture |
| Content container | observed | content spans ~7.5 %→93 % of a 1440 canvas | `max-width: 1232px`, `padding-inline: 24px` → 1184 content | geometry gate |
| Header | observed | reference | 64 px, sticky, hairline appears on scroll | capture at top and mid-scroll |
| Hero split | observed | buttons sit far right, level with the lede | asymmetric 2-col: copy left, stacked actions right | capture at 1440 |
| H1 size | measured | "One place to ask," ≈ 26 % of canvas width over 17 chars | `clamp(2.05rem, 3.2vw, 2.875rem)` → 46 px, weight 500, `-0.032em` | wrap holds at 2 lines |
| Body size | measured | hero lede ≈ 3 lines over a ~780 px measure | 16 px lede / 15 px body / 13 px small | reflow + 200 % zoom |
| Type family | **substituted** | reference face is an unidentifiable neutral grotesque | self-hosted **Inter variable** (latin + latin-ext woff2), preloaded | `document.fonts.check` gate; no faux weights |
| Sky artwork (hero + closing CTA) | **substituted** | raster not supplied; no image generation available in this session | two hand-authored SVGs: gradient + three cumulus banks, viewBox matched to each block's aspect so `cover` never double-crops | rendered at all 7 widths |
| Product screenshot in hero | **substituted** | reference shows a raster app window | rebuilt in real DOM as *media*: `aria-hidden`, with an `sr-only` text equivalent | capture + screen-reader order |
| Window scaling | inferred | a screenshot scales, it does not reflow | `container-type` on the sky, window type in `cqw`, everything inside in `em` | measured 12 px at 1440, 10 px floor on mobile |
| Brand marks (integrations, agents) | **substituted** | third-party logos are protected marks | 9 neutral geometric SVG marks + accurate product **names** as text | visual review |
| Social links | **substituted** | reference shows platform glyphs | text labels only, for the same trademark reason | visual review |
| Cloud brand glyph | inferred | reference mark is a cloud in a rounded tile (dark in header, orange in footer) | one original cloud SVG at three sizes via `currentColor` | all three placements |
| Accent orange | observed | footer logo tile | `#ef5b2b` | eyedrop vs reference |
| Depth strategy | observed | hairline borders, no heavy elevation | **border-led**, one soft shadow reserved for the floating window | craft gate |
| Radii family | observed | cards ~12, media ~22, buttons ~8, pills full | `--r-xs…--r-xl`, inner radii derived from padding | nested-surface review |
| `--faint` tertiary grey | **substituted** | reference tertiary grey measures ≈ 2.8:1 | darkened to `#71706a` (4.97:1 on white, 4.60:1 on `--surface`); `--faint-deco` keeps the lighter value for non-informational icon strokes only | automated contrast gate |
| Capability list (§ Reliable results) | inferred | 11 rows, trailing chevron, first row highlighted; no state evidence | **non-interactive list** with `aria-current` on row 1 — neither inventing tab behaviour nor shipping dead controls | keyboard pass |
| FAQ answers | inferred | all six rows collapsed in the reference | authored short answers consistent with the page's own claims; mirrored into FAQPage JSON-LD | reading pass |
| Integration marquee motion | inferred | static frame; edge fade implies overflow | 46 s CSS translate on a duplicated track; paused on hover and under `prefers-reduced-motion`, which also turns the strip into a scroll region | reduced-motion gate |
| Auth surfaces | **substituted (safety)** | "Log in", "Create account", MFA code tile | every action is an inert in-page anchor; the MFA tile is decorative, `aria-hidden`, and collects nothing — there is no credential surface on this page | code review + gate |

## Fidelity contract

**Visual thesis** — a quiet, near-white editorial SaaS page where hairline-bordered product
surfaces do the talking, punctuated twice by a full-width sky that carries all of the brand's colour.

### Section map (document order)

| # | Region | Component | One dominant idea |
| --- | --- | --- | --- |
| — | header | `SiteHeader` (client) | wordmark + 4 links, disclosure below 720 px |
| 1 | Hero | `sections/Hero` + `ProductWindow` + `Thread` | H1 left / actions right, then sky with the app window |
| 2 | How it works | `sections/Steps` | 3 visual cards over 3 numbered columns |
| 3 | Reliable results | `sections/Results` + `Thread` | 11-row capability list beside one large answer panel |
| 4 | Security & learning | `sections/Bento` | 4-card bento, tall workflow card on the right |
| 5 | Shared vs private | `sections/SharedKnowledge` | trust statement + integration marquee |
| 6 | Agentwork for agents | `sections/Agents` | dark brand tile + 6 product cards |
| 7 | Protected by design | `sections/Trust` | 3 icon columns + trust-center link |
| 8 | FAQ | `sections/Faq` | sticky heading left, native `<details>` list right |
| 9 | Closing CTA | `sections/ClosingCta` | sky card, centred heading, same two buttons |
| — | footer | `SiteFooter` | 4 columns over an oversized clipped wordmark |

`Thread` renders the demo exchange once and is used at two sizes, so the hero window and the
results panel can never drift apart. All copy lives in `lib/content.ts`.

### Design system

- **Colour roles** — canvas `#fff`, surface `#f7f6f3`, surface-2 `#f1f0ea`, ink `#17160f`,
  ink-2 `#3f3e35`, muted `#6d6c62`, faint `#71706a`, faint-deco `#a5a49a`, line `#e7e6e0`,
  line-2 `#dcdbd4`, accent `#ef5b2b`. Neutrals are tinted warm rather than taken from a framework
  grey scale.
- **Type** — display `clamp(2.05rem, 3.2vw, 2.875rem)`, h2 `clamp(1.4rem, 1.95vw, 1.65rem)`,
  body 15 px (16 px ≤720 px), small 13 px, micro 12 px. Weights 400/500/600, all real faces.
- **Spacing** — 4 px base; section rhythm `clamp(56px, 5.3vw, 76px)` block padding, derived from the
  reference's ~150 px inter-section gap.
- **Icons** — one hand-authored 24×24 sprite, `currentColor`, 1.5 stroke. Zero emoji, zero icon
  fonts, zero raster icons; enforced by a gate.

### Responsive transformations

| Section | ≥1080 | 720–1080 | <720 |
| --- | --- | --- | --- |
| Header nav | 4 inline links | inline links | **disclosure** (Escape, outside-click, focus return, resets on resize) |
| Hero | copy left / actions right | same, tighter | reorder: copy → full-width actions |
| Hero media | sky inset, window 77 % | sky inset, wider window | sky becomes 3:4, sidebar hidden, window cropped |
| How it works | 3 columns | 3 columns | 1 column |
| Reliable results | list 31 % / panel 69 % | stack | stack, panel padding reduced |
| Bento | 3 cols, tall right card | 2 cols, right card spans | 1 col |
| Marquee | animated, edge fades | animated | animated, tighter chips |
| Agents row | 6 cols | 3 cols | 2 cols |
| Compliance | 3 cols | 2 cols | 1 col |
| FAQ | sticky heading + list | heading above list | heading above list |
| Footer | 1 + 3 columns | 1 + 3 columns | stacked, 2 then 1 link column |

Breakpoints (1080 / 900 / 720 / 560 / 420) were chosen where the composition actually broke during
capture, not from device names. A `pointer: coarse` block raises touch targets to 46 px.

## Verification

`tools/capture.mjs` builds the site, serves the production output and drives Chromium through the
whole matrix. It is dev tooling — nothing in `app/` or `components/` imports it.

```bash
npm run capture         # full matrix + screenshots into .captures/
npm run capture:check   # gates only, no screenshots
```

Gates, all currently passing:

- **Geometry** — nine measured blocks compared against reference-derived targets at 1440 (9 % tolerance).
- **Responsive** — 1440, 1280, 1024, 834, 430, 360 and 1440×620; horizontal overflow, console
  errors, failed requests, landmark and `h1` counts, unnamed controls.
- **Contrast** — every text node's rendered colour against its effective backdrop, WCAG 2.2 AA.
- **Iconography** — no emoji, no icon fonts, no raster icons in rendered output.
- **Interaction** — nav open/close, Escape, focus return, breakpoint reset, FAQ disclosure.
- **Degraded** — JavaScript disabled, `forced-colors: active`, `prefers-reduced-motion: reduce`.
- **Routing** — `/does-not-exist` returns a real 404 with a visible heading.
