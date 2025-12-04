/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { ArtworkFigure } from "../ImageGrid/ArtworkFigure";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import styles from "./PriorityArtworkCarousel.module.css";

interface PriorityArtworkCarouselProps {
  artworks: any[];
  sizes: string;
  recent?: boolean;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  setShowFilters: (show: boolean) => void;
}

const PriorityArtworkCarousel = ({
  artworks,
  sizes,
  recent = false,
  selectedCategory,
  setSelectedCategory,
  setShowFilters,
}: PriorityArtworkCarouselProps) => {
  const {
    scrollContainerRef,
    isDragging,
    isMouseDown,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel,
    handleLinkClick,
  } = useDragScroll();

  const { showPrevious, showNext, scrollNext, scrollPrevious } =
    useScrollNavigation({
      scrollContainerRef,
      itemCount: artworks.length,
    });

  return (
    <div className={styles.selectedArtwork}>
      <div className="padded-page">
        <div className={styles.carouselContainer}>
          <div
            ref={scrollContainerRef}
            className={`${styles.grid} ${styles.priorityGrid} ${isMouseDown ? styles.mouseDown : ""} ${isDragging ? styles.dragging : ""}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            {artworks.map((artwork) => {
              if (!artwork || !artwork.slug || !artwork.mainImage?.asset) {
                return null;
              }
              return (
                <div
                  key={artwork.mainImage.asset._id}
                  className={styles.gridItem}
                >
                  <Link
                    href={`/artwork/${artwork.slug.current}`}
                    aria-label={`View artwork: ${artwork.title}`}
                    className={styles.link}
                    onClick={handleLinkClick}
                  >
                    <ArtworkFigure
                      artwork={artwork}
                      sizes={sizes}
                      recent={recent}
                      priority={true}
                      showFilters={false}
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

          {/* Navigation buttons */}
          <div className={styles.navigationButtons}>
            <button
              onClick={scrollPrevious}
              className={`${styles.navButton} ${styles.prevButton}`}
              aria-label="Previous artwork"
              disabled={!showPrevious}
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Next artwork"
              disabled={!showNext}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PriorityArtworkCarousel };
