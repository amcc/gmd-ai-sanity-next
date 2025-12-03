"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { FilterButton } from "@/components/common/FilterButton";

import { PopupMenu } from "./PopupMenu";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const pathnameArray = pathname && pathname.split("/").filter(Boolean);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        // Remove focus from any currently focused element to prevent outline
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <div className={`${styles.menu} ${isMenuOpen && styles.open} padded-menu`}>
      <div className={styles.menuInner}>
        <h2 id="mainmenulabel" className="visually-hidden">
          Main Menus
        </h2>
        <nav aria-labelledby="mainmenulabel" className={styles.nav}>
          <ul className={`${styles.nameMenu} `}>
            <li>
              <Link
                className={styles.name}
                href="/"
                onClick={() => isMenuOpen && setIsMenuOpen(false)}
                // className={pathname === "/" ? styles.active : ""}
              >
                {/* ALISTAIR M<span className={styles.shiftedC}>c</span>CLYMONT */}
                GMD AI
              </Link>
            </li>
            {pathnameArray && pathnameArray.length > 1 && (
              <li className={styles.area}>
                <Link
                  className={styles.name}
                  href={`/${pathnameArray[0]}`}
                  onClick={() => isMenuOpen && setIsMenuOpen(false)}
                >
                  {pathnameArray[0]}
                </Link>
              </li>
            )}
            <li className={styles.menuToggle}>
              <FilterButton
                variant="toggle"
                isActive={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                ariaExpanded={isMenuOpen}
                ariaControls="popup-menu"
                ariaLabel={isMenuOpen ? "Close menu" : "Open menu"}
                className={styles.menuButton}
              >
                {isMenuOpen ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={styles.closeIcon}
                  >
                    <path
                      d="M5.5 4.5L20.5 19.5M20.5 4.5L5.5 19.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  // <>close</>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={styles.hamburgerIcon}
                  >
                    <path
                      d="M3 12H21M3 6H21M3 18H21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  // <>menu</>
                )}
              </FilterButton>
            </li>
          </ul>
          <PopupMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        </nav>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export { Menu };
