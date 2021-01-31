const staticDevCoffee = "alfonso-pisicchio-site-v2"
const assets = [
  "/",
  "/index.html",
  "/css/dark.css",
  "/css/light.css",
  "/css/style.css",
  "/script.js",
  "/libs/image/AP-dev1.png",
  "/libs/image/moon.png",
  "libs/image/sun.png"
]


self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticDevCoffee).then(cache => {
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