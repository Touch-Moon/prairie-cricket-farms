"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <main className={`${styles.notFoundPage} ${visible ? styles.visible : ""}`}>
      <div className={styles.notFoundContent}>
        <p className={styles.eyebrow}>404 — Page Not Found</p>
        <h1 className={styles.heading}>
          Oops,<br />Wrong Trail
        </h1>
        <p className={styles.description}>
          Looks like this page hopped away. Let&apos;s get you back on track.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary}>
            <span className={styles.mask}>
              <span className={styles.slide} data-content="Go Home">
                Go Home
              </span>
            </span>
          </Link>
          <Link href="/shop" className={styles.btnSecondary}>
            <span className={styles.mask}>
              <span className={styles.slide} data-content="Shop Products">
                Shop Products
              </span>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
