// Простой сервис-воркер: кэширует статические файлы при установке.
// Для production рекомендуется Workbox.
const CACHE = "quest-cache-v1";
const urlsToCache = ["/", "/index.html", "/src/styles.css", "/manifest.json"]; // можно расширить

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE && caches.delete(k))))
  );
});

self.addEventListener("fetch", event => {
  const { request } = event;
  event.respondWith(
    caches.match(request).then(resp => resp || fetch(request))
  );
});
