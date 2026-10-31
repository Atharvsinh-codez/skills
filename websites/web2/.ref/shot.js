const { chromium } = require('playwright');
(async () => {
  const url = process.argv[2] || 'http://localhost:3100';
  const out = process.argv[3] || 'impl';
  const w = +(process.argv[4] || 1440);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  const logs = [];
  p.on('console', m => { if (['error','warning'].includes(m.type())) logs.push(m.type()+': '+m.text().slice(0,300)); });
  p.on('pageerror', e => logs.push('pageerror: '+e.message));
  p.on('requestfailed', r => logs.push('reqfail: '+r.url()));
  for (let i=0;i<20;i++){ try { await p.goto(url, { waitUntil: 'networkidle', timeout: 120000 }); break; } catch(e){ await new Promise(r=>setTimeout(r,3000)); } }
  await p.evaluate(() => document.fonts.ready);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(100); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1500);
  await p.screenshot({ path: out + '-full.png', fullPage: true });
  const info = await p.evaluate(() => ({ h: document.body.scrollHeight, sw: document.documentElement.scrollWidth, fonts: [...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.style).filter((v,i,a)=>a.indexOf(v)===i),
    pos: ['h1','#transactional-title','#marketing-title','#automation-title','#projects-title','#agents-title','#wondering-title','footer'].map(s=>{const e=document.querySelector(s); if(!e) return s+':none'; const r=e.getBoundingClientRect(); return s+':'+Math.round(r.x)+','+Math.round(r.y+scrollY)+' '+Math.round(r.width)+'x'+Math.round(r.height);}) }));
  console.log(JSON.stringify(info)); console.log(logs.slice(0,30).join('\n'));
  await b.close();
})();
