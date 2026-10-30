/// <reference lib="webworker" />
const worker = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));
worker.addEventListener('install',()=>worker.skipWaiting());
worker.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('gregory-'))await caches.delete(key);await worker.registration.unregister();await worker.clients.claim();})()));
