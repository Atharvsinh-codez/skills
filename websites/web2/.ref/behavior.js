const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('https://autosend.com', { waitUntil: 'networkidle', timeout: 90000 });
  const out = {};
  // hero prompt phrases over time
  out.phrases = [];
  for (let i = 0; i < 24; i++) { const t = await p.evaluate(() => { const s=[...document.querySelectorAll('span')].find(e=>{const r=e.getBoundingClientRect(); return r.y>930&&r.y<990&&r.x>390&&r.x<420}); return s? s.textContent: null; }); out.phrases.push(t); await p.waitForTimeout(700); }
  // logos over time
  out.logos = [];
  for (let i = 0; i < 4; i++) { await p.evaluate(() => window.scrollTo(0, 1500)); const l = await p.evaluate(() => [...document.querySelectorAll('img')].filter(i => { const r = i.getBoundingClientRect(); const s=getComputedStyle(i); return r.width > 0 && s.display!=='none' && r.top + scrollY > 1800 && r.top + scrollY < 1950; }).map(i => i.alt + ' op' + getComputedStyle(i).opacity+' '+Math.round(i.getBoundingClientRect().width)+'x'+Math.round(i.getBoundingClientRect().height))); out.logos.push(l); await p.waitForTimeout(2500); }
  // solutions menu
  await p.evaluate(() => window.scrollTo(0, 0));
  const btn = p.locator('button', { hasText: 'Solutions' }).first();
  await btn.hover(); await p.waitForTimeout(600);
  await p.screenshot({ path: 'live-menu-hover.png', clip: { x: 0, y: 0, width: 1440, height: 500 } });
  await btn.click(); await p.waitForTimeout(600);
  await p.screenshot({ path: 'live-menu.png', clip: { x: 0, y: 0, width: 1440, height: 500 } });
  out.menu = await p.evaluate(() => { const m=[...document.querySelectorAll('[role=menu],[data-radix-popper-content-wrapper],[role=dialog]')]; return m.map(x=>x.innerText); });
  await p.keyboard.press('Escape');
  // feature tab bar progress
  await p.evaluate(() => window.scrollTo(0, 2150)); await p.waitForTimeout(1000);
  out.bar = [];
  for (let i=0;i<6;i++){ out.bar.push(await p.evaluate(()=>{ const el=[...document.querySelectorAll('div')].filter(d=>{const r=d.getBoundingClientRect(); return r.width>0&&r.width<=4&&r.x>=168&&r.x<=172&&r.top+scrollY>2270&&r.top+scrollY<2800;}).map(d=>{const s=getComputedStyle(d); const r=d.getBoundingClientRect(); return Math.round(r.top+scrollY)+' h'+Math.round(r.height)+' w'+r.width+' '+s.backgroundImage.slice(0,90)+' '+s.backgroundColor+' tr:'+s.transform+' '+s.transition.slice(0,60)}); return el; })); await p.waitForTimeout(1500); }
  await p.screenshot({ path: 'live-sec1-later.png', clip: { x: 160, y: 2270-scrollYFix(), width: 1120, height: 540 } }).catch(()=>{});
  // click SDK tab
  const sdk = p.locator('text=SDK').first(); await sdk.click().catch(()=>{}); await p.waitForTimeout(800);
  await p.screenshot({ path: 'live-sdk.png' });
  const inb = p.locator('p', { hasText: /^Inbound$/ }).first(); await inb.click().catch(()=>{}); await p.waitForTimeout(800);
  await p.screenshot({ path: 'live-inbound.png' });
  const wh = p.locator('p', { hasText: /^Webhooks$/ }).first(); await wh.click().catch(()=>{}); await p.waitForTimeout(800);
  await p.screenshot({ path: 'live-webhooks.png' });
  fs.writeFileSync('behavior.json', JSON.stringify(out, null, 1));
  await b.close();
  function scrollYFix(){return 2150;}
})();
