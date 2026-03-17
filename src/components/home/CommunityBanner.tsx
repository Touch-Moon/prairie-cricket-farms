import Link from "next/link";
import styles from "./CommunityBanner.module.scss";

export default function CommunityBanner() {
  return (
    <section className={styles.communityBannerSection}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>The #1 Cricket Protein Experts</p>
        <h2 className={styles.heading}>
          One Scoop a Day.
          <br />
          That&#8202;&rsquo;s All It Took.
        </h2>
        <Link href="/about" className={styles.cta}>
          Follow Our Story
        </Link>
      </div>
    </section>
  );
}
