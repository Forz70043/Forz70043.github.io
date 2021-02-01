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


self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(alfSite).then(cache => {
        cache.addAll(assets)
      })
    )
});
  
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})