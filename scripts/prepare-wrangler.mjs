import { access, rename } from 'node:fs/promises';

const config = new URL('../wrangler.toml', import.meta.url);
const hidden = new URL('../.wrangler.toml.build-disabled', import.meta.url);
try {
  await access(config);
  await rename(config, hidden);
} catch {
  // The config is already hidden during this check/build cycle.
}
