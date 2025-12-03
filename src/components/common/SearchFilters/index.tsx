import React, { useRef } from "react";
import styles from "./SearchFilters.module.css";
import { FilterButton } from "../FilterButton";
import { ORDER_OPTIONS } from "../ImageGrid/orderOptions";

interface SearchFiltersProps {
  showFilters: boolean;
  itemType?: "artwork" | "biography" | "studio";
  setShowFilters: (show: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedOrder: string | null;
  setSelectedOrder: (order: string | null) => void;
  allCategories: string[];
}

const SearchFilters = ({
  showFilters,
  itemType = "artwork",
  setShowFilters,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedOrder,
  setSelectedOrder,
  allCategories,
}: SearchFiltersProps) => {
  // Ref for search input to focus when toggle is opened
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Toggle function with focus
  const handleToggleFilters = () => {
    const newShowFilters = !showFilters;
    setShowFilters(newShowFilters);
    handleClearAll();

    // Focus search input when opening filters
    if (newShowFilters) {
      // Use setTimeout to ensure the input is rendered before focusing
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.showFiltersToggle}>
        <FilterButton
          variant="toggle"
          onClick={handleToggleFilters}
          ariaExpanded={showFilters}
          ariaControls="search-filters"
        >
          {showFilters ? "close" : "search & filter"}
        </FilterButton>
      </div>

      <div
        id="search-filters"
        className={`${styles.filtersContainer} ${showFilters ? styles.expanded : styles.collapsed}`}
      >
        {/* Search Box */}
        <div className={styles.searchContainer}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <FilterButton
              variant="clear"
              onClick={() => setSearchTerm("")}
              ariaLabel="Clear search"
            >
              ✕
            </FilterButton>
          )}
        </div>

        {selectedCategory && (
          <div className={styles.mobileCategoryFilter}>
            <FilterButton
              variant="category"
              className={styles.allButton}
              isActive={!selectedCategory}
              onClick={handleClearAll}
            >
              All
            </FilterButton>
            <div className={styles.currentCategory}>{selectedCategory}</div>
          </div>
        )}
        {itemType === "artwork" && (
          <div className={styles.categoryFilter}>
            {ORDER_OPTIONS.map((orderOption) => (
              <FilterButton
                key={orderOption.key}
                variant="category"
                isActive={selectedOrder === orderOption.key}
                onClick={() => setSelectedOrder(orderOption.key)}
              >
                {orderOption.label}
              </FilterButton>
            ))}
          </div>
        )}
        <div className={styles.categoryFilter}>
          <FilterButton
            variant="category"
            className={styles.allButton}
            isActive={!selectedCategory}
            onClick={handleClearAll}
          >
            All
          </FilterButton>
          {allCategories.map((category) => (
            <FilterButton
              key={category}
              variant="category"
              isActive={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SearchFilters };
