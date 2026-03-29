const CACHE_NAME = 'alfonso-pisicchio-cache-v3';
const FILES_TO_CACHE = [
  './index.html',
  './libs/css/style.css',
  './libs/js/translations.js',
  './libs/js/lang.js',
  './libs/js/menu.js',
  './libs/js/theme-toggle.js',
  './libs/js/projects.js',
  './AlfonsoPisicchio.pdf',
  './libs/image/AP-dev1.webp',
  './libs/image/dynamicVH.webp',
  './libs/image/node-api.webp',
  './libs/image/dev-kit.gif',
];

const CDN_CACHE_NAME = 'cdn-cache-v1';
const CDN_ORIGINS = [
  'https://cdn.jsdelivr.net',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME && k !== CDN_CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // CDN resources: network-first, fallback to cache
  if (CDN_ORIGINS.some(origin => url.startsWith(origin))) {
    event.respondWith(
      fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CDN_CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Same-origin: cache-first
  if (url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});
