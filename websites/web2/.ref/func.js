const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const out = [];
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
  await p.goto('http://localhost:3217', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Solutions' }).click();
  out.push('menu open: ' + await p.getByRole('link', { name: 'Inbound Email API' }).first().isVisible());
  await p.keyboard.press('Escape');
  out.push('menu closed: ' + !(await p.locator('[id] >> text=Email Builder').first().isVisible()));
  await p.getByRole('tab', { name: /Webhooks/ }).click(); await p.waitForTimeout(600);
  out.push('webhooks tab: ' + await p.getByText('Create New Webhook').isVisible());
  await p.getByRole('tab', { name: /Domain Warmup/ }).click(); await p.waitForTimeout(600);
  out.push('warmup tab: ' + await p.getByText('Daily send schedule').isVisible());
  await p.getByRole('tab', { name: /^Inbound/ }).click(); await p.waitForTimeout(400);
  await p.getByRole('button', { name: 'response' }).click();
  out.push('inbound response: ' + await p.getByText('"spamVerdict"').first().isVisible());
  await p.getByRole('tab', { name: /Email API/ }).click(); await p.waitForTimeout(400);
  await p.getByRole('button', { name: 'Python' }).first().click();
  out.push('python sample: ' + (await p.locator('[role=tabpanel] pre:visible').first().innerText()).slice(0,30).replace(/\n/g,' '));
  const txt = await p.evaluate(() => document.body.innerText);
  out.push('emoji in DOM: ' + (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(txt)));
  out.push('errors: ' + JSON.stringify(errs));
  for (const w of [360, 390, 768, 1024, 1280]) { const m = await b.newPage({ viewport: { width: w, height: 800 } }); await m.goto('http://localhost:3217', { waitUntil: 'networkidle' }); out.push(w + ' overflow: ' + (await m.evaluate(() => document.documentElement.scrollWidth)) ); if (w===390){ await m.getByRole('button',{name:'Open menu'}).click(); out.push('mobile menu: '+await m.getByRole('link',{name:'Pricing'}).isVisible()); await m.keyboard.press('Escape'); await m.screenshot({path:'m390.png'});} await m.close(); }
  console.log(out.join('\n')); await b.close();
})();
