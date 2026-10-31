/* Optional dev tooling — not shipped, not imported by the app.
 *
 * Builds the site, serves the production output, then drives Chromium through
 * the verification matrix recorded in DESIGN-NOTES.md.
 *
 *   node tools/capture.mjs             full page + fold + component crops
 *   node tools/capture.mjs --check     gates only, no screenshots
 *   node tools/capture.mjs --no-build  reuse the existing .next build
 *
 * Playwright is resolved from the project first, then from a global install.
 */
import { spawn, execSync } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { readFileSync, readdirSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, '.captures');
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;
const CHECK_ONLY = process.argv.includes('--check');
const SKIP_BUILD = process.argv.includes('--no-build');

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1280', width: 1280, height: 860 },
  { name: '1024', width: 1024, height: 800 },
  { name: '0834', width: 834, height: 1000 },
  { name: '0430', width: 430, height: 932 },
  { name: '0360', width: 360, height: 780 },
  { name: '1440-short', width: 1440, height: 620 },
];

const CROPS = {
  'crop-hero': '.hero',
  'crop-steps': '.steps',
  'crop-results': '.results',
  'crop-bento': '.bento',
  'crop-shared': '.shared',
  'crop-agents': '.agents',
  'crop-trust': '.trust',
  'crop-faq': '.faq',
  'crop-cta': '.cta',
  'crop-foot': '.foot',
  'crop-window': '.stage__sky',
  'crop-panel': '.panel',
};

/* Emoji, dingbats, arrows and variation selectors must never reach the page. */
const EMOJI =
  /[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;

const problems = [];
const note = (m) => {
  problems.push(m);
  console.log('  ! ' + m);
};

/* A server left over from a previous run would keep answering on this port with
   a stale build manifest, producing 500s for chunks that no longer exist. Fail
   loudly instead of measuring the wrong thing. */
try {
  await fetch(BASE, { cache: 'no-store', signal: AbortSignal.timeout(1500) });
  console.error(
    `\nSomething is already serving ${BASE}. Stop it first — a stale server ` +
      `serves an old build manifest and every measurement below would be wrong.\n`
  );
  process.exit(2);
} catch {
  /* nothing listening — good */
}

if (!SKIP_BUILD) {
  console.log('building…');
  execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });
}

/* Run the Next binary directly and in its own process group: going through
   `npx` leaves the real server orphaned when this script exits. */
const server = spawn(
  process.execPath,
  [join(ROOT, 'node_modules', 'next', 'dist', 'bin', 'next'), 'start', '--port', String(PORT)],
  { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], detached: true }
);
/* `next start` forks a `next-server` worker that survives a plain group kill on
   some platforms, so collect the descendants from /proc and kill them by pid. */
function descendants(root) {
  let procs;
  try {
    procs = readdirSync('/proc').filter((d) => /^\d+$/.test(d));
  } catch {
    return [];
  }
  const parents = new Map();
  for (const pid of procs) {
    try {
      const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
      // comm can contain spaces/parens, so read ppid after the final ')'
      const ppid = Number(stat.slice(stat.lastIndexOf(')') + 2).split(' ')[1]);
      parents.set(Number(pid), ppid);
    } catch {
      /* process exited while we looked */
    }
  }
  const out = [];
  const walk = (pid) => {
    for (const [child, parent] of parents) {
      if (parent === pid) {
        out.push(child);
        walk(child);
      }
    }
  };
  walk(root);
  return out;
}

/* The worker also reparents itself away from us, so as a last pass kill any
   next-server whose working directory is this project. Scoping on cwd keeps
   unrelated Next apps on the machine untouched. */
function ownNextServers() {
  const pids = [];
  let entries;
  try {
    entries = readdirSync('/proc').filter((d) => /^\d+$/.test(d));
  } catch {
    return pids;
  }
  for (const pid of entries) {
    try {
      const cmd = readFileSync(`/proc/${pid}/cmdline`, 'utf8');
      if (!cmd.includes('next-server') && !cmd.includes('next/dist/bin/next')) continue;
      if (realpathSync(`/proc/${pid}/cwd`) !== realpathSync(ROOT)) continue;
      pids.push(Number(pid));
    } catch {
      /* not ours, or gone */
    }
  }
  return pids;
}

let stopped = false;
const stopServer = () => {
  if (stopped) return;
  stopped = true;
  const targets = new Set([...descendants(server.pid).reverse(), ...ownNextServers()]);
  for (const pid of targets) {
    try {
      process.kill(pid, 'SIGKILL');
    } catch {
      /* already gone */
    }
  }
  try {
    process.kill(-server.pid, 'SIGKILL'); // the group, including the leader
  } catch {
    try {
      server.kill('SIGKILL');
    } catch {
      /* already gone */
    }
  }
};
process.on('exit', stopServer);
for (const sig of ['SIGINT', 'SIGTERM', 'uncaughtException']) {
  process.on(sig, () => {
    stopServer();
    process.exit(1);
  });
}

// Wait for the server to actually answer rather than sleeping a fixed amount.
for (let i = 0; ; i += 1) {
  try {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (res.ok) break;
  } catch {
    /* not up yet */
  }
  if (i > 120) throw new Error('next start did not come up on ' + BASE);
  await new Promise((r) => setTimeout(r, 250));
}

const { chromium } = await (async () => {
  try {
    return await import('playwright');
  } catch {
    const root = execSync('npm root -g', { encoding: 'utf8' }).trim();
    const mod = await import(pathToFileURL(join(root, 'playwright', 'index.js')).href);
    return mod.chromium ? mod : mod.default; // the global install is CJS
  }
})();

const browser = await chromium.launch();

if (!CHECK_ONLY) {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
}

/* ── responsive matrix ──────────────────────────────────────────────────── */
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce', // deterministic frames: never mid-animation
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => errors.push('failed request: ' + r.url()));

  await page.goto(BASE, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  console.log(`\n${vp.name} (${vp.width}×${vp.height})`);

  const report = await page.evaluate(() => {
    const de = document.documentElement;
    const wide = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > de.clientWidth + 1.5 || r.left < -1.5);
      })
      .filter((el) => !el.closest('.marquee'))
      .slice(0, 6)
      .map((el) => el.className || el.tagName);

    return {
      overflow: de.scrollWidth - de.clientWidth,
      wide,
      text: document.body.innerText,
      interLoaded: document.fonts.check('500 48px InterVar'),
      rasterIcons: [...document.images]
        .map((i) => i.currentSrc)
        .filter((s) => /\.(png|jpe?g|webp|gif)$/i.test(s)),
      iconFonts: [...document.querySelectorAll('body *')].some((el) =>
        /material|fontawesome|glyphicon|icomoon/i.test(getComputedStyle(el).fontFamily)
      ),
      landmarks: {
        header: document.querySelectorAll('header').length,
        main: document.querySelectorAll('main').length,
        footer: document.querySelectorAll('footer').length,
        h1: document.querySelectorAll('h1').length,
      },
      unnamedControls: [...document.querySelectorAll('a, button')].filter(
        (el) => !el.textContent.trim() && !el.getAttribute('aria-label')
      ).length,
      pageHeight: document.body.scrollHeight,
    };
  });

  if (report.overflow > 1) note(`horizontal overflow ${report.overflow}px → ${report.wide.join(' | ')}`);
  if (EMOJI.test(report.text)) note('emoji in rendered text: ' + report.text.match(EMOJI)[0]);
  if (!report.interLoaded) note('Inter did not load — fallback face in use');
  if (report.rasterIcons.length) note('raster image(s): ' + report.rasterIcons.join(', '));
  if (report.iconFonts) note('icon font detected');
  if (report.unnamedControls) note(`${report.unnamedControls} control(s) with no accessible name`);
  const { header, main, footer, h1 } = report.landmarks;
  if (header !== 1 || main !== 1 || footer !== 1 || h1 !== 1)
    note(`landmark/heading count off: header ${header}, main ${main}, footer ${footer}, h1 ${h1}`);
  if (errors.length) note('console/network: ' + errors.slice(0, 4).join(' ¦ '));
  console.log(`  page height ${report.pageHeight}px`);

  if (!CHECK_ONLY) {
    await page.screenshot({ path: join(OUT, `${vp.name}-fold.png`) });
    await page.screenshot({ path: join(OUT, `${vp.name}-full.png`), fullPage: true });
  }
  await ctx.close();
}

