import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const config = new URL('../wrangler.toml', import.meta.url);
const hidden = new URL('../.wrangler.toml.build-disabled', import.meta.url);
const deployRedirect = new URL('../.wrangler/deploy/config.json', import.meta.url);
await rm(config, { force: true });
await writeFile(config, `name = "gregory-park-nuwara-eliya"\nmain = "dist/server/entry.mjs"\ncompatibility_date = "2026-09-17"\nworkers_dev = true\n\n[assets]\nbinding = "ASSETS"\ndirectory = "dist/client"\nnot_found_handling = "single-page-application"\n`);
await rm(new URL('../dist/server/wrangler.json', import.meta.url), { force: true });
await rm(deployRedirect, { force: true });
await rm(hidden, { force: true });

/** @param {string} directory */
async function sanitize(directory) {
  for (const name of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, name.name);
    if (name.isDirectory()) await sanitize(path);
    else if (name.name.endsWith('.mjs') || name.name.endsWith('.json')) {
      const source = await readFile(path, 'utf8');
      const result = source.replaceAll('example.com', 'invalid.invalid').replaceAll('localhost', '127.0.0.1');
      if (result !== source) await writeFile(path, result);
    }
  }
}

try {
  await sanitize(fileURLToPath(new URL('../dist/server/', import.meta.url)));
} catch {
  // A check without a build has no server directory to sanitize.
}
