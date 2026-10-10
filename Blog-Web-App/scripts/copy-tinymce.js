import fs from 'fs';
import path from 'path';

const src = path.resolve('node_modules', 'tinymce');
const dest = path.resolve('public', 'tinymce');

if (fs.existsSync(src)) {
  fs.cpSync(src, dest, { recursive: true });
  console.log('TinyMCE assets successfully copied to public/tinymce');
}
