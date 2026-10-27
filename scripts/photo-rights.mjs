import { photoCopyright } from '../src/data/photos.ts';

export const writePhotoCopyright = (tool, file) => tool.write(file, {
  'EXIF:Copyright': photoCopyright,
  'XMP-dc:Rights': photoCopyright,
  'XMP-dc:Rights-pt-BR': photoCopyright,
}, { writeArgs: ['-overwrite_original'] });
