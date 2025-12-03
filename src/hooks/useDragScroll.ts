import { useRef, useState, useEffect, useCallback } from "react";

interface UseDragScrollReturn {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  isDragging: boolean;
  isMouseDown: boolean;
  hasDragged: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleTouchCancel: () => void;
  handleLinkClick: (e: React.MouseEvent) => void;
  snapToNext: () => void;
  snapToPrevious: () => void;
}

export const useDragScroll = (): UseDragScrollReturn => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollLeft: 0 });
  const [isReady, setIsReady] = useState(false);
  const [hasSnapped, setHasSnapped] = useState(false);

  // Check if we're on a mobile device (only in browser environment)
  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const snapToNext = useCallback(() => {
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
  }, []);

  const snapToPrevious = useCallback(() => {
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
  }, []);

  // Desktop-only mouse drag implementation
  useEffect(() => {
    // Skip mouse events on mobile
    if (isMobile) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isReady || !scrollContainerRef.current) return;

      e.preventDefault();
      const x = e.pageX;
      const distance = Math.abs(x - dragStart.x);
      const dragDirection = x - dragStart.x; // positive = right, negative = left

      // Only start dragging if moved more than 5px
      if (distance > 5) {
        setIsDragging(true);
        setHasDragged(true);

        // Snap behavior: trigger snap once when drag threshold is met
        if (!hasSnapped && distance > 50) {
          // 50px threshold for snapping
          setHasSnapped(true);

          if (dragDirection < 0) {
            // Dragging left = go to next (right)
            snapToNext();
          } else {
            // Dragging right = go to previous (left)
            snapToPrevious();
          }
        }
      }
    };

    const handleGlobalMouseUp = () => {
      setIsMouseDown(false);
      setIsDragging(false);
      setIsReady(false);
      setHasSnapped(false);
      setTimeout(() => setHasDragged(false), 100);
    };

    if (isReady) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("mouseleave", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mouseleave", handleGlobalMouseUp);
    };
  }, [isReady, dragStart, isMobile, hasSnapped, snapToNext, snapToPrevious]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Skip on mobile
    if (isMobile || !scrollContainerRef.current) return;

    setIsMouseDown(true);
    setIsReady(true);
    setIsDragging(false);
    setHasDragged(false);
    setHasSnapped(false);
    setDragStart({
      x: e.pageX,
      y: e.pageY,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    });

    e.preventDefault();
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    // Only prevent if we're on desktop and have dragged
    if (!isMobile && hasDragged) {
      e.preventDefault();
    }
  };

  return {
    scrollContainerRef,
    isDragging: isMobile ? false : isDragging,
    isMouseDown: isMobile ? false : isMouseDown,
    hasDragged: isMobile ? false : hasDragged,
    handleMouseDown,
    handleTouchStart: () => {}, // No-op - let native handle it
    handleTouchMove: () => {}, // No-op - let native handle it
    handleTouchEnd: () => {}, // No-op
    handleTouchCancel: () => {}, // No-op
    handleLinkClick,
    snapToNext,
    snapToPrevious,
  };
};
