import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Canonical origin for the single-attraction site (override with PUBLIC_SITE_URL).
const site = process.env.PUBLIC_SITE_URL || 'https://gregoryparkmap.com';

export default defineConfig({
  site,
  output: 'server',
  adapter: cloudflare(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
