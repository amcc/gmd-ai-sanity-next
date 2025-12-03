import type { Metadata, Viewport } from "next";
import { ConditionalLayout } from "@/components/pageLayout/ConditionalLayout";
import PlausibleProvider from "next-plausible";
import FontLoader from "@/components/FontLoader";
import UnregisterServiceWorker from "@/components/common/UnregisterServiceWorker";

// import localFont from "next/font/local";
import "@/styles/reset.css";
import "@/styles/globals.css";
import "@/styles/type.css";
import "@/styles/colour.css";
import "@/styles/spacing.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  // do we use the below attribtes - they get a lower accessibility score
  // maximumScale: 1,
  // userScalable: false,

  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "AI - Show Your Visual Creativity",
  description:
    "Visual creativity means that you design, draw, iterate and test using visual means. You must remain in creative control of your project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ...existing code...

  return (
    <html
      lang="en"
      // className={`${ibm_plex_sans} ${ibm_plex_mono} ${noto_sans} ${source_serif}`}
    >
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FontLoader />
        <ConditionalLayout>{children}</ConditionalLayout>
        {/* Unregister service worker to prevent caching issues */}
        <UnregisterServiceWorker />
      </body>
    </html>
  );
}
