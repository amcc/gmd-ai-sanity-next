import type { Metadata } from "next";

import { STUDIOS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { StudiosPage } from "@/components/pageLayout/StudiosPage";

export default async function Studio() {
  const studios = await sanityFetch({
    query: STUDIOS_QUERY,
    revalidate: 604800, // 7 days fallback
    tags: ["studio"], // Cache tag for on-demand revalidation
  });

  // JSON-LD schema for artwork
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Alistair McClymont Studio",
    image: studios[0]?.mainImage?.asset?.url
      ? [studios[0].mainImage.asset.url]
      : [],
    description:
      "A blog and archive of Alistair McClymont's studio practice, works in progress, sketches and experiments.",
    creator: {
      "@type": "Person",
      name: "Alistair McClymont",
    },
    dateCreated: new Date().toISOString(),
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/studio`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="padded-page">
        <h1 className="page-title">studio</h1>
        {/* <p>
            Alistair McClymont's artwork ranges from installation to drawing,
            digital and motion. The material and method driven by the conceptual
            framework.
          </p> */}
      </section>

      <StudiosPage studios={studios} />
    </>
  );
}

export const metadata: Metadata = {
  title: "Alistair McClymont - Studio",
  description:
    "A blog and archive of Alistair McClymont's studio practice, works in progress, sketches and experiments.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/studio`,
  },
};
