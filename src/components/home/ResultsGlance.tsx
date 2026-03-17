"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ResultsGlance.module.scss";

const STATS = [
  { value: 94, label: "Reported feeling fuller for longer after switching to cricket protein" },
  { value: 60, label: "More protein per gram than beef — with a fraction of the footprint" },
  { value: 88, label: "Said cricket powder blended seamlessly into their daily routine" },
  { value: 98, label: "Would recommend Prairie Cricket Farms to a friend or family member" },
];

// ── Animated counter ─────────────────────────────────────────
function AnimatedStat({
  value,
  label,
  inView,
}: {
  value: number;
  label: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1600; // ms
    const step = 1000 / 60; // ~16ms per frame
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div className={styles.stat}>
      <p className={styles.number}>
        {count}
        <span className={styles.percent}> %</span>
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}

// ── ResultsGlance ────────────────────────────────────────────
export default function ResultsGlance({ reverse = false }: { reverse?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={`${styles.container} ${reverse ? styles.containerReverse : ""}`}>
        {/* Left — portrait image */}
        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/results/portrait.jpg"
              alt="Customer results portrait"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>

        {/* Right — heading + stats */}
        <div className={styles.left}>
          <h2 className={styles.eyebrow}>8 Week Results at a Glance</h2>

          <div className={styles.grid}>
            {STATS.map((s) => (
              <AnimatedStat
                key={s.value}
                value={s.value}
                label={s.label}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
