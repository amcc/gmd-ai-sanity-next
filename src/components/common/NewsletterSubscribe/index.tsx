"use client";

import React, { useState } from "react";
import styles from "./NewsletterSubscribe.module.css";
import { FilterButton } from "../FilterButton";

interface NewsletterSubscribeProps {
  className?: string;
  label?: boolean;
}

const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  className,
  label,
}) => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim()) {
      setStatus("error");
      setMessage("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Custom error handling for Mailchimp "Member Exists"
        if (data.error && data.error.includes("already a list member")) {
          setStatus("error");
          setMessage("You're already subscribed to the mailing list.");
        } else {
          setStatus("error");
          setMessage(data.error || "Subscription failed");
        }
        // Clear error message after 20 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 20000);
        return;
      }

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");

      // Clear success message after 4 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Error subscribing. Please try again."
      );

      // Clear error message after 20 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 20000);
    }
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {label && <label htmlFor="email">Subscribe to the mailing list</label>}

        <div className={styles.inputGroup}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            // className={styles.input}
            disabled={status === "submitting"}
            autoComplete="email"
            className="form-input"
          />
          {/* <button
            type="submit"
            disabled={status === "submitting"}
            className={styles.button}
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button> */}
          <FilterButton
            type="submit"
            variant="submit"
            disabled={status === "submitting"}
            className={styles.button}
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </FilterButton>
        </div>

        {message && (
          <p
            className={`${styles.message} ${
              status === "success" ? styles.success : styles.error
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export { NewsletterSubscribe };
