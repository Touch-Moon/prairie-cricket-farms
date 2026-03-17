"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ContactHero.module.scss";

interface ContactHeroProps {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
}

export default function ContactHero({
  eyebrow,
  heading,
  description,
}: ContactHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
