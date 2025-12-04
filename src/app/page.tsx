import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { FAQS_QUERY } from "@/sanity/lib/queries";
import { ArrowSketch } from "@/components/common/ArrowSketch";
import { FaqItem } from "@/components/common/FaqItem";
import { PortableTextBlock } from "@portabletext/react";
import styles from "./home.module.css";

interface Faq {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  order?: number;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "AI - Show Your Visual Creativity",
  description:
    "Visual creativity means that you design, draw, iterate and test using visual means.",
};

export default async function Home() {
  const faqs = (await sanityFetch({
    query: FAQS_QUERY,
    tags: ["faq"], // Cache tag for on-demand revalidation
  })) as Faq[];

  return (
    <main>
      <div className={styles.topSection}>
        <ArrowSketch />
        <div className={styles.infoContainer}>
          <h1>AI</h1>
          <h2>
            Show <em>your</em> visual creativity
          </h2>
          <p>
            Visual creativity means that <em>you</em> design, draw, iterate and
            test using visual means.
          </p>
          <p>
            You must remain in creative control of your project. Explore, create
            and demonstrate your contribution as a human designer.
          </p>
          <p>
            AI is a useful tool, be clear why and how you are using it and the
            role it has within your work.
          </p>
          {faqs.length > 0 && (
            <div id="faq" className={styles.faqSection}>
              <p>
                <a
                  href="https://www.arts.ac.uk/about-ual/teaching-and-learning-exchange/digital-learning/ai-and-education/student-guide-to-generative-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Student guide to generative AI
                </a>
              </p>
              <h2>Frequently Asked Questions:</h2>
              <div className={styles.faqList}>
                {faqs.map((faq: Faq) => (
                  <div key={faq._id} className={styles.faqItem}>
                    <FaqItem question={faq.question} answer={faq.answer} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
