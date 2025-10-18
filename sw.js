const CACHE_NAME = 'alfonso-pisicchio-cache-v1';
const FILES_TO_CACHE = [
  './index.html',
  './libs/css/style.css',
  './libs/js/translations.js',
  './libs/js/lang.js',
  './libs/js/menu.js',
  './libs/js/theme-toggle.js',
  './AlfonsoPisicchio.pdf',
  './libs/image/AP-dev1.webp',
  './libs/image/dynamicVH.webp',
  './libs/image/node-api.webp',
  './libs/image/dev-kit.gif',
];

self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
