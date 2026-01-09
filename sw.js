const CACHE_NAME = "money-planner-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./savings.html",
  "./planner.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// Offline-first for navigation + static assets
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // For page navigations, try network first, then fall back to cached index.html
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // For other assets, cache-first
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});


