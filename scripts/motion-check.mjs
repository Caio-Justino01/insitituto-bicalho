import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4321');
await page.waitForFunction(()=>document.body.dataset.motion==='ready');
await page.waitForTimeout(1200);
assert((await page.locator('.motion-line').count())>0);
assert.equal(await page.locator('h1').getAttribute('aria-label'),'Precisão no cuidado.Confiança para sorrir.');
const sections=await page.locator('main>section').count();
for(let i=0;i<sections;i++){
 await page.locator('main>section').nth(i).scrollIntoViewIfNeeded();
 await page.waitForTimeout(60);
}
await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
await page.waitForTimeout(1100);
for(const selector of ['.institution-copy>p','.area-card-copy','.team-copy>p','.unit']){
 assert(await page.locator(selector).evaluateAll(els=>els.every(el=>+getComputedStyle(el).opacity>.99)),`${selector} stayed hidden`);
}
await page.locator('.team-panel>summary').click();await page.waitForTimeout(350);
assert.equal(await page.locator('.team-person').count(),12);
assert.equal(await page.locator('.team-panel').getAttribute('open'),'');
await page.locator('.team-panel>summary').click();await page.waitForTimeout(350);
assert.equal(await page.locator('.team-panel').getAttribute('open'),null);
await page.locator('[data-team-open]').click();await page.waitForTimeout(350);
assert.equal(await page.locator('.team-panel').getAttribute('open'),'');
await page.locator('.team-panel>summary').click();await page.waitForTimeout(350);
assert.equal(await page.locator('.team-panel').getAttribute('open'),null);
for(const selector of ['.faq-list details:first-child','.team-panel']){
 await page.locator(`${selector}>summary`).click(); await page.waitForTimeout(300);
 assert.equal(await page.locator(selector).getAttribute('open'),'');
 await page.locator(`${selector}>summary`).press('Enter'); await page.waitForTimeout(300);
 assert.equal(await page.locator(selector).getAttribute('open'),null);
 assert.equal(await page.locator(selector).evaluate(el=>el.style.height),'');
}
for(const viewport of [{width:1440,height:1000},{width:844,height:390},{width:360,height:800},{width:430,height:900}]){
 await page.setViewportSize(viewport);await page.waitForTimeout(550);
 assert.equal(await page.locator('body').getAttribute('data-motion'),'ready');
 assert.equal(await page.locator('.motion-line .motion-line').count(),0);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
}
await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
await page.addStyleTag({content:'html{font-size:200%}'});await page.waitForTimeout(800);
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(300);
assert.equal(await page.locator('body').getAttribute('data-motion'),'reduced');
assert.equal(await page.locator('.motion-line').count(),0);
assert(await page.locator('main [style]').evaluateAll(els=>els.every(el=>+getComputedStyle(el).opacity>.99)));
await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(300);
assert.equal(await page.locator('body').getAttribute('data-motion'),'ready');
assert.deepEqual(errors,[]);
await writeFile('artifacts/motion-v2.json',JSON.stringify({motion:'GSAP active',headings:'accessible labels + line masks',scroll:'fast scroll and return, no hidden content',accordions:'team 12, FAQ, pointer, Enter, close and external team link',responsive:'desktop/mobile/orientation/200% text/reduced motion live rebuild',errors},null,2));
console.log('Motion tests passed');await browser.close();
