import { useState, useEffect, useCallback } from "react";

interface UseScrollNavigationProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  itemCount: number;
}

interface UseScrollNavigationReturn {
  showPrevious: boolean;
  showNext: boolean;
  scrollNext: () => void;
  scrollPrevious: () => void;
}

export const useScrollNavigation = ({
  scrollContainerRef,
  itemCount,
}: UseScrollNavigationProps): UseScrollNavigationReturn => {
  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      setShowPrevious(scrollLeft > 0);
      setShowNext(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();

      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [itemCount, checkScrollPosition, scrollContainerRef]);

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstChild = container.firstElementChild as HTMLElement;
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth;
        const gap = parseInt(getComputedStyle(container).gap) || 0;
        const itemWithGap = itemWidth + gap;

        // Calculate current position relative to item boundaries
        const currentScroll = container.scrollLeft;
        const currentItemIndex = Math.round(currentScroll / itemWithGap);

        // Scroll to next item boundary
        const targetScroll = (currentItemIndex + 1) * itemWithGap;
        container.scrollTo({ left: targetScroll, behavior: "smooth" });
      }
    }
  };

  const scrollPrevious = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstChild = container.firstElementChild as HTMLElement;
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth;
        const gap = parseInt(getComputedStyle(container).gap) || 0;
        const itemWithGap = itemWidth + gap;

        // Calculate current position relative to item boundaries
        const currentScroll = container.scrollLeft;
        const currentItemIndex = Math.round(currentScroll / itemWithGap);

        // Scroll to previous item boundary
        const targetScroll = Math.max(0, (currentItemIndex - 1) * itemWithGap);
        container.scrollTo({ left: targetScroll, behavior: "smooth" });
      }
    }
  };

  return {
    showPrevious,
    showNext,
    scrollNext,
    scrollPrevious,
  };
};
