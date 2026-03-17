"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./RecipesHero.module.scss";

interface RecipesHeroProps {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  instagramUrl?: string;
}

export default function RecipesHero({
  eyebrow,
  heading,
  description,
  instagramUrl = "https://www.instagram.com/prairiecricketfarms/",
}: RecipesHeroProps) {
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
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.igBtn}
        >
          <span className={styles.mask}>
            <span className={styles.slide} data-content="Go to Instagram">
              Go to Instagram
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
