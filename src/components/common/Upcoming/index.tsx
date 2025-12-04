import Link from "next/link";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SanityImage } from "@/components/common/SanityImage";
import { formatDateRange } from "@/utils/common";
import styles from "./Upcoming.module.css";

interface CurrentUpcomingProps {
  upcoming: any[];
  current?: any[];
}

const CurrentUpcoming = ({ upcoming, current }: CurrentUpcomingProps) => {
  // Combine current and upcoming shows with status
  const allShows = [
    ...(current?.map((show) => ({ ...show, status: "current" as const })) ||
      []),
    ...(upcoming?.map((show) => ({ ...show, status: "upcoming" as const })) ||
      []),
  ];

  if (!allShows || allShows.length === 0) {
    return null;
  }

  const gridSizes = `
    (max-width: 35em) calc((100vw - 32px - 16px) / 2),
    (max-width: 48em) calc((100vw - 128px - 16px) / 2),
    (max-width: 60em) calc((100vw - 256px - 32px) / 3),
    calc((100vw - 256px - 48px) / 4)
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <section className={styles.upcoming}>
      <ul className={styles.list}>
        {allShows
          .filter((exhibition) => exhibition.slug?.current)
          .map((exhibition) => (
            <li key={exhibition._id} className={styles.item}>
              <Link
                href={`/biography/${exhibition.slug!.current}`}
                className={styles.titleLink}
              >
                <figure>
                  <div className={styles.imageWrapper}>
                    {exhibition.mainImage && (
                      <SanityImage
                        image={exhibition.mainImage}
                        alt={`${exhibition.title} by GMD AI`}
                        sizes={gridSizes}
                        fill={false}
                        quality={90} // Higher quality for artwork images, but not 98
                        maxWidth={800} // Reasonable max for grid images
                      />
                    )}
                  </div>
                  <figcaption>
                    <h3 className={"grid-title"}>{exhibition.title}</h3>
                    {(exhibition.startDate || exhibition.endDate) && (
                      <div className={"grid-date"}>
                        {formatDateRange(
                          exhibition.startDate,
                          exhibition.endDate
                        )}
                        {exhibition.status === "current" && (
                          <div className={styles.statusBadge}>Now showing</div>
                        )}
                      </div>
                    )}
                    {/* {showDescription && (
                      <div className={styles.description}></div>
                    )} */}
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export { CurrentUpcoming };
