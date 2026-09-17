import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.PUBLIC_SITE_URL || undefined;
const integrations = site ? [sitemap()] : [];

export default defineConfig({
  site,
  output: 'server',
  adapter: cloudflare(),
  integrations,
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
