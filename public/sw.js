// sw.js — self-destructing service worker
// unregister service worker 12 September 2025
self.addEventListener("install", (event) => {
  self.skipWaiting(); // activate immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // unregister this service worker
      await self.registration.unregister();

      // tell all clients to reload without SW
      const clients = await self.clients.matchAll();
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});

// do nothing for fetches
self.addEventListener("fetch", () => {});
