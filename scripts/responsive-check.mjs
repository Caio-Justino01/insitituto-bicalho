import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
const routes = ['/', '/tratamentos/', '/estetica/', '/ortodontia-e-cirurgia/', '/odontologia-de-precisao/', '/contato/', '/politica-de-privacidade/', '/termos-de-uso/', '/politica-de-cookies/', '/404.html'];
const widths = [320, 360, 390, 430, 600, 767, 768, 820, 1023, 1024, 1199, 1200, 1280, 1366, 1440, 1920, 2560];
const heights = { 320: 568, 360: 640, 390: 844, 430: 932, 600: 960, 767: 1024, 768: 1024, 820: 1180, 1023: 768, 1024: 768, 1199: 820, 1200: 800, 1280: 800, 1366: 768, 1440: 900, 1920: 1080, 2560: 1440 };
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
const checks = [], errors = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  for (const scale of [1, 2]) {
    for (const width of scale === 1 ? widths : [320, 390, 768, 1024, 1366, 1920]) {
      await page.setViewportSize({ width, height: heights[width] });
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => document.fonts.ready);
        if (scale === 2) await page.addStyleTag({ content: 'html{font-size:200%}' });
        const layout = await page.evaluate(() => {
          const box = el => el.getBoundingClientRect();
          const cards = [...document.querySelectorAll('.unit-heading')].map(el => {
            const icon = box(el.querySelector('.circle-icon')), label = box(el.querySelector('.eyebrow'));
            return Math.abs(icon.top + icon.height / 2 - label.top - label.height / 2);
          });
          return {
            overflow: document.documentElement.scrollWidth - innerWidth,
            clippedText: [...document.querySelectorAll('main h1,main h2,main h3,main p,main summary')].filter(el => el.getClientRects().length && el.scrollWidth > el.clientWidth + 1).map(el => el.textContent.slice(0, 80)),
            footerLogo: box(document.querySelector('.footer-brand')).width,
            unitHeaders: cards,
            unitMaps: [...document.querySelectorAll('.unit-map')].map(el => box(el).top),
            fullNavigation: getComputedStyle(document.querySelector('.desktop-nav')).display !== 'none',
            h1Count: document.querySelectorAll('h1').length,
            artificialPhotos: [...document.images].filter(img => /hero-branded|precision-branded|assistant-160|\/smile-|\/aligners-/.test(img.getAttribute('src'))).length,
          };
        });
        assert(layout.overflow <= 0, JSON.stringify({ route, width, scale, ...layout }));
        assert.deepEqual(layout.clippedText, [], `${route} clips text at ${width}px, scale ${scale}`);
        assert(layout.unitHeaders.every(delta => delta < .5), 'Location headings lost alignment');
        if (width >= 768 && layout.unitMaps.length === 2) assert(Math.abs(layout.unitMaps[0] - layout.unitMaps[1]) < 1, 'Unit maps must share a row');
        assert(layout.footerLogo <= 220, 'Footer logo is oversized');
        assert.equal(layout.fullNavigation, width >= 1200, 'Navigation breakpoint differs from the layout');
        assert.equal(layout.h1Count, 1);
        assert.equal(layout.artificialPhotos, 0);
        checks.push({ route, width, scale, ...layout });
      }
    }
  }
  // The floating booking CTA must stay away from the location section and footer.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.locator('#instituto').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => !document.querySelector('.mobile-cta').hidden);
  await page.locator('#unidades').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.mobile-cta').hidden);
  await page.locator('.agency-credit').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.body.classList.contains('footer-visible'));
  assert(await page.locator('.mobile-cta').isHidden());
  const collision = await page.evaluate(() => {
    const helper = document.querySelector('.assistant-launcher').getBoundingClientRect();
    return [...document.querySelectorAll('.site-footer a,.site-footer button')].filter(el => {
      const r = el.getBoundingClientRect();
      return r.width && r.height && r.left < helper.right && r.right > helper.left && r.top < helper.bottom && r.bottom > helper.top;
    }).map(el => el.textContent.trim());
  });
  assert.deepEqual(collision, [], 'The assistant covers a footer link');
  for (const width of [390, 768, 1366]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      const target = document.querySelector('.unit:last-child [data-whatsapp]').getBoundingClientRect();
      scrollTo({ top: target.top + scrollY - innerHeight + 44, behavior: 'instant' });
    });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const obstructsBooking = await page.evaluate(() => {
      const launcher = document.querySelector('.assistant-launcher');
      if (launcher.hidden || getComputedStyle(launcher).visibility === 'hidden') return false;
      const helper = launcher.getBoundingClientRect(), action = document.querySelector('.unit:last-child [data-whatsapp]').getBoundingClientRect();
      return helper.left < action.right && helper.right > action.left && helper.top < action.bottom && helper.bottom > action.top;
    });
    assert(!obstructsBooking, `Assistant covers the unit booking link at ${width}px`);
  }
  assert.deepEqual(errors, []);
  await mkdir('artifacts/refinement', { recursive: true });
  await writeFile('artifacts/refinement/responsive-verification.json', JSON.stringify({ checks, errors, footerCollision: collision }, null, 2));
  console.log(`PASS: ${checks.length} page/viewport/text-scale checks, ten pages, 320–2560px, location alignment and unobstructed footer.`);
} finally {
  await browser.close();
}
