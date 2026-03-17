"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./PressQuotes.module.scss";

const QUOTES = [
  {
    text: "Prairie Cricket Farms is rewriting what sustainable protein looks like — nutrient-dense, gut-friendly, and raised right in the heart of the Canadian Prairies.",
    source: "Chatelaine",
  },
  {
    text: "With 12 grams of complete protein per serving, plus Vitamin B12, calcium, and prebiotic fibre, this cricket powder delivers more in one scoop than most supplements stack in a week.",
    source: "Canadian Living",
  },
  {
    text: "The 'ick factor'? Gone after the first smoothie. What remains is a clean, nutty protein that genuinely earns its superfood status — backed by a family farm story worth rooting for.",
    source: "Well+Good",
  },
  {
    text: "From a basement in Manitoba to a full-scale facility, Prairie Cricket Farms shows that the future of food is already here — and it tastes surprisingly good in your morning oats.",
    source: "Outside",
  },
];

const AUTO_INTERVAL = 5000;

export default function PressQuotes() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % QUOTES.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.container}>
        {/* Eyebrow */}
        <p className={styles.eyebrow}>In the Press</p>

        {/* Quotes */}
        <div className={styles.quoteArea}>
          {QUOTES.map((q, i) => (
            <blockquote
              key={i}
              className={`${styles.quote} ${i === active ? styles.quoteActive : ""}`}
              aria-hidden={i !== active}
            >
              &ldquo;{q.text}&rdquo;
            </blockquote>
          ))}
        </div>

        {/* Publication names as nav */}
        <div className={styles.logos}>
          {QUOTES.map((q, i) => (
            <button
              key={q.source}
              className={`${styles.logoBtn} ${i === active ? styles.logoBtnActive : ""}`}
              onClick={() => setActive(i)}
              aria-label={q.source}
            >
              <span className={styles.logoText}>{q.source}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
