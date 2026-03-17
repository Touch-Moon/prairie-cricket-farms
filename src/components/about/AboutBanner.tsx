"use client";

import styles from "./AboutBanner.module.scss";

export default function AboutBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Established 2016</p>
        <h2 className={styles.heading}>The Story of Prairie Cricket Farms</h2>
        <p className={styles.sub}>
          Hey! I&rsquo;m Ryan Steppler and I created a cricket farm.
          <br />
          <span className={styles.subGreen}>Yes, a cricket farm.</span>
        </p>
      </div>
    </section>
  );
}
