import {
  PortableText,
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import { SanityImage } from "@/components/common/SanityImage";
import Link from "next/link";
import styles from "./BlockContent.module.css";

// import { log } from "@/utils/common";

// Define the types for block content
interface BlockContentProps {
  blocks: PortableTextBlock[]; // Use proper PortableText block type
  className?: string;
}

// Custom components for rendering different block types
const components: PortableTextComponents = {
  // Block-level elements
  block: {
    // Paragraphs
    normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    // Headings
    h1: ({ children }) => <h1 className={styles.heading1}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.heading2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.heading3}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.heading4}>{children}</h4>,
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
  },

  // List elements
  list: {
    bullet: ({ children }) => <ul className={styles.bulletList}>{children}</ul>,
    number: ({ children }) => (
      <ol className={styles.numberedList}>{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className={styles.listItem}>{children}</li>,
    number: ({ children }) => <li className={styles.listItem}>{children}</li>,
  },

  // Inline elements (marks)
  marks: {
    // Strong/bold text
    strong: ({ children }) => (
      <strong className={styles.strong}>{children}</strong>
    ),
    // Emphasis/italic text
    em: ({ children }) => <em className={styles.emphasis}>{children}</em>,
    // Code
    code: ({ children }) => (
      <code className={styles.inlineCode}>{children}</code>
    ),
    // Links
    link: ({ children, value }) => {
      const { href } = value;

      // Internal links (start with /)
      if (href?.startsWith("/")) {
        return (
          <Link href={href} className={styles.internalLink}>
            {children}
          </Link>
        );
      }

      // External links
      return (
        <a
          href={href}
          className={styles.externalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },

  // Custom types (images, embeds, etc.)
  types: {
    // Image blocks
    image: ({ value }) => {
      return (
        <figure className={styles.imageBlock}>
          <SanityImage
            image={value}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            alt={value.alt || value.caption || ""}
          />
          {value.caption && (
            <figcaption className={styles.imageCaption}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // Video embeds (if you have them)
    video: ({ value }) => {
      if (!value.url) return null;

      return (
        <div className={styles.videoBlock}>
          <video
            controls
            className={styles.video}
            poster={value.poster?.asset?.url}
          >
            <source src={value.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {value.caption && (
            <p className={styles.videoCaption}>{value.caption}</p>
          )}
        </div>
      );
    },

    // Code blocks
    code: ({ value }) => (
      <pre className={styles.codeBlock}>
        <code className={value.language ? `language-${value.language}` : ""}>
          {value.code}
        </code>
      </pre>
    ),

    // Artwork references are not used in this site variant
  },
};

const BlockContent = ({ blocks, className }: BlockContentProps) => {
  // log(blocks);
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.blockContent} ${className || ""}`}>
      <PortableText value={blocks} components={components} />
    </div>
  );
};

export { BlockContent };
export type { BlockContentProps };
