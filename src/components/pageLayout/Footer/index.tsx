import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="padded-menu">
      <div className={styles.line}></div>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className="body-section">© {year} GMD AI</div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
