import Link from "next/link";
import Image from "next/image";
import styles from "../home/SplitFeature.module.scss";

export default function RecipesTips() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>

          {/* ── Left: Text ── */}
          <div className={styles.colText}>
            <div className={styles.textCard}>
              <div className={styles.textContent}>
                <div className={styles.textInner}>
                  <h2 className={styles.heading}>
                    Steppler Family Tips &amp; Tricks
                  </h2>

                  <p className={styles.copy}>
                    How to work cricket powder into your daily intake:
                  </p>

                  <ul className={styles.copy} style={{ paddingLeft: "1.2em", display: "flex", flexDirection: "column", gap: "12px", listStyle: "disc" }}>
                    <li>
                      Cricket powder is best consumed when mixed into food or
                      drink. The naturally nutty flavour tastes best in
                      smoothies, baked goods, and other recipes — smoothies are
                      our favourite way to consume it daily!
                    </li>
                    <li>
                      Use it as a flour replacement in baking (recommended mix:
                      25% cricket powder + 75% regular flour). Great for
                      cookies, muffins, cakes, and more.
                    </li>
                    <li>
                      Mix into smoothies or yogurt to add protein to your daily
                      favourites.
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.ctas}>
                <Link href="/contact" className={styles.btnSecondary}>
                  <div className={styles.mask}>
                    <span
                      className={styles.slidingText}
                      data-content="We're here to help"
                    >
                      We&apos;re here to help
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
                src="/images/recipes/pcf-recipe-tips.jpg"
                alt="Couple preparing healthy snacks with cricket protein powder"
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
