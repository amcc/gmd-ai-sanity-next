"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import styles from "./PopupMenu.module.css";

interface PopupMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
}

const PopupMenu = ({ setIsMenuOpen, isMenuOpen }: PopupMenuProps) => {
  const pathname = usePathname();
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      {/* Fullscreen Menu Overlay */}
      <div
        id="popup-menu"
        className={`${styles.menuOverlay} ${isMenuOpen ? styles.open : ""} `}
      >
        <div className={`${styles.fullscreenMenuWrapper} padded-page`}>
          <ul id="menu" className={styles.fullscreenMenu}>
            <li className={`${styles.first}`}>
              <h2 className="page-title">
                <Link
                  href="/artwork"
                  className={pathname === "/artwork" ? styles.active : ""}
                  onClick={closeMenu}
                >
                  artwork
                </Link>
              </h2>
            </li>
            <li>
              <h2 className="page-title">
                <Link
                  href="/biography"
                  className={pathname === "/biography" ? styles.active : ""}
                  onClick={closeMenu}
                >
                  biography
                </Link>
              </h2>
            </li>
            <li>
              <h2 className="page-title">
                <Link
                  href="/studio"
                  className={pathname === "/studio" ? styles.active : ""}
                  onClick={closeMenu}
                >
                  studio
                </Link>
              </h2>
            </li>
            <li>
              <h2 className="page-title">
                <Link
                  href="/contact"
                  className={pathname === "/contact" ? styles.active : ""}
                  onClick={closeMenu}
                >
                  contact
                </Link>
              </h2>
            </li>
          </ul>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export { PopupMenu };
