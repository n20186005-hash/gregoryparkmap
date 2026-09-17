import { access, rename, rm } from 'node:fs/promises';

const config = new URL('../wrangler.toml', import.meta.url);
const hidden = new URL('../.wrangler.toml.build-disabled', import.meta.url);
const deployRedirect = new URL('../.wrangler/deploy/config.json', import.meta.url);
await rm(deployRedirect, { force: true });
try {
  await access(config);
  await rename(config, hidden);
} catch {
  // The config is already hidden during this check/build cycle.
}
