import Link from "next/link";
import Image from "next/image";
import styles from "./SplitFeature.module.scss";

export default function SplitFeature() {
  return (
    <section className={styles.splitFeatureSection}>
      <div className={styles.splitFeatureWrapper}>
        <div className={styles.grid}>

          {/* ── Left: Text ── */}
          <div className={styles.colText}>
            <div className={styles.textCard}>
              <div className={styles.textContent}>
                <div className={styles.textInner}>
                  <h2 className={styles.splitFeatureHeading}>
                    New In: Essential Cricket Protein Blend
                  </h2>
                  <p className={styles.splitFeatureCopy}>
                    Introducing our most affordable cricket protein supplement yet!
                    A premium blend of high-quality cricket powder — for
                    exceptional results with minimal environmental impact. From the
                    pioneers of sustainable cricket nutrition.
                  </p>
                </div>
              </div>

              <div className={styles.ctas}>
                <Link href="/products/cricket-powder-large" className={styles.btnSecondary}>
                  <div className={styles.mask}>
                    <span
                      className={styles.slidingText}
                      data-content="Shop Now"
                    >
                      Shop Now
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className={styles.colMedia}>
            <div className={styles.mediaWrap}>
              <Image
                src="/images/split/essential-blend.jpg"
                alt="Essential Cricket Protein Blend"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={styles.mediaImg}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
