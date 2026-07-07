import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceDir = join(root, 'charts-graphs');
const targetDir = join(root, 'public', 'charts-graphs');

if (!existsSync(sourceDir)) {
  console.error('sync-charts-graphs: missing charts-graphs/ folder');
  process.exit(1);
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });

let count = 0;
for (const name of readdirSync(sourceDir)) {
  if (!/\.(png|jpe?g|svg|webp|gif)$/i.test(name)) continue;
  cpSync(join(sourceDir, name), join(targetDir, name));
  count += 1;
}

console.log(`sync-charts-graphs: copied ${count} images to public/charts-graphs/`);
