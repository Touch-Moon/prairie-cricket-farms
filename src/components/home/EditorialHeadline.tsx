import React from "react";
import Link from "next/link";
import styles from "./EditorialHeadline.module.scss";

interface EditorialHeadlineProps {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  cta?: { label: string; href: string };
}

export default function EditorialHeadline({ eyebrow, heading, description, cta }: EditorialHeadlineProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{heading}</h2>
        {description && <p className={styles.description}>{description}</p>}
        {cta && (
          <Link href={cta.href} className={styles.btn}>
            <div className={styles.mask}>
              <span className={styles.slidingText} data-content={cta.label}>
                {cta.label}
              </span>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
