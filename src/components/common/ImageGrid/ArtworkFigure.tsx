import { SanityImage } from "@/components/common/SanityImage";
import { FilterButton } from "@/components/common/FilterButton";
import { BlockContent } from "@/components/common/BlockContent";
import { PortableTextBlock } from "@portabletext/react";
import { ARTWORKS_QUERYResult } from "@/sanity/types";
import styles from "./ImageGrid.module.css";

const gridSizes = `
    (max-width: 35em) calc((100vw - 32px - 16px) / 2),
    (max-width: 48em) calc((100vw - 128px - 16px) / 2),
    (max-width: 60em) calc((100vw - 256px - 32px) / 3),
    calc((100vw - 256px - 48px) / 4)
  `;

interface ArtworkFigureProps {
  artwork: ARTWORKS_QUERYResult[0];
  sizes?: string | undefined;
  recent?: boolean;
  related?: boolean;
  showFilters: boolean;
  priority?: boolean;
  showDate?: boolean;
  showCategories?: boolean;
  selectedCategory?: string | null;
  setSelectedCategory?: (category: string | null) => void;
  setShowFilters?: (show: boolean) => void;
}

const ArtworkFigure = ({
  artwork,
  sizes = gridSizes,
  recent = false,
  related = false,
  priority = false,
  showDate = true,
  showCategories = true,
  showFilters,
  selectedCategory = null,
  setSelectedCategory,
  setShowFilters,
}: ArtworkFigureProps) => {
  const artworkDate = artwork.artworkDate
    ? new Date(artwork.artworkDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const categories = artwork.categories || null;

  // Handle description properly as BlockContent
  const getDescription = () => {
    if (artwork.briefDescription && artwork.briefDescription.length > 0) {
      return artwork.briefDescription;
    }
    if (artwork.description && artwork.description.length > 0) {
      return artwork.description;
    }
    return null;
  };

  const description = getDescription();

  return (
    <figure className={`${priority ? "priorityFigure" : ""}`}>
      <div className={styles.imageWrapper}>
        {artwork.mainImage && (
          <SanityImage
            image={artwork.mainImage}
            alt={`${artwork.title} by Alistair McClymont`}
            sizes={sizes}
            fill={false}
            quality={90} // Higher quality for artwork images, but not 98
            maxWidth={800} // Reasonable max for grid images
          />
        )}
      </div>
      <figcaption>
        <h3 className={"grid-title"}>{artwork.title}</h3>
        {showDate && <div className={"grid-date"}>{artworkDate}</div>}
        {priority && description && (
          <div className={styles.description}>
            <BlockContent blocks={description as PortableTextBlock[]} />
            {/* {artwork.description.length > 1 && (
              <span style={{ marginLeft: "4px" }}>…</span>
            )} */}
          </div>
        )}
        {categories &&
          showCategories &&
          !recent &&
          !related &&
          setSelectedCategory &&
          setShowFilters && (
            <div
              className={`${styles.categories} ${showFilters && styles.showCategories}`}
            >
              {categories.map((cat) => (
                <FilterButton
                  key={cat._id}
                  variant="category"
                  className={`${styles.category} ${selectedCategory === cat.title ? styles.activeCategory : ""}`}
                  isActive={selectedCategory === cat.title}
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                    setSelectedCategory?.(cat.title);
                    setShowFilters?.(true);
                  }}
                >
                  {cat.title}
                </FilterButton>
              ))}
            </div>
          )}
      </figcaption>
    </figure>
  );
};

export { ArtworkFigure };
