"use client";

import { useState } from "react";
import { PortableTextBlock } from "@portabletext/react";
import { BlockContent } from "@/components/common/BlockContent";
import styles from "./FaqItem.module.css";

interface FaqItemProps {
  question: string;
  answer: PortableTextBlock[];
}

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button
        className={styles.faqButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.faqQuestion}>
          <h3>{question}</h3>
        </span>
        <span className={styles.faqIcon} aria-hidden="true">
          <h3>{isOpen ? "−" : "+"}</h3>
        </span>
      </button>
      {isOpen && (
        <div className={styles.faqAnswer}>
          <BlockContent blocks={answer} />
        </div>
      )}
    </div>
  );
}
