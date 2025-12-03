"use client";

import { useEffect } from "react";

export default function UnregisterServiceWorker() {
  //   useEffect(() => {
  //     if ("serviceWorker" in navigator) {
  //       navigator.serviceWorker.getRegistrations().then((regs) => {
  //         if (regs.length === 0) return; // no SWs, nothing to do

  //         regs.forEach(async (reg) => {
  //           await reg.unregister(); // remove each SW
  //         });

  //         // Reload the page once after unregistering
  //         window.location.reload();
  //       });
  //     }
  //   }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (sessionStorage.getItem("sw-unregistered")) return;

      navigator.serviceWorker.getRegistrations().then((regs) => {
        if (regs.length === 0) return;

        regs.forEach(async (reg) => {
          await reg.unregister();
        });

        sessionStorage.setItem("sw-unregistered", "true");

        // Optional: register self-destructing SW to clean up further
        navigator.serviceWorker.register("/sw.js?v=killgatsby");

        window.location.reload();
      });
    }
  }, []);

  return null;
}
