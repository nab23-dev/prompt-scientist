const CACHE_NAME = "prompt-sci-v1";
const urlsToCache = [
  "/prompt-scientist/feed.html",
  "/prompt-scientist/style.css",
  "/prompt-scientist/app.js",
  "/prompt-scientist/prompticon.png"
];

// ইনস্টল হওয়ার সময় ক্যাশ করো
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// অফলাইনে ক্যাশ থেকে লোড করো
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});