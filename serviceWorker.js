const cacheName = "alfonso-pisicchio-site-v2"
const initialCache = [
  "/",
  "/index.html",
  "/css/dark.css",
  "/css/light.css",
  "/css/style.css",
  "/script.js",
  "/serviceWorker.js",
  "/libs/image/android-icon-36x36.png",
  "/libs/image/android-icon-48x48.png",
  "/libs/image/android-icon-72x72.png",
  "/libs/image/android-icon-96x96.png",
  "/libs/image/android-icon-144x144.png",
  "/libs/image/android-icon-192x192.png",
  "/libs/image/icon-512x512.png",
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
self.addEventListener("install", function(e) {
  console.log("Alloy service worker installation");
  e.waitUntil(
      caches.open(cacheName).then(function(cache) {
          console.log("Alloy service worker caching dependencies");
          initialCache.map(function(url) {
              return cache.add(url).catch(function(reason) {
                  return console.log(
                      "Alloy: " + String(reason) + " " + url
                  );
              });
          });
      })
  );
});

// Activating content using Service Worker
self.addEventListener("activate", function(e) {
  console.log("Alloy service worker activation");
  e.waitUntil(
      caches.keys().then(function(keyList) {
          return Promise.all(
              keyList.map(function(key) {
                  if (key !== cacheName) {
                      console.log("Alloy old cache removed", key);
                      return caches.delete(key);
                  }
              })
          );
      })
  );
  return self.clients.claim();
});

// Fetching content using Service Worker
self.addEventListener("fetch", function(e) {
  if (new URL(e.request.url).origin !== location.origin) return;

  if (e.request.mode === "navigate" && navigator.onLine) {
      e.respondWith(
          fetch(e.request).then(function(response) {
              return caches.open(cacheName).then(function(cache) {
                  cache.put(e.request, response.clone());
                  return response;
              });
          })
      );
      return;
  }

  e.respondWith(
      caches
          .match(e.request)
          .then(function(response) {
              return (
                  response ||
                  fetch(e.request).then(function(response) {
                      return caches.open(cacheName).then(function(cache) {
                          cache.put(e.request, response.clone());
                          return response;
                      });
                  })
              );
          })
          .catch(function() {
              return caches.match(offlinePage);
          })
  );
});
