const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto('https://autosend.com', { waitUntil: 'networkidle', timeout: 90000 });
  await p.waitForTimeout(2500);
  // scroll to trigger lazy content
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(150); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(800);
  await p.screenshot({ path: 'live-full.png', fullPage: true });
  const info = await p.evaluate(() => {
    const out = {};
    out.height = document.body.scrollHeight;
    out.fonts = [...document.fonts].filter(f=>f.status==='loaded').map(f => f.family + ' ' + f.weight + ' ' + f.style);
    const pick = (sel) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { sel, ff: s.fontFamily, fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color, bg: s.backgroundColor, x: r.x, y: r.y + scrollY, w: r.width, h: r.height }; };
    out.body = pick('body');
    out.h1 = pick('h1'); out.h1em = pick('h1 em, h1 i');
    out.h2s = [...document.querySelectorAll('h2')].map(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { t: e.textContent.slice(0, 50), ff: s.fontFamily, fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color, x: r.x, y: r.y + scrollY, w: r.width }; });
    out.header = pick('header'); out.nav = pick('nav');
    out.links = [...document.querySelectorAll('header a, header button')].map(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { t: e.textContent.trim().slice(0, 30), ff: s.fontFamily, fs: s.fontSize, fw: s.fontWeight, ls: s.letterSpacing, tt: s.textTransform, color: s.color, bg: s.backgroundColor, br: s.borderRadius, x: r.x, y: r.y, w: r.width, h: r.height, pad: s.padding }; });
    out.footerText = document.querySelector('footer') ? document.querySelector('footer').innerText : null;
    out.cssVars = (() => { const s = getComputedStyle(document.documentElement); const v = {}; for (const sh of document.styleSheets) { try { for (const r of sh.cssRules) { if (r.selectorText === ':root' ) { for (const n of r.style) if (n.startsWith('--')) v[n] = r.style.getPropertyValue(n).trim(); } } } catch (e) {} } return v; })();
    out.imgs = [...document.querySelectorAll('img')].map(i => i.currentSrc || i.src).filter((v,i,a)=>a.indexOf(v)===i);
    out.svgCount = document.querySelectorAll('svg').length;
    return out;
  });
  require('fs').writeFileSync('live-info.json', JSON.stringify(info, null, 1));
  await b.close();
  console.log('ok', info.height);
})().catch(e => { console.error(e); process.exit(1); });
