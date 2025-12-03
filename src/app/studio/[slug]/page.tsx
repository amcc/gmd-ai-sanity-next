import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { STUDIO_QUERY } from "@/sanity/lib/queries";
import { StudioPage } from "@/components/pageLayout/StudioPage";
import { STUDIOS_QUERYResult } from "@/sanity/types";
import { getMetaDescription } from "@/utils/common";

export default async function Studio({ params }: { params: { slug: string } }) {
  const studio = await sanityFetch({
    query: STUDIO_QUERY,
    params,
    revalidate: 604800, // 7 days fallback
    tags: ["artwork"], // Cache tag for on-demand revalidation
  });

  // const fallback = artwork?.fallback?.asset?.url;
  // const target = artwork?.target?.asset?.url;
  // const video = artwork?.video?.asset?.url;
  // const width = artwork?.fallback?.asset?.metadata?.dimensions?.width ?? 1;
  // const height = artwork?.fallback?.asset?.metadata?.dimensions?.height ?? 1;

  if (!studio) {
    return null;
  }

  // JSON-LD schema for artwork
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: studio?.title,
    image: studio?.mainImage?.asset?.url ? [studio.mainImage.asset.url] : [],
    description: getMetaDescription(studio?.description ?? []),
    creator: {
      "@type": "Person",
      name: "Alistair McClymont",
    },
    dateCreated: studio?.publishedAt,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/studio/${studio?.slug?.current}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StudioPage studio={studio} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: STUDIOS_QUERYResult;
}): Promise<Metadata> {
  const studio = await sanityFetch({
    params,
    query: STUDIO_QUERY,
    revalidate: 604800,
    tags: ["artwork"],
  });

  // Use getMetaDescription utility for robust meta description extraction
  const metaDescription = getMetaDescription(studio?.description ?? []);

  return {
    title: studio?.title || "Alistair McClymont",
    description: metaDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/studio/${studio?.slug?.current}`,
    },
  };
}
