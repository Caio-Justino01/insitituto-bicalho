import {chromium} from '@playwright/test';
const b=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome'});const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:4321/');await p.waitForTimeout(1200);await p.screenshot({path:'artifacts/v3-hero-mobile.png'});
await p.locator('#primary-booking').click();await p.screenshot({path:'artifacts/v3-booking-mobile.png'});await p.keyboard.press('Escape');
await p.locator('.assistant-launcher').click();await p.screenshot({path:'artifacts/v3-assistant-mobile.png'});
await p.getByRole('button',{name:'Tenho dúvidas',exact:true}).click();await p.getByRole('button',{name:'Tratamentos',exact:true}).click();await p.getByRole('button',{name:'Estética',exact:true}).click();await p.getByRole('button',{name:'Clareamento dental',exact:true}).click();await p.getByRole('button',{name:'Continuar com a equipe',exact:true}).click();await p.getByRole('button',{name:'Belo Horizonte',exact:true}).click();await p.locator('#support-note').fill('Prefiro conversar à tarde.');await p.screenshot({path:'artifacts/v3-summary-mobile.png'});
console.log({errors,href:await p.locator('#support-actions [data-whatsapp]').getAttribute('href')});await p.keyboard.press('Escape');await p.locator('#unidades').scrollIntoViewIfNeeded();await p.waitForTimeout(1500);await p.locator('#unidades').screenshot({path:'artifacts/v3-units-mobile.png'});console.log(await p.locator('iframe').evaluateAll(x=>x.map(f=>({src:f.src,loading:f.loading}))));
await b.close();
