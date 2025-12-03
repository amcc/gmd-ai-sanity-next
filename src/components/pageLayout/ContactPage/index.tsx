"use client";

import Link from "next/link";
import { ContactForm } from "@/components/common/ContactForm";
import { Obfuscate } from "@south-paw/react-obfuscate-ts";
import { NewsletterSubscribe } from "@/components/common/NewsletterSubscribe";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <div>
      <div className="body-section">
        <h1 className="page-title">Contact</h1>
      </div>
      <div className={styles.contactPage}>
        <section className="body-section">
          {/* <h1 className="page-title">Contact</h1> */}
          <p>
            Send a message using the form below, reach out via email, or
            Instagram.
          </p>
          <ContactForm />
        </section>
        <section className="body-section">
          <div className={styles.contactSection}>
            <h2 className="big-title">Email</h2>
            <p>
              <Obfuscate email>{"mail@alistairmcclymont.com"}</Obfuscate>
            </p>
          </div>
          <div className={styles.contactSection}>
            <h2 className="big-title">Instagram</h2>
            <Link href="https://www.instagram.com/alistairmcclymont/">
              @alistairmcclymont
            </Link>
          </div>
          <div className={styles.contactSection}>
            <h2 className="big-title">Mailing List</h2>
            <div className={styles.newsletter}>
              <NewsletterSubscribe label={true} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { ContactPage };
