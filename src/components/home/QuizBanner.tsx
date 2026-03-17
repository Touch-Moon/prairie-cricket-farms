import Link from "next/link";
import styles from "./QuizBanner.module.scss";

interface QuizBannerProps {
  heading?: string;
  copy?: string;
  cta?: { label: string; href: string } | null;
}

export default function QuizBanner({
  heading = "Not sure where to start?",
  copy = "Browse our full range of cricket protein products and find the perfect fit for your lifestyle.",
  cta = { label: "Shop Now", href: "/shop" },
}: QuizBannerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.copy}>{copy}</p>
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
