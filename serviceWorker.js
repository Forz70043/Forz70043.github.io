const alfSite = "alfonso-pisicchio-site-v2"
const assets = [
  "/",
  "/index.html",
  "/css/dark.css",
  "/css/light.css",
  "/css/style.css",
  "/script.js",
  "/serviceWorker.js",
  "/libs/image/AP-dev1.png",
  "/libs/image/ap-dev1_144x144-png",
  "/libs/image/moon.png",
  "/libs/image/sun.png",
  "/libs/bootstrap/bootstrap.min.css",
  "/libs/bootstrap/bootstrap.min.js",
  "/libs/fontawesome/all.min.css",
  "/libs/fontawesome/all.min.js",
  "/document.pdf",
  "/favicon.ico",

]


// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(alfSite);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(assets);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(alfSite);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});







/*
self.addEventListener('install',(e)=>{
  console.log("SW install");
  e.waitUntil(
    caches.open(alfSite).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(assets);
    })
  );
});


self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(alfSite).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
*/
/*
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(alfSite).then(cache => {
        cache.addAll(assets)
      })
    )
});
*/

/*
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})
*/