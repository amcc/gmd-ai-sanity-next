import { sanityFetch } from "@/sanity/lib/client";
import {
  ARTWORKS_QUERY,
  BIOGRAPHIES_QUERY,
  STUDIOS_QUERY,
} from "@/sanity/lib/queries";
import type {
  ARTWORKS_QUERYResult,
  BIOGRAPHIES_QUERYResult,
  STUDIOS_QUERYResult,
} from "@/sanity/types";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function buildUrl(path: string) {
  return `${BASE_URL}${path}`;
}

function buildXml(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join("\n")}
</urlset>`;
}

export const dynamic = "force-dynamic";

export async function GET() {
  // Fetch slugs from Sanity for artwork, biography, studio, etc.
  // Use full queries and map to slugs
  const artworks: ARTWORKS_QUERYResult = await sanityFetch({
    query: ARTWORKS_QUERY,
    tags: ["artwork"],
    revalidate: 3600,
  });
  const biographies: BIOGRAPHIES_QUERYResult = await sanityFetch({
    query: BIOGRAPHIES_QUERY,
    tags: ["biography"],
    revalidate: 3600,
  });
  const studios: STUDIOS_QUERYResult = await sanityFetch({
    query: STUDIOS_QUERY,
    tags: ["studio"],
    revalidate: 3600,
  });

  // Static routes
  const staticPaths = ["/", "/artwork", "/biography", "/contact", "/studio"];

  // Dynamic routes
  const dynamicPaths = [
    ...artworks
      .filter((item) => item.slug?.current)
      .map((item) => `/artwork/${item.slug!.current}`),
    ...biographies
      .filter((item) => item.slug?.current)
      .map((item) => `/biography/${item.slug!.current}`),
    ...studios
      .filter((item) => item.slug?.current)
      .map((item) => `/studio/${item.slug!.current}`),
  ];

  // Remove duplicate staticPaths and dynamicPaths
  const allUrls = [...staticPaths, ...dynamicPaths].map(buildUrl);
  const xml = buildXml(allUrls);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