/* ── WCAG 2.2 AA text contrast, computed from rendered colours ──────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  const failures = await page.evaluate(() => {
    const parse = (c) => {
      const m = c.match(/[\d.]+/g);
      if (!m) return null;
      const [r, g, b, a = '1'] = m.map(Number);
      return { r, g, b, a };
    };
    const lin = (v) => {
      const s = v / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const lum = ({ r, g, b }) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const over = (fg, bg) => ({
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
      a: 1,
    });
    // Effective backdrop: first non-transparent background walking up the tree.
    const backdrop = (el) => {
      let node = el;
      let acc = null;
      while (node) {
        const bg = parse(getComputedStyle(node).backgroundColor);
        if (bg && bg.a > 0) {
          acc = acc ? over(acc, bg) : bg;
          if (acc.a >= 0.999) return acc;
        }
        node = node.parentElement;
      }
      return acc && acc.a >= 0.999 ? acc : { r: 255, g: 255, b: 255, a: 1 };
    };

    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('[aria-hidden="true"]') || el.closest('.sr-only')) continue;
      // only elements that directly render text
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!own) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue;

      const fg = parse(cs.color);
      if (!fg) continue;
      const bg = backdrop(el);
      const solid = fg.a < 1 ? over(fg, bg) : fg;
      const [l1, l2] = [lum(solid), lum(bg)].sort((a, b) => b - a);
      const ratio = (l1 + 0.05) / (l2 + 0.05);

      const px = parseFloat(cs.fontSize);
      const bold = Number(cs.fontWeight) >= 700;
      const large = px >= 24 || (bold && px >= 18.66);
      const need = large ? 3 : 4.5;
      if (ratio < need) {
        out.push(
          `${el.className || el.tagName} "${el.textContent.trim().slice(0, 26)}" ` +
            `${ratio.toFixed(2)}:1 (needs ${need}, ${Math.round(px)}px)`
        );
      }
    }
    return [...new Set(out)];
  });

  console.log(`\ncontrast: ${failures.length ? failures.length + ' failing' : 'all text passes AA'}`);
  for (const f of failures.slice(0, 12)) note('contrast ' + f);
  await ctx.close();
}

/* ── geometry table at 1440, compared against the reference-derived targets ─
   Targets come from measuring the reference screenshot and scaling it to this
   implementation's 1184px container. See DESIGN-NOTES.md. */
{
  const TARGETS = {
    'hero sky': 838,
    'results grid': 690,
    'bento grid': 537,
    'trust grid': 156,
    'faq list': 294,
    'cta card': 675,
    'use-case row': 53,
    'sky → next heading gap': 135,
    'page height': 6716,
  };
  const TOLERANCE = 0.09; // 9% — rasterisation and substituted fonts move text blocks

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  const actual = await page.evaluate(() => {
    const box = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: r.height, width: r.width };
    };
    const sky = box('.stage__sky');
    const nextHeading = box('#steps-h');
    return {
      'hero sky': sky?.height,
      'results grid': box('.results__grid')?.height,
      'bento grid': box('.bento__grid')?.height,
      'trust grid': box('.trust__grid')?.height,
      'faq list': box('.faq__list')?.height,
      'cta card': box('.cta__card')?.height,
      'use-case row': box('.uses__list li')?.height,
      'sky → next heading gap':
        sky && nextHeading ? nextHeading.top - (sky.top + sky.height) : undefined,
      'page height': document.body.scrollHeight,
      container: box('.hero .shell')?.width,
    };
  });

  console.log(`\ngeometry @1440 (container ${Math.round(actual.container)}px)`);
  for (const [name, target] of Object.entries(TARGETS)) {
    const got = Math.round(actual[name] ?? 0);
    const delta = (got - target) / target;
    const flag = Math.abs(delta) > TOLERANCE ? ' <-- off' : '';
    console.log(
      `  ${name.padEnd(24)} ${String(got).padStart(6)}  target ${String(target).padStart(6)}` +
        `  ${(delta * 100).toFixed(1).padStart(6)}%${flag}`
    );
    if (Math.abs(delta) > TOLERANCE) note(`${name} is ${(delta * 100).toFixed(1)}% off the reference`);
  }
  await ctx.close();
}

/* ── component crops at 2× for typography and local geometry ───────────── */
if (!CHECK_ONLY) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  for (const [name, sel] of Object.entries(CROPS)) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: join(OUT, `${name}.png`) });
  }
  console.log('\ncomponent crops written');
  await ctx.close();
}

