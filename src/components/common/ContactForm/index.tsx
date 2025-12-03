"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { FilterButton } from "../FilterButton";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);

      // Convert FormData to URLSearchParams properly
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      // console.log("Submitting form data:", data); // Debug log

      // console.log("Submitting form data:", data); // Debug log

      // Try the __forms.html approach first
      let response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });

      // If that fails, try posting to the root with Netlify form detection
      if (!response.ok) {
        response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        });
      }

      // console.log("Response status:", response.status); // Debug log
      // console.log("Response ok:", response.ok); // Debug log

      // console.log("Response status:", response.status); // Debug log
      // console.log("Response ok:", response.ok); // Debug log

      if (response.ok || response.status === 200 || response.status === 302) {
        setIsSubmitted(true);
        // Reset form
        (event.target as HTMLFormElement).reset();
      } else {
        const responseText = await response.text();
        console.error("Response error:", responseText);
        throw new Error(
          `Form submission failed with status: ${response.status}`
        );
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className={styles.successMessage}>
        <p className="grid-title">Thank you for your message!</p>
        <p>I&apos;ll get back to you as soon as possible.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className={styles.resetButton}
        >
          Send another message
        </button>
      </section>
    );
  }

  return (
    <section>
      <form
        name="contact"
        onSubmit={handleFormSubmit}
        className={styles.contactForm}
      >
        {/* Hidden field for Netlify spam protection */}
        <input type="hidden" name="form-name" value="contact" />
        <p className={styles.hiddenField}>
          <label>
            Do not fill this out if you are human:
            <input name="bot-field" />
          </label>
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formGroup}>
          {/* <label htmlFor="name">Name *</label> */}
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitting}
            className="form-input"
            placeholder="Name"
          />
        </div>

        <div className={styles.formGroup}>
          {/* <label htmlFor="email">Email *</label> */}
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitting}
            className="form-input"
            placeholder="Email"
          />
        </div>

        <div className={styles.formGroup}>
          {/* <label htmlFor="subject">Subject</label> */}
          <input
            type="text"
            id="subject"
            name="subject"
            disabled={isSubmitting}
            className="form-input"
            placeholder="Subject"
          />
        </div>

        <div className={styles.formGroup}>
          {/* <label htmlFor="message">Message *</label> */}
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            disabled={isSubmitting}
            className={`${styles.formTextarea} form-input`}
            placeholder="Enter your message"
          />
        </div>

        {/* <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button> */}
        <FilterButton
          type="submit"
          variant="submit"
          disabled={isSubmitting}
          // className={styles.submitButtonOverride}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </FilterButton>
      </form>
    </section>
  );
};

export { ContactForm };
