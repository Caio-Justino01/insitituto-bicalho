import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { media, photoWidths } from '../src/data/photos.ts';
import { exiftool } from 'exiftool-vendored';
import { writePhotoCopyright } from './photo-rights.mjs';

// Keep originals unchanged and describe only the visible content in published files.
const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
const xmp = photo => `<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title><rdf:Alt><rdf:li xml:lang="x-default">${escape(photo.title)}</rdf:li><rdf:li xml:lang="pt-BR">${escape(photo.title)}</rdf:li></rdf:Alt></dc:title><dc:description><rdf:Alt><rdf:li xml:lang="x-default">${escape(photo.alt)}</rdf:li><rdf:li xml:lang="pt-BR">${escape(photo.alt)}</rdf:li></rdf:Alt></dc:description><dc:subject><rdf:Bag><rdf:li>Instituto Bicalho</rdf:li><rdf:li>Odontologia</rdf:li></rdf:Bag></dc:subject><dc:language><rdf:Bag><rdf:li>pt-BR</rdf:li></rdf:Bag></dc:language></rdf:Description></rdf:RDF></x:xmpmeta>`;

const requested = new Set(process.argv.slice(2));
const missingOnly = requested.delete('--missing');
try {
for (const photo of Object.values(media).filter(photo => !requested.size || requested.has(photo.src))) {
  const input = `assets/originals/${photo.original}`;
  const original = await sharp(input).metadata();
  const originalWidth = original.orientation && original.orientation >= 5 ? original.height : original.width;
  for (const width of photoWidths(photo)) {
    if (width > originalWidth) throw new Error(`${photo.src}: ${width}px exceeds the original width ${originalWidth}px`);
    if (missingOnly && ['webp', 'avif'].every(extension => existsSync(`public/assets/${photo.src}-${width}.${extension}`))) continue;
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).withXmp(xmp(photo)).webp({ quality: 92, effort: 5 }).toFile(`public/assets/${photo.src}-${width}.webp`);
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).withXmp(xmp(photo)).avif({ quality: 72, effort: 5 }).toFile(`public/assets/${photo.src}-${width}.avif`);
    for (const extension of ['webp','avif']) await writePhotoCopyright(exiftool, `public/assets/${photo.src}-${width}.${extension}`);
  }
  console.log('Optimized official photograph with XMP:', photo.src);
}
} finally { await exiftool.end(); }
