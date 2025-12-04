/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Slug, SanityImageMetadata } from "@/sanity/types";
import styles from "./ImageGrid.module.css";
import { SearchFilters } from "@/components/common/SearchFilters";
import { PriorityArtworkCarousel } from "@/components/common/PriorityArtworkCarousel";
import { ArtworkFigure } from "./ArtworkFigure";
import { ORDER_OPTIONS, DEFAULT_ORDER } from "./orderOptions";

type RelatedArtwork = {
  _id: string;
  title: string | null;
  shortTitle?: string | null;
  slug: Slug | null;
  artworkDate?: string | null;
  mainImage: {
    asset: {
      _id: string;
      _ref: null;
      url: string | null;
      metadata: SanityImageMetadata | null;
    } | null;
  } | null;
};

type RelatedBiography = {
  _id: string;
  title: string | null;
  shortTitle?: string | null;
  slug: Slug | null;
  startDate?: string | null;
  endDate?: string | null;
  type?: string | null;
  mainImage: {
    asset: {
      _id: string;
      _ref: null;
      url: string | null;
      metadata: SanityImageMetadata | null;
    } | null;
  } | null;
};
// ...existing code...

interface TextChild {
  text?: string;
  _type: string;
}

interface DescriptionBlock {
  _type: string;
  children?: TextChild[];
}

// Union type for all possible items
type GridItem = any;

interface ImageGridProps {
  artworks?: any[];
  biographies?: any[];
  studios?: any[];
  relatedArtworks?: RelatedArtwork[];
  relatedBiography?: RelatedBiography[];
  itemType?: "artwork" | "biography" | "studio";
  recent?: boolean;
  related?: boolean;
}

const ImageGrid = ({
  artworks,
  biographies,
  studios,
  relatedArtworks,
  relatedBiography,
  itemType = "artwork",
  recent = false,
  related = false,
}: ImageGridProps) => {
  // Grid layout sizes: Mobile: 2 cols, Tablet: 2 cols, Desktop: 3 cols, Widescreen: 4 cols
  // Includes gaps and side-padding in calculations
  const gridSizes = `
    (max-width: 35em) calc((100vw - 32px - 16px) / 2),
    (max-width: 48em) calc((100vw - 128px - 16px) / 2),
    (max-width: 60em) calc((100vw - 256px - 32px) / 3),
    calc((100vw - 256px - 48px) / 4)
  `
    .replace(/\s+/g, " ")
    .trim();

  // Carousel sizes: Full width with side-padding, accounting for horizontal scroll
  // These should be larger since carousel items take more space
  const carouselSizes = `
    (max-width: 35em) calc(100vw - 32px),
    (max-width: 48em) calc(100vw - 128px),
    calc(100vw - 256px)
  `
    .replace(/\s+/g, " ")
    .trim();

  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // State for selected order filter
  const [selectedOrder, setSelectedOrder] = useState<string | null>(
    DEFAULT_ORDER
  );
  // State for search term
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State for toggle search and filter visibility
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    setSearchTerm("");
    setShowFilters(false);
    setSelectedCategory(null);
  }, []);

  // Get the items based on type with proper typing
  const items = useMemo(() => {
    if (relatedArtworks && relatedArtworks.length > 0) return relatedArtworks;
    if (relatedBiography && relatedBiography.length > 0)
      return relatedBiography;
    if (itemType === "artwork" && artworks) return artworks;
    if (itemType === "biography" && biographies) return biographies;
    if (itemType === "studio" && studios) return studios;
    return artworks || biographies || studios || [];
  }, [
    artworks,
    biographies,
    studios,
    relatedArtworks,
    relatedBiography,
    itemType,
  ]);

  // Get all unique categories from items
  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    items.forEach((item) => {
      if ("categories" in item) {
        item.categories?.forEach(
          (cat: { _id: string; title: string | null }) => {
            if (cat.title) {
              categorySet.add(cat.title);
            }
          }
        );
      }
    });
    return Array.from(categorySet).sort();
  }, [items]);

  // Filter items based on selected category and search term
  const filteredItems = useMemo(() => {
    let filtered = items as GridItem[];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((item) => {
        if ("categories" in item) {
          return item.categories?.some(
            (cat: { _id: string; title: string | null }) =>
              cat.title === selectedCategory
          );
        }
        return true;
      });
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) => {
        const titleMatch = item.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase().trim());

        let descriptionMatch = false;
        if (
          "description" in item &&
          Array.isArray(
            (item as { description?: DescriptionBlock[] }).description
          )
        ) {
          descriptionMatch = (
            item as { description: DescriptionBlock[] }
          ).description.some(
            (block) =>
              block._type === "block" &&
              block.children?.some((child) =>
                child.text
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase().trim())
              )
          );
        }
        return titleMatch || descriptionMatch;
      });
    }

    return filtered;
  }, [items, selectedCategory, searchTerm]);

  // Apply sorting to filtered items
  const sortedItems = useMemo(() => {
    if (itemType !== "artwork") {
      // For non-artwork types, just return filtered items
      return filteredItems;
    }

    const selectedOrderOption = ORDER_OPTIONS.find(
      (option) => option.key === selectedOrder
    );

    if (selectedOrderOption?.sortFn) {
      return selectedOrderOption.sortFn(filteredItems as any[]);
    }

    // Default sorting (priority) for artworks
    return [...filteredItems].sort((a, b) => {
      if ("priority" in a && "priority" in b) {
        return (b.priority ? 1 : 0) - (a.priority ? 1 : 0);
      }
      return 0;
    });
  }, [filteredItems, selectedOrder, itemType]);

  // show only 12 items if recent is true
  const displayedItems = recent ? sortedItems.slice(0, 12) : sortedItems;

  const priorityItems = useMemo(() => {
    return items.filter(
      (item: any): item is any =>
        "priority" in item && !!item.priority && itemType === "artwork"
    );
  }, [items, itemType]);

  return (
    <div className={styles.imageGrid}>
      {/* Search and Filters */}

      {/* Priority Artworks Carousel - only for artworks */}
      {!recent &&
        !related &&
        itemType === "artwork" &&
        priorityItems.length > 0 && (
          <PriorityArtworkCarousel
            artworks={priorityItems.filter(
              (item: any) => item && item.slug && item.mainImage?.asset
            )}
            sizes={carouselSizes}
            recent={recent}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setShowFilters={setShowFilters}
          />
        )}
      {/* Artworks Grid */}
      {!recent && !related && (
        <div className="padded-page">
          <SearchFilters
            showFilters={showFilters}
            itemType={itemType}
            setShowFilters={setShowFilters}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            allCategories={allCategories}
          />
        </div>
      )}
      <div className={`${!recent && !related && "padded-page"}`}>
        <div className={styles.grid}>
          {displayedItems.map((item: GridItem) => {
            if (!item || !item.slug) {
              return null;
            }

            const href =
              itemType === "artwork"
                ? `/artwork/${item.slug.current}`
                : itemType === "biography"
                  ? `/biography/${item.slug.current}`
                  : `/studio/${item.slug.current}`;

            return (
              <div key={item._id} className={styles.gridItem}>
                <Link
                  href={href}
                  aria-label={`View ${itemType}: ${item.title}`}
                  className={styles.link}
                >
                  <ArtworkFigure
                    artwork={item as any}
                    sizes={gridSizes}
                    recent={recent}
                    showFilters={showFilters}
                    showDate={true}
                    showCategories={false}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setShowFilters={setShowFilters}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ImageGrid };
export type { RelatedArtwork, RelatedBiography };
