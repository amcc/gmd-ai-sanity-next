"use client";

import { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    // Add font-loading class to prevent FOIT (Flash of Invisible Text)
    document.documentElement.classList.add("fonts-loading");

    // Use Font Loading API for optimal control
    if ("fonts" in document) {
      // Set up fallback timer (3 seconds max)
      const fontTimeout = setTimeout(() => {
        document.documentElement.classList.remove("fonts-loading");
        document.documentElement.classList.add("fonts-failed");
      }, 3000);

      // Monitor font loading
      document.fonts.ready.then(() => {
        clearTimeout(fontTimeout);
        document.documentElement.classList.remove("fonts-loading");
        document.documentElement.classList.add("fonts-loaded");
      });
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => {
        document.documentElement.classList.remove("fonts-loading");
        document.documentElement.classList.add("fonts-loaded");
      }, 3000);
    }
  }, []);

  return null; // This component doesn't render anything
}
