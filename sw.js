const CACHE = "honeymoon-2026-v4";
const CACHE_PREFIX = "honeymoon-2026-"; // 이 앱이 만든 캐시만 정리한다(같은 도메인의 다른 앱 캐시는 건드리지 않음)
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./config.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for the app shell so deployed updates are picked up on the
// very next load (falls back to cache only when offline). This avoids the
// classic PWA bug where a cache-first strategy serves stale files forever.
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Never intercept API calls or Google Maps — always go straight to network.
  if (url.hostname.includes("workers.dev") || url.hostname.includes("googleapis.com") || url.hostname.includes("gstatic.com")) {
    return;
  }

  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then(res => {
        const resClone = res.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, resClone));
        return res;
      })
      .catch(() => caches.open(CACHE).then(c => c.match(event.request)))
  );
});
