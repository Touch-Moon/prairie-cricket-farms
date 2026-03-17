"use client";

import styles from "./AboutQuote.module.scss";

interface AboutQuoteProps {
  eyebrow?: string;
  quote: string;
}

export default function AboutQuote({ eyebrow, quote }: AboutQuoteProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <blockquote className={styles.quote}>
          {quote.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </blockquote>
      </div>
    </section>
  );
}
