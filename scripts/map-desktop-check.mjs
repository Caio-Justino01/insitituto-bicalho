import {chromium} from '@playwright/test';
const b=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome'});const c=await b.newContext({viewport:{width:1440,height:1000}});const p=await c.newPage();
await p.goto('http://127.0.0.1:4321/');await p.locator('.unit-map').last().scrollIntoViewIfNeeded();await p.waitForTimeout(10000);
console.log(p.frames().map(f=>f.url()));for(const f of p.frames().filter(f=>f.url().includes('/maps/embed'))){console.log((await f.locator('body').innerText()).slice(0,500));}
await p.screenshot({path:'artifacts/v3-map-desktop.png'});await p.addStyleTag({content:'.site-header,.assistant-launcher,.mobile-cta{visibility:hidden!important}'});await p.locator('#unidades').screenshot({path:'artifacts/v3-units-1440.png'});await b.close();
