import Link from "next/link";
import { footerNav } from "@/data/navigation";
import styles from "./Footer.module.scss";

const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/prairiecricketfarms?mibextid=ZbWKwL" },
  { label: "Instagram", href: "https://www.instagram.com/prairiecricketfarms/" },
];

const BOTTOM_LINKS = [
  { label: "Terms & Conditions of Sale", href: "/contact" },
  { label: "Terms of Use", href: "/contact" },
  { label: "Privacy Policy", href: "/contact" },
  { label: "Cookies", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* ── Link columns ──────────────────────────────────── */}
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Our Shop</h3>
            <ul className={styles.list}>
              {footerNav.shop.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Explore</h3>
            <ul className={styles.list}>
              {footerNav.explore.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>My Account</h3>
            <ul className={styles.list}>
              {footerNav.account.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Social</h3>
            <ul className={styles.list}>
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────── */}
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p className={styles.shipping}>
              Shipping to: <span className={styles.shippingCountry}>Canada</span>
            </p>

            <p className={styles.legal}>
              &copy; {new Date().getFullYear()} Prairie Cricket Farms. All Rights Reserved.
              <br />
              100% finely milled roasted crickets. Sustainably farmed in Manitoba, Canada.
            </p>

            <div className={styles.bottomLinks}>
              {BOTTOM_LINKS.map((item) => (
                <Link key={item.label} href={item.href} className={styles.bottomLink}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
