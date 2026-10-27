import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
const routes = ['/', '/tratamentos/', '/estetica/', '/ortodontia-e-cirurgia/', '/odontologia-de-precisao/'];
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
const checks = [], errors = [];
await mkdir('artifacts/photo-quality', { recursive: true });
try {
  for (const dpr of [2, 3]) for (const width of [320, 390, 768, 1024, 1366, 2560]) {
    // A fresh cache avoids a previously downloaded large candidate hiding a regression.
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: dpr, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const team = page.locator('#equipe-completa');
      if (await team.count()) await team.evaluate(element => { element.open = true; });
      const photos = page.locator('.photo');
      for (let index = 0; index < await photos.count(); index++) {
        const photo = photos.nth(index), img = photo.locator('img');
        await photo.scrollIntoViewIfNeeded();
        await page.waitForFunction(element => {
          const aspect = Number(element.getAttribute('width')) / Number(element.getAttribute('height'));
          const slot = Math.ceil(getComputedStyle(element).objectFit === 'cover' ? Math.max(element.clientWidth, element.clientHeight * aspect) : element.clientWidth);
          return element.sizes === `${slot}px` && element.complete && element.naturalWidth > 0;
        }, await img.elementHandle());
        await img.evaluate(element => element.decode());
        const result = await img.evaluate(element => {
          const source = element.closest('picture').querySelector('source');
          const candidates = source.srcset.split(',').map(candidate => Number(candidate.trim().split(/\s+/).at(-1).replace('w', '')));
          const selected = Number(element.currentSrc.match(/-(\d+)\.(avif|webp)/)[1]);
          const required = Number.parseInt(element.sizes) * devicePixelRatio;
          const available = Math.max(...candidates);
          return { file: new URL(element.currentSrc).pathname.split('/').at(-1), selected, required, available, ratio: selected / Math.min(required, available) };
        });
        assert(result.ratio >= .98, JSON.stringify({ width, dpr, route, ...result }));
        checks.push({ width, dpr, route, ...result });
        if (route === '/' && dpr === 3 && [390, 1366].includes(width) && [0, 6, 7, 8].includes(index)) {
          await photo.screenshot({ path: `artifacts/photo-quality/${width}-photo-${index}.png` });
        }
      }
    }
    await context.close();
  }
  // The server-rendered fallback must also provide a suitable crop without JavaScript.
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  for (const selector of ['.hero-photo', '.area-card-3 .photo', '.area-card-4 .photo', '.precision-photo']) {
    const img = page.locator(`${selector} img`);
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(element => element.decode());
    const result = await img.evaluate(element => ({ file: element.currentSrc, width: Number(element.currentSrc.match(/-(\d+)\.(avif|webp)/)[1]) }));
    assert(result.width >= (selector.includes('area-card') ? 2560 : 1600), JSON.stringify({ selector, ...result }));
  }
  await context.close();
  assert.deepEqual(errors, []);
  await writeFile('artifacts/photo-quality/verification.json', JSON.stringify({ checks, errors, noJavaScript: true }, null, 2));
  console.log(`PASS: ${checks.length} photo/viewport checks at 2x and 3x, native-resolution limits, no-JavaScript fallbacks, no page errors.`);
} finally {
  await browser.close();
}
