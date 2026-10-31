const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3217', { waitUntil: 'networkidle' });
  console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('img')].filter(i=>/orshot|supermemory/.test(i.src)).map(i => ({a:[i.getAttribute('width'),i.getAttribute('height')], r:[i.width,i.height], n:[i.naturalWidth,i.naturalHeight], st:i.getAttribute('style')})))));
  await b.close();
})();
