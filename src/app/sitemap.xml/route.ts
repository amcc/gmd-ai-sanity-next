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
  // Static routes - only homepage for AI site
  const staticPaths = ["/"];

  const allUrls = staticPaths.map(buildUrl);
  const xml = buildXml(allUrls);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
