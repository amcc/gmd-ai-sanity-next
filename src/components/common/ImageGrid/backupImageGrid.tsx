"use client";

import React from "react";
import Link from "next/link";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SanityImage } from "@/components/common/SanityImage";
import { useDesktopSize, useTabletSize } from "@/hooks/mixins";
import styles from "./ImageGrid.module.css";

interface ImageGridProps {
  artworks: any[];
}

const ImageGrid = ({ artworks }: ImageGridProps) => {
  // const sizes = `(max-width: ${useTabletSize()}) calc(50vw - 16px - calc(20px * 2)), (max-width: ${useDesktopSize()}) calc(33vw - calc(16px * 2) - calc(20px * 2)), calc(25vw - calc(16px * 3) - calc(20px * 2))`;
  const tabletSize = `(max-width: ${useTabletSize()}) calc(50vw - 16px - calc(20px * 2))`;
  const desktopSize = `(max-width: ${useDesktopSize()}) calc(33vw - calc(16px * 2) - calc(20px * 2))`;
  const largeSize = `calc(25vw - calc(16px * 3) - calc(20px * 2))`;
  const sizes = `${tabletSize}, ${desktopSize}, ${largeSize}`;

  return (
    // <div className={styles.grid}>
    <div className={styles.flex}>
      {" "}
      {artworks.map((artwork) => {
        if (!artwork || !artwork.slug || !artwork.mainImage?.asset) {
          return null;
        }
        return (
          // <div key={artwork.mainImage.asset._id} className={styles.gridItem}>
          <div
            key={artwork.mainImage.asset._id}
            className={styles.flexItem}
            style={{
              aspectRatio:
                artwork.mainImage.asset.metadata?.dimensions?.aspectRatio,
            }}
          >
            <Link href={`/artwork/${artwork.slug.current}`}>
              <SanityImage
                image={artwork.mainImage}
                sizes={sizes}
                fill={false}
              />
            </Link>
          </div>
        );
      })}{" "}
    </div>
  );
};

export { ImageGrid };
