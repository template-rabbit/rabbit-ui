import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const componentsDir = path.resolve(dirname, '../src/components');
const distDir = path.resolve(dirname, '../dist');

// Funksjon for å hente filer rekursivt
function getFilesRecursively(dir, baseDir = '') {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      // Gå inn i undermappen
      files = files.concat(getFilesRecursively(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.astro')) {
      // Legg til filen hvis det er en .astro-fil
      files.push(relativePath);
    }
  }

  return files;
}

// Hent alle .astro-filer med relative stier
const files = getFilesRecursively(componentsDir);

// Generer eksportlinjer
const exports = files
  .map((file) => {
    const componentName = path.basename(file, '.astro');
    const relativePath = `./${file}`;
    return `export { default as ${componentName} } from '${relativePath}';`;
  })
  .join('\n');

// Sørg for at dist-mappen eksisterer
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Skriv til index.mjs
fs.writeFileSync(path.join(distDir, 'index.mjs'), exports, 'utf8');

console.log('✔ index.mjs generated');
