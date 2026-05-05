// sw.js v8 — Ora compatibile con i requisiti PWA
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});

// IL PEZZO MANCANTE: Gestore fetch (anche se non esegue cache, deve esistere)
self.addEventListener('fetch', event => {
  // Risponde semplicemente con la richiesta di rete standard
  event.respondWith(fetch(event.request));
});
