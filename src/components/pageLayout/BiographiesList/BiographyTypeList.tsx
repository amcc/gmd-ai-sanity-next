import Link from "next/link";
import { BIOGRAPHIES_QUERYResult } from "@/sanity/types";
import { BiographyItem } from "./BiographyItem";
import styles from "./BiographyList.module.css";

// Create a semantic type alias that matches BiographyItem's expected type
type Biography = NonNullable<BIOGRAPHIES_QUERYResult[0]>;

interface BiographyTypeListProps {
  biographies: Biography[];
  type: string;
}

const BiographyTypeList = ({ biographies, type }: BiographyTypeListProps) => {
  return (
    <>
      {biographies && biographies.length > 0 && (
        <div className={styles.biographySection}>
          <h3 className={`${styles.biographyListTitle} big-title`}>{type}</h3>
          <ul>
            {biographies.map((item) => (
              <li key={item._id}>
                <Link
                  href={`/biography/${item?.slug?.current}`}
                  aria-label={`View ${type}: ${item.title}`}
                  className={styles.link}
                >
                  <BiographyItem
                    item={item}
                    startFinishDate={type === "current" || type === "upcoming"}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export { BiographyTypeList };
