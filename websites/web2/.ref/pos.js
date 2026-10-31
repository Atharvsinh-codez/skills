const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const res = {};
  for (const [k,url] of [['live','https://autosend.com'],['impl','http://localhost:3217']]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await p.evaluate(()=>document.fonts.ready);
    res[k] = await p.evaluate(() => {
      const f = t => { const e=[...document.querySelectorAll('p,h1,h2,a,span,blockquote')].find(e=>e.textContent.trim().startsWith(t) && e.children.length<4); if(!e) return null; const r=e.getBoundingClientRect(); return Math.round(r.y+scrollY)+'/'+Math.round(r.height); };
      return ['5,125,980','Emails sent by big','#01','#02','#03','Multi project support','Agentic Integrations','AutoSend has transformed','Pratyush Rungta','Still wondering','Talk to a Human','Transactional Emails','All systems operational'].map(t=>t+' '+f(t));
    });
    await p.close();
  }
  res.live.forEach((l,i)=>console.log(l.padEnd(45), res.impl[i]));
  await b.close();
})();