/* ── interaction, keyboard and focus behaviour ─────────────────────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'load' });

  console.log('\ninteraction (430px)');
  const toggle = page.locator('.nav__toggle');
  await toggle.click();
  if ((await toggle.getAttribute('aria-expanded')) !== 'true') note('nav did not open');
  if (!(await page.locator('#nav-list a').first().isVisible())) note('nav panel not visible when open');

  await page.keyboard.press('Escape');
  if ((await toggle.getAttribute('aria-expanded')) !== 'false') note('Escape did not close the nav');
  if (!(await page.evaluate(() => document.activeElement?.classList.contains('nav__toggle'))))
    note('focus was not returned to the nav trigger after Escape');

  await toggle.click();
  await page.setViewportSize({ width: 1280, height: 860 });
  if (await page.evaluate(() => document.querySelector('.nav')?.hasAttribute('data-open')))
    note('nav stayed open after crossing the breakpoint');

  const qa = page.locator('.qa').first();
  await qa.locator('summary').click();
  if (!(await qa.evaluate((el) => el.open))) note('FAQ item did not open');
  if (!(await qa.locator('.qa__a').isVisible())) note('FAQ answer hidden while open');

  // Keyboard-only reachability of the primary action.
  await page.keyboard.press('Home');
  const reached = await page.evaluate(async () => {
    const first = document.querySelector('.hero .btn--dark');
    return first instanceof HTMLElement && first.tabIndex >= 0;
  });
  if (!reached) note('hero primary action is not keyboard focusable');

  if (!CHECK_ONLY) {
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.screenshot({ path: join(OUT, 'state-faq-open.png') });
    await page.setViewportSize({ width: 430, height: 932 });
    await page.locator('.nav__toggle').click();
    await page.screenshot({ path: join(OUT, 'state-nav-open.png') });
  }
  await ctx.close();
}

/* ── degraded environments: no JavaScript, forced colours, reduced motion ─ */
{
  // Without JavaScript the page must still be fully readable and navigable.
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'load' });
  if (!(await page.locator('.hero__h1').isVisible())) note('no-JS: hero heading missing');
  if (!(await page.locator('#nav-list a').first().isVisible())) note('no-JS: desktop nav hidden');
  if ((await page.locator('.qa').count()) !== 6) note('no-JS: FAQ items missing');
  await page.locator('.qa summary').first().click();
  if (!(await page.locator('.qa__a').first().isVisible())) note('no-JS: FAQ does not open');
  if ((await page.locator('.marquee__row li').count()) === 0) note('no-JS: integration row empty');
  console.log('\nno-JavaScript ok');
  await ctx.close();
}
{
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 860 },
    forcedColors: 'active',
    colorScheme: 'light',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE, { waitUntil: 'load' });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  if (overflow > 1) note(`forced-colors: horizontal overflow ${overflow}px`);
  if (!(await page.locator('.hero__h1').isVisible())) note('forced-colors: hero heading not visible');
  if (errors.length) note('forced-colors: ' + errors[0]);
  if (!CHECK_ONLY) await page.screenshot({ path: join(OUT, 'state-forced-colors.png') });
  console.log('forced-colors ok');
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'load' });
  const marquee = await page.evaluate(() => {
    const track = document.querySelector('.marquee__track');
    if (!track) return null;
    const cs = getComputedStyle(track);
    return { name: cs.animationName, transform: cs.transform };
  });
  if (!marquee) note('reduced-motion: marquee track missing');
  else if (marquee.name !== 'none') note(`reduced-motion: marquee still animating (${marquee.name})`);
  if ((await page.locator('.marquee__row li').count()) === 0)
    note('reduced-motion: integration row lost its content');
  console.log('reduced-motion ok');
  await ctx.close();
}

/* ── 404 route ─────────────────────────────────────────────────────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const res = await page.goto(`${BASE}/does-not-exist`, { waitUntil: 'load' });
  if (res?.status() !== 404) note(`404 route returned ${res?.status()}`);
  if (!(await page.locator('h1').first().isVisible())) note('404 page has no visible heading');
  console.log('\n404 route ok');
  await ctx.close();
}

await browser.close();
stopServer();

console.log(problems.length ? `\n${problems.length} problem(s) found.\n` : '\nAll gates passed.\n');
process.exit(problems.length ? 1 : 0);
