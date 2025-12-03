"use client";

import { SanityImage } from "@/components/common/SanityImage";
import { MediaEmbed } from "@/components/common/MediaEmbed";
import {
  SanityImageMetadata,
  SanityImageHotspot,
  SanityImageCrop,
} from "@/sanity/types";
import styles from "./ArtworksSection.module.css";

type ArtworkItem =
  | {
      _key: string;
      _type: "imageItem";
      asset: {
        _id: string;
        _ref: null;
        url: string | null;
        metadata: SanityImageMetadata | null;
      } | null;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      caption?: string;
      alt?: string;
    }
  | {
      _key: string;
      _type: "videoItem";
      url?: string;
      caption?: string;
      asset: null;
    };

interface ArtworksSectionProps {
  artworks: ArtworkItem[];
}

const ArtworksSection = ({ artworks }: ArtworksSectionProps) => {
  if (!artworks || artworks.length === 0) return null;

  return (
    <section>
      <div className={styles.artworksGrid}>
        {artworks.map((item) => (
          <div key={item._key} className={styles.artworkItem}>
            {item._type === "videoItem" && item.url ? (
              <MediaEmbed mediaUrl={item.url} />
            ) : item._type === "imageItem" && item.asset ? (
              <SanityImage
                image={{
                  asset: item.asset,
                }}
                constrainHeight={true}
                maxHeight="97vh"
                objectFit="contain"
                alt={item.alt || ""}
                sizes="(max-width: 35em) calc(100vw - 32px), (max-width: 48em) calc(100vw - 128px), calc(100vw - 256px)"
                quality={90} // Good quality for secondary artwork images
                maxWidth={1200} // Reasonable max for single-column layout
              />
            ) : null}
            {item.caption && (
              <p className={styles.itemCaption}>{item.caption}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export { ArtworksSection };
