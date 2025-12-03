"use client";

// https://www.sanity.io/schemas/the-best-next-js-and-sanity-less-than-image-greater-than-component-afe973cc
import classNames from "classnames";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { SanityImageMetadata } from "@/sanity/types";
// import { useState, useEffect } from "react";

import styles from "./SanityImage.module.css";

type Props = {
  image: {
    asset: {
      _id: string;
      _ref: null;
      url: string | null;
      metadata: SanityImageMetadata | null;
    } | null;
  };
  alt?: string;
  sizes?: string;
  aspectRatio?: number;
  quality?: number;
  maxWidth?: number; // Make maxWidth optional
  fill?: boolean;
  className?: string;
  constrainHeight?: boolean; // New: Enable height constraint mode
  maxHeight?: string; // New: Maximum height (e.g., "80vh", "500px")
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"; // New: Control object-fit behavior
  // [key: string]: any; // Allow additional properties
};

const SanityImage = ({
  image,
  alt = "Alistair McClymont",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  aspectRatio,
  quality = 85, // Reduced from 98 - still high quality but much smaller files
  maxWidth = 1200, // Reduced from 1920 - adequate for most use cases
  fill = true,
  className,
  constrainHeight = false, // New prop with default
  maxHeight = "none", // New prop with default
  objectFit = "cover", // New prop with default
  ...args
}: Props) => {
  // Always use dpr 2
  // Calculate optimal max width based on sizes hint and DPR
  const calculateOptimalWidth = () => {
    // Parse the largest size from the sizes string to set a reasonable maxWidth
    const sizeMatches = sizes.match(/(\d+)(?:vw|px)/g);
    if (sizeMatches) {
      const largestSize = Math.max(
        ...sizeMatches.map((s) => {
          if (s.includes("vw")) {
            const vw = parseInt(s);
            // Use a stable default width for SSR/CSR
            const viewportWidth = 1920;
            return (vw / 100) * viewportWidth;
          }
          return parseInt(s);
        })
      );
      return Math.min(largestSize * 2, maxWidth);
    }
    return maxWidth;
  };

  const imageQuality = quality;
  const imageDpr = 2;
  const optimalWidth = calculateOptimalWidth();

  const imageUrl = urlFor(image)
    .width(optimalWidth)
    .dpr(imageDpr)
    .quality(imageQuality)
    .url();
  const width = image?.asset?.metadata?.dimensions?.width;
  const height = image?.asset?.metadata?.dimensions?.height;

  // Handle cases where dimensions are not available
  const hasValidDimensions = width && height && width > 0 && height > 0;

  // If we don't have valid dimensions, we need to use fill mode
  // When constrainHeight is true, prefer not to use fill mode to allow natural sizing
  const shouldUseFill = constrainHeight ? false : fill || !hasValidDimensions;

  // Only use blur placeholder if we have a valid lqip
  const hasBlurDataURL = Boolean(image?.asset?.metadata?.lqip);
  const placeholderProps = hasBlurDataURL
    ? {
        blurDataURL: image?.asset?.metadata?.lqip || "",
        placeholder: "blur" as const,
      }
    : {};

  return (
    <div
      className={classNames(className, styles.imageWrapper, {
        [styles.threeFour]: aspectRatio === 3 / 4,
        [styles.sixteenNine]: aspectRatio === 16 / 9,
        [styles.fillMode]: shouldUseFill,
        [styles.constrainHeight]: constrainHeight, // New CSS class for height-constrained mode
      })}
      style={
        shouldUseFill
          ? {
              position: "relative",
              aspectRatio: constrainHeight
                ? "unset" // Don't force aspect ratio when constraining height
                : aspectRatio ||
                  (hasValidDimensions ? `${width}/${height}` : "auto"),
              minHeight:
                !aspectRatio && !hasValidDimensions ? "300px" : undefined,
              maxHeight: constrainHeight ? maxHeight : undefined,
              width: constrainHeight ? "auto" : undefined,
            }
          : constrainHeight
            ? {
                maxHeight: maxHeight,
                width: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }
            : {}
      }
    >
      <div className={classNames(styles.imageInner)}>
        {hasValidDimensions && !shouldUseFill ? (
          <Image
            src={imageUrl}
            width={width}
            height={height}
            quality={quality}
            style={{
              objectFit: objectFit,
              maxHeight: constrainHeight ? maxHeight : undefined,
              width: constrainHeight ? "auto" : undefined,
              height: constrainHeight ? "auto" : undefined,
            }}
            alt={alt}
            sizes={sizes}
            {...placeholderProps}
            {...args}
          />
        ) : (
          <Image
            src={imageUrl}
            fill
            quality={quality}
            style={{ objectFit: objectFit }}
            alt={alt}
            sizes={sizes}
            {...placeholderProps}
            {...args}
          />
        )}
      </div>
    </div>
  );
};

export { SanityImage };
