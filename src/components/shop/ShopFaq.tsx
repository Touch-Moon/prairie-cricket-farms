"use client";

import { useState } from "react";
import styles from "./ShopFaq.module.scss";

const faqs = [
  {
    q: "What is 100% Cricket Powder?",
    a: "Our 100% Cricket Powder is made from finely milled, roasted whole crickets. It delivers a protein content similar to whey (12g per 2.5 tbsp) — without any dairy — and comes packed with natural prebiotic fibre to support gut health.",
  },
  {
    q: "How does cricket farming work?",
    a: "Crickets are raised to their optimal harvest age, then frozen, boiled, roasted, and milled into a fine powder. The entire process is efficient and clean, producing minimal emissions and virtually zero waste.",
  },
  {
    q: "What are the main benefits of Cricket Powder?",
    a: "Cricket Powder provides more protein per serving than most conventional sources, along with vitamin B12, zinc, manganese, omega fatty acids, dairy-free calcium, and iron — nutrients that are often missing from both animal and plant-based diets.",
  },
  {
    q: "When and how should I take Cricket Powder?",
    a: "Any time of day works great. Blend it into smoothies, stir it into yogurt, or mix it into baked goods and other recipes. For baking, we recommend replacing up to 25% of regular flour with cricket powder to retain texture.",
  },
  {
    q: "Is cricket protein safe for people with shellfish allergies?",
    a: "Cricket protein may trigger reactions in people with shellfish allergies, as insects and crustaceans share similar proteins. If you have a known shellfish allergy, we strongly recommend consulting your doctor before use.",
  },
  {
    q: "Are your products suitable for vegans?",
    a: "Our products are not vegan, as they contain whole cricket protein. However, they are free from dairy, gluten, and soy, making them a great fit for many dietary needs — and a far more sustainable alternative to conventional animal proteins.",
  },
];

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      {/* Horizontal bar — always visible */}
      <line
        x1="0" y1="8" x2="16" y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      {/* Vertical bar — rotates 90° → overlaps horizontal → becomes "−" */}
      <line
        x1="8" y1="0" x2="8" y2="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        style={{
          transformOrigin: "8px 8px",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0, 1)",
        }}
      />
    </svg>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.item}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={styles.question}>{q}</span>
        <span className={styles.icon}>
          <PlusMinusIcon open={open} />
        </span>
      </button>
      <div
        className={styles.body}
        aria-hidden={!open}
      >
        <div className={styles.bodyInner}>
          <p className={styles.answer}>{a}</p>
        </div>
      </div>
    </li>
  );
}

export default function ShopFaq() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Got Questions?</p>
          <h2 className={styles.heading}>Frequently Asked Questions</h2>
        </div>

        {/* Accordion */}
        <ul className={styles.list} role="list">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </ul>

      </div>
    </section>
  );
}
