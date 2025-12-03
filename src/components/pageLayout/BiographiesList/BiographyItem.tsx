import { BIOGRAPHIES_QUERYResult } from "@/sanity/types";
import { dateYear, formatDateRange } from "@/utils/common";
import styles from "./BiographyList.module.css";

// Create a semantic type alias for better readability
type Biography = NonNullable<BIOGRAPHIES_QUERYResult[0]>;

interface BiographyItemProps {
  item: Biography;
  startFinishDate?: boolean;
}

const BiographyItem = ({ item, startFinishDate }: BiographyItemProps) => {
  const year = startFinishDate
    ? formatDateRange(item.startDate, item.endDate)
    : dateYear(item.startDate);
  return (
    <div
      className={`${startFinishDate ? styles.startFinishDate : styles.biographyItem}`}
    >
      <div className={styles.date}>{year}</div>
      <div className={`${styles.title} grid-title`}>{item.title}</div>
    </div>
  );
};

export { BiographyItem };
