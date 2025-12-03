import Link from "next/link";
import styles from "./MoreLink.module.css";

const MoreLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link href={href} className={`${styles.moreLink} ${className} grid-title`}>
      {children}
    </Link>
  );
};

export default MoreLink;
