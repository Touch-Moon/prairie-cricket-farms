"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./CollectionHero.module.scss";

interface CollectionHeroProps {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: string;
}

export default function CollectionHero({
  eyebrow,
  heading,
  description,
}: CollectionHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay for entry animation
    const timer = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.inner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.heading}>{heading}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </section>
  );
}
