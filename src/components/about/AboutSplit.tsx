import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./AboutSplit.module.scss";

interface AboutSplitProps {
  heading: string;
  copy: React.ReactNode;
  cta?: { label: string; href: string };
  image: string;
  imageAlt: string;
  reverse?: boolean;
  mobileImageTop?: boolean;
}

export default function AboutSplit({
  heading,
  copy,
  cta,
  image,
  imageAlt,
  reverse = false,
  mobileImageTop = false,
}: AboutSplitProps) {
  const textCol = (
    <div className={styles.colText}>
      <div className={`${styles.textCard} ${reverse ? styles.textCardReverse : ""}`}>
        <div className={styles.textContent}>
          <div className={styles.textInner}>
            <h2 className={styles.heading}>{heading}</h2>
            <div className={styles.copy}>{copy}</div>
          </div>
        </div>
        {cta && (
          <div className={styles.ctas}>
            <Link href={cta.href} className={styles.btnSecondary}>
              <div className={styles.mask}>
                <span className={styles.slidingText} data-content={cta.label}>
                  {cta.label}
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  const mediaCol = (
    <div className={`${styles.colMedia} ${mobileImageTop ? styles.colMediaTop : ""}`}>
      <div className={styles.mediaWrap}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={styles.mediaImg}
        />
      </div>
    </div>
  );

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {reverse ? <>{mediaCol}{textCol}</> : <>{textCol}{mediaCol}</>}
        </div>
      </div>
    </section>
  );
}
