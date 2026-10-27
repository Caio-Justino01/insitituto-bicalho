import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { exiftool } from 'exiftool-vendored';
import { media, photoWidths, photoCopyright } from '../src/data/photos.ts';
import { writePhotoCopyright } from './photo-rights.mjs';

// Edit container metadata only; never run the encoded photograph through an encoder.
const requested = new Set(process.argv.slice(2));
const checks = [];
const pixelHash = async file => createHash('sha256').update(await sharp(await readFile(file)).raw().toBuffer()).digest('hex');
try {
  for (const photo of Object.values(media).filter(photo => !requested.size || requested.has(photo.src))) {
    for (const width of photoWidths(photo)) for (const extension of ['webp','avif']) {
      const file = `public/assets/${photo.src}-${width}.${extension}`;
      const before = await pixelHash(file);
      const result = await writePhotoCopyright(exiftool, file);
      assert.deepEqual(result.warnings || [], [], file);
      assert.equal(await pixelHash(file), before, `${file}: decoded pixels changed`);
      const tags = await exiftool.read(file, { groupNames: true });
      assert.equal(tags['EXIF:Copyright'], photoCopyright, file);
      assert.equal(tags['XMP:Rights'], photoCopyright, file);
      assert.equal(tags['XMP:Rights-pt-BR'], photoCopyright, file);
      checks.push({ file, copyright: photoCopyright, pixelsUnchanged: true, pixelSha256: before });
    }
    console.log('Copyright verified without recompression:', photo.src);
  }
  await mkdir('artifacts/photo-copyright', { recursive: true });
  await writeFile('artifacts/photo-copyright/verification.json', JSON.stringify({ copyright: photoCopyright, files: checks.length, checks },null,2));
  console.log(`PASS: copyright written to ${checks.length} files; every decoded pixel preserved.`);
} finally { await exiftool.end(); }
