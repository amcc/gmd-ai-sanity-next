// // sw.js — self-destructing service worker
// // unregister service worker 12 September 2025
// self.addEventListener("install", (event) => {
//   self.skipWaiting(); // activate immediately
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     (async () => {
//       // unregister this service worker
//       await self.registration.unregister();

//       // tell all clients to reload without SW
//       const clients = await self.clients.matchAll();
//       clients.forEach((client) => client.navigate(client.url));
//     })()
//   );
// });

// // do nothing for fetches
// self.addEventListener("fetch", () => {});

// Log SW lifecycle events for debugging
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  self.skipWaiting(); // activate immediately
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    (async () => {
      // unregister this SW
      await self.registration.unregister();
      console.log("[SW] Unregistered old worker");

      // reload all clients
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        console.log("[SW] Reloading client:", client.url);
        client.navigate(client.url);
      });
    })()
  );
});

self.addEventListener("fetch", (event) => {
  // Optional: log fetch requests
  // console.log("[SW] Fetch intercepted:", event.request.url);
});
