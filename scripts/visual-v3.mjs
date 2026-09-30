import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const b=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome'});const context=await b.newContext({viewport:{width:390,height:844}});const p=await context.newPage();
const url='http://127.0.0.1:4321/?preview=atendimento';
for(const viewport of [{width:360,height:800},{width:390,height:844},{width:430,height:932},{width:768,height:1024},{width:1024,height:900},{width:1440,height:1000}]){
 await p.setViewportSize(viewport);await p.goto(url);await p.waitForFunction(()=>!!document.body.dataset.motion);await p.waitForTimeout(1100);
 await p.screenshot({path:`artifacts/v3-hero-${viewport.width}.png`});
 if(viewport.width===390||viewport.width===1440){
  await p.locator('#primary-booking').click();await p.waitForTimeout(350);await p.screenshot({path:`artifacts/v3-booking-${viewport.width}.png`});await p.keyboard.press('Escape');await p.waitForTimeout(100);
  await p.locator('.assistant-launcher').click();await p.waitForTimeout(300);await p.screenshot({path:`artifacts/v3-assistant-${viewport.width}.png`});
  await p.getByRole('button',{name:'Quero agendar',exact:true}).click();await p.getByRole('button',{name:'João Monlevade',exact:true}).click();await p.getByRole('button',{name:'Conversar pelo WhatsApp',exact:true}).click();await p.locator('#support-note').fill('Prefiro um horário à tarde.');await p.locator('#support-actions [data-whatsapp]').scrollIntoViewIfNeeded();await p.waitForTimeout(300);await p.locator('#support-note').evaluate(el=>el.blur());await p.screenshot({path:`artifacts/v3-review-${viewport.width}.png`});
  await p.keyboard.press('Escape');await p.waitForTimeout(100);await p.locator('.assistant-launcher').evaluate(el=>el.blur());
  await p.locator('#unidades').scrollIntoViewIfNeeded();await p.locator('.unit-map').last().scrollIntoViewIfNeeded();await p.waitForTimeout(7000);
  const hide=await p.addStyleTag({content:'.assistant-launcher,.mobile-cta,.site-header,.skip-link{visibility:hidden!important}'});
  await p.locator('#unidades').screenshot({path:`artifacts/v3-units-${viewport.width}.png`});await p.locator('.site-footer').screenshot({path:`artifacts/v3-footer-${viewport.width}.png`});await hide.evaluate(el=>el.remove());
 }
}
await writeFile('artifacts/visual-v3.json',JSON.stringify({url,widths:[360,390,430,768,1024,1440],captures:'hero, booking, assistant, review, units, footer'},null,2));
await b.close();console.log('V3 visual captures complete');
