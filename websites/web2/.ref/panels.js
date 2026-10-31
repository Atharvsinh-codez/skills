const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('https://autosend.com', { waitUntil: 'networkidle', timeout: 90000 });
  const out = { code: {} , phrases: [] };
  // full phrase list
  const seen = new Set();
  for (let i = 0; i < 90; i++) { const t = await p.evaluate(() => { const s=[...document.querySelectorAll('span')].find(e=>{const r=e.getBoundingClientRect(); return r.y>930&&r.y<990&&r.x>390&&r.x<420}); return s? s.textContent: null; }); if (t && /[.!?]$/.test(t.trim())) seen.add(t.trim()); await p.waitForTimeout(400); }
  out.phrases = [...seen];
  const tabs = ['Email API / SMTP', 'SDK', 'Inbound', 'Webhooks'];
  const langs = ['cURL','NodeJS','Rust','Go','PHP','C#','Java','Python'];
  for (const t of tabs) {
    await p.locator('p:visible', { hasText: new RegExp('^' + t.replace(/[/]/g,'\\/') + '$', 'i') }).first().click(); await p.waitForTimeout(500);
    out.code[t] = {};
    for (const l of langs) {
      const btn = p.locator('button:visible', { hasText: new RegExp('^' + l.replace('#','\\#') + '$') }).first();
      if (await btn.count()) { await btn.click(); await p.waitForTimeout(250); }
      const rr = await p.evaluate(() => { const codes=[...document.querySelectorAll('code')].filter(c=>{const r=c.getBoundingClientRect(); return r.width>0}); return codes.map(c=>c.innerText); });
      const toggles = await p.evaluate(()=>[...document.querySelectorAll('button')].filter(b=>/^(request|response)$/i.test(b.textContent.trim())&&b.getBoundingClientRect().width>0).map(b=>b.textContent.trim()));
      out.code[t][l] = { code: rr[0], toggles };
      if (toggles.length) { const rb = p.locator('button:visible', { hasText: /^Response$/i }).first(); await rb.click(); await p.waitForTimeout(250); const rc = await p.evaluate(() => [...document.querySelectorAll('code')].filter(c=>c.getBoundingClientRect().width>0).map(c=>c.innerText)[0]); out.code[t][l].response = rc; await p.locator('button:visible', { hasText: /^Request$/i }).first().click(); await p.waitForTimeout(200); }
    }
  }
  // marketing & automation tab screenshots
  const shots = [['Domain Warmup','m2'],['Dynamic Segmentation','m3'],['Email Builder','m4'],['Smart Triggers','a2'],['Analytics & Insights','a3']];
  for (const [t,n] of shots) { const el = p.locator('p:visible', { hasText: new RegExp('^' + t + '$', 'i') }).first(); await el.click(); await p.waitForTimeout(900); const box = await el.boundingBox(); await p.screenshot({ path: `tab-${n}.png`, clip: { x: 700, y: Math.max(0, box.y - 260), width: 600, height: 560 } }); out[n] = await p.evaluate((y)=>{ const w=[...document.querySelectorAll('div')].filter(d=>{const r=d.getBoundingClientRect(); return r.x>740&&r.x<750&&r.width>490&&r.width<510&&r.height>400;}); return w.map(x=>x.innerText.slice(0,1500)); }); }
  fs.writeFileSync('panels.json', JSON.stringify(out, null, 1));
  await b.close();
})();
