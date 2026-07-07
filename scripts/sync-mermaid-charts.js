import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const sourceDir = join(root, 'mermaid-charts');
const targetDir = join(root, 'public', 'mermaid-charts');

if (!existsSync(sourceDir)) {
  console.error('sync-mermaid-charts: missing mermaid-charts/ folder');
  process.exit(1);
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });

for (const name of readdirSync(sourceDir)) {
  if (!/\.(png|jpe?g|svg|webp|gif)$/i.test(name)) continue;
  cpSync(join(sourceDir, name), join(targetDir, name));
}

console.log(`sync-mermaid-charts: copied charts to public/mermaid-charts/`);
