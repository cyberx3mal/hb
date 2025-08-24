// Очень простой сервис‑воркер: кеширует статические файлы при установке.
// Для production лучше использовать Workbox.
const CACHE = "quest-cache-v1";
const urlsToCache = ["/", "/index.html", "/src/styles.css"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});