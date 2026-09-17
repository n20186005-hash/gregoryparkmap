/* Gregory Park Map — service worker (app shell + runtime caching) */
const VERSION = 'gregory-park-v1';
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const OFFLINE_URL = '/offline.html';

const SHELL_ASSETS = [
  '/',
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.svg',
  '/logo.svg',
  '/icons/icon-32.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/images/gregory-lake-park.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await Promise.all(
        SHELL_ASSETS.map((asset) =>
          cache.add(new Request(asset, { cache: 'reload' })).catch(() => undefined),
        ),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

const isSameOriginGet = (request) => {
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  return url.origin === self.location.origin;
};

const cacheFirstWithRefresh = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);

  if (cached) return cached;
  const response = await network;
  return response || Response.error();
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (!isSameOriginGet(request)) return;

  const url = new URL(request.url);

  // Navigations: network first, cached shell second, offline page last.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          if (response && response.ok) {
            const cache = await caches.open(SHELL_CACHE);
            await cache.put('/', response.clone());
          }
          return response;
        } catch {
          const shell = await caches.match('/');
          if (shell) return shell;
          const offline = await caches.match(OFFLINE_URL);
          return offline || Response.error();
        }
      })(),
    );
    return;
  }

  // Static assets (build output, photos, icons, fonts): cache first with refresh.
  if (
    /^\/(_astro|images|icons)\//.test(url.pathname) ||
    /\.(css|js|mjs|webp|png|jpg|jpeg|svg|ico|woff2?|webmanifest|json)$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirstWithRefresh(request));
  }
});
