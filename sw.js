const CACHE_NAME = "finanze-shell-v27";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./styles.css",
  "./app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstHtml(request));
    return;
  }

  if (!sameOrigin) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(networkFirstAsset(request));
});

async function networkFirstHtml(request) {
  try {
    const response = await fetch(request);
    const injected = await injectPwaFixes(response);
    const cache = await caches.open(CACHE_NAME);
    cache.put("./index.html", injected.clone());
    return injected;
  } catch (error) {
    const cached = await caches.match("./index.html");
    if (cached) return injectPwaFixes(cached);
    return caches.match("./");
  }
}

async function networkFirstAsset(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function injectPwaFixes(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html = await response.text();

  if (!html.includes('href="./styles.css"') && !html.includes('href="styles.css"')) {
    html = html.replace("</head>", '<link rel="stylesheet" href="./styles.css">\n</head>');
  }

  if (!html.includes('src="./app.js"') && !html.includes('src="app.js"')) {
    html = html.replace("</body>", '<script defer src="./app.js"></script>\n</body>');
  }

  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "no-cache");

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
