const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('https://autosend.com', { waitUntil: 'networkidle', timeout: 90000 });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
  const html = await p.evaluate(() => {
    const c = document.body.cloneNode(true);
    c.querySelectorAll('script,style,noscript,link').forEach(e => e.remove());
    c.querySelectorAll('svg').forEach(s => { s.querySelectorAll('*').forEach(x=>{}); });
    return c.innerHTML;
  });
  require('fs').writeFileSync('live-body.html', html);
  const fontsCss = await p.evaluate(() => { const out=[]; for (const sh of document.styleSheets) { try { for (const r of sh.cssRules) { if (r.constructor.name==='CSSFontFaceRule') out.push(r.cssText.slice(0,300)); } } catch(e){} } return out; });
  require('fs').writeFileSync('live-fonts.txt', fontsCss.join('\n'));
  await b.close();
  console.log(html.length);
})();
