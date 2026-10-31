const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('https://autosend.com', { waitUntil: 'networkidle', timeout: 90000 });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  const res = await p.evaluate(() => {
    const lines = [];
    const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && s.opacity !== '0'; };
    const all = [...document.body.querySelectorAll('*')];
    for (const e of all) {
      if (!vis(e)) continue;
      const direct = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim();
      const s = getComputedStyle(e); const r = e.getBoundingClientRect();
      const box = s.borderTopWidth !== '0px' || s.borderLeftWidth !== '0px' || (s.backgroundColor !== 'rgba(0, 0, 0, 0)') || s.boxShadow !== 'none';
      if (!direct && !(box && r.width > 30)) continue;
      const ff = s.fontFamily.split(',')[0].replace(/"/g, '');
      lines.push([Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height), e.tagName.toLowerCase(), direct ? `"${direct.slice(0, 40)}"` : '', direct ? `${ff} ${s.fontSize}/${s.lineHeight} w${s.fontWeight} ls${s.letterSpacing} ${s.textTransform !== 'none' ? s.textTransform : ''} c:${s.color}` : '', s.backgroundColor !== 'rgba(0, 0, 0, 0)' ? 'bg:' + s.backgroundColor : '', s.borderTopWidth !== '0px' ? `bt:${s.borderTopWidth} ${s.borderTopColor}` : '', s.borderLeftWidth !== '0px' ? `bl:${s.borderLeftWidth} ${s.borderLeftColor}` : '', s.borderRadius !== '0px' ? 'r:' + s.borderRadius : '', s.boxShadow !== 'none' ? 'sh:' + s.boxShadow.slice(0, 80) : '', s.padding !== '0px' ? 'p:' + s.padding : '', s.backgroundImage !== 'none' ? 'bgi:' + s.backgroundImage.slice(0, 120) : ''].filter(Boolean).join(' | '));
    }
    const svgs = [...document.querySelectorAll('svg')].filter(vis).map(s => { const r = s.getBoundingClientRect(); const ctx = (s.closest('a,button,li,div') || s.parentElement).textContent.trim().slice(0, 30); return { ctx, x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height), html: s.outerHTML }; });
    return { lines, svgs };
  });
  fs.writeFileSync('styles.txt', res.lines.join('\n'));
  fs.writeFileSync('svgs.json', JSON.stringify(res.svgs, null, 1));
  console.log(res.lines.length, res.svgs.length);
  await b.close();
})();
