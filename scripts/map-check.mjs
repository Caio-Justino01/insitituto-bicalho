import {chromium} from '@playwright/test';
const b=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome'});const p=await b.newPage({viewport:{width:390,height:844}});p.on('response',r=>{if(r.request().resourceType()==='document')console.log(r.status(),r.url().slice(0,180))});p.on('requestfailed',r=>console.log('FAIL',r.failure(),r.url().slice(0,120)));
await p.goto('http://127.0.0.1:4321/');await p.locator('.unit-map').first().scrollIntoViewIfNeeded();await p.waitForTimeout(7000);console.log('frames',p.frames().map(f=>f.url()));for(const f of p.frames().slice(1)){try{console.log((await f.locator('body').innerText()).slice(0,1000));}catch{}}
await p.screenshot({path:'artifacts/v3-map-check.png'});await b.close();
