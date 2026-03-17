"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./AboutHero.module.scss";

interface AboutHeroProps {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: string;
}

export default function AboutHero({
  eyebrow,
  heading,
  description,
}: AboutHeroProps) {
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
