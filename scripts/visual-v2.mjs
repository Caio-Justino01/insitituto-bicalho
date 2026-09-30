import { chromium } from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
page.on('pageerror',e=>{throw e;});
await mkdir('artifacts/v2',{recursive:true});
async function ready(){
 await page.evaluate(()=>document.fonts.ready);
 await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(async img=>{img.loading='eager';await img.decode().catch(()=>{});}))); await page.waitForTimeout(150);
}
for(const width of [360,390,430,768,1024,1440]){
 await page.setViewportSize({width,height:width>=1000?1000:844});await page.goto('http://127.0.0.1:4321');await ready();
 await page.screenshot({path:`artifacts/v2/hero-${width}.png`});
 if(width===390||width===1440) await page.screenshot({path:`artifacts/v2/home-${width}.png`,fullPage:true});
}
for(const width of [390,1440]){
 await page.setViewportSize({width,height:width>1000?1000:844});
 for(const slug of ['tratamentos','estetica','ortodontia-e-cirurgia','odontologia-de-precisao']){
  await page.goto(`http://127.0.0.1:4321/${slug}/`);await ready();
  await page.screenshot({path:`artifacts/v2/${slug}-${width}.png`});
 }
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4321');await ready();
for(const selector of ['.institution','.areas','.precision','.team','.units']){
 await page.locator(selector).scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/v2/scene-${selector.slice(1)}.png`});
}
await browser.close();console.log('V2 screenshots saved, images decoded at every viewport.');
