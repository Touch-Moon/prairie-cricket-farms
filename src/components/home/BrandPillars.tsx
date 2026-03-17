import Link from "next/link";
import styles from "./BrandPillars.module.scss";

const PILLARS = [
  {
    image: "/images/pillars/pillar-1.jpg",
    heading: "Proven",
    copy: "100% backed by independent nutritional research — cricket protein delivers a complete amino acid profile with exceptional bioavailability.",
  },
  {
    image: "/images/pillars/pillar-2.jpg",
    heading: "Pure",
    copy: "Our products are the cleanest cricket protein available — minimal ingredients, zero fillers, nothing you don't need.",
  },
  {
    image: "/images/pillars/pillar-3.jpg",
    heading: "Powerful",
    copy: "Tried, tested, and trusted by thousands of customers. The results, 5-star reviews, and visible impact speak for themselves.",
  },
];

export default function BrandPillars() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left — heading + CTA */}
        <div className={styles.colLeft}>
          <h2 className={styles.heading}>
            Proven.<br />
            Pure.<br />
            Powerful.
          </h2>
          <Link href="/shop" className={styles.btn}>
            <div className={styles.mask}>
              <span className={styles.slidingText} data-content="Shop Prairie Cricket Farms">
                Shop Prairie Cricket Farms
              </span>
            </div>
          </Link>
        </div>

        {/* Right — 3 pillar rows */}
        <div className={styles.colRight}>
          {PILLARS.map((pillar) => (
            <div key={pillar.heading} className={styles.pillar}>
              <div className={styles.pillarBody}>
                <h3 className={styles.pillarHeading}>{pillar.heading}</h3>
                <p className={styles.pillarCopy}>{pillar.copy}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
