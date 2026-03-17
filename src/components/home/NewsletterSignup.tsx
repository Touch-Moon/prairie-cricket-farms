"use client";

import { useState } from "react";
import styles from "./NewsletterSignup.module.scss";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prototype: mock handling before actual service integration
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Subscribe for the latest news, special offers and first look at our
          new products.
        </h2>

        {subscribed ? (
          <p className={styles.successMessage}>
            Thanks for subscribing! We&apos;ll be in touch soon.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.submit}>
              Sign Up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
