import sharp from 'sharp';
for (const name of ['hero-branded','aligners','precision-branded']) {
 for (const width of [480,800,1200,1600]) {
  await sharp(`assets/originals/${name}.png`).resize({width}).webp({quality:80}).toFile(`public/assets/${name}-${width}.webp`);
  await sharp(`assets/originals/${name}.png`).resize({width}).avif({quality:55,effort:3}).toFile(`public/assets/${name}-${width}.avif`);
 }
}
await sharp('assets/originals/assistant.png').resize(160,160).webp({quality:85}).toFile('public/assets/assistant-160.webp');
console.log('V3 images optimized');
