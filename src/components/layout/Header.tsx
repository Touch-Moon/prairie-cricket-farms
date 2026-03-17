"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { mainNav, mobileQuickNav, announcements } from "@/data/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import AccountDrawer from "@/components/account/AccountDrawer";
import styles from "./Header.module.scss";

export default function Header() {
  useAuth();
  const { totalCount, openCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const accountLabel = "Account";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasBeenToggled, setHasBeenToggled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeMenuRef = useRef<string | null>(null);
  const isTransitioningRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Restore hidden Nav when mouse enters top
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHidden) return;
      const headerHeight = headerRef.current?.offsetHeight ?? 80;
      if (e.clientY <= headerHeight) {
        setIsHidden(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHidden]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      // Do not hide if mobile menu / mega menu / hovering
      if (mobileOpen || activeMenuRef.current || isHoveredRef.current) return;

      const currentY = window.scrollY;
      const diff = currentY - lastScrollYRef.current;

      // Always visible near top (within 100px)
      if (currentY < 100) {
        setIsHidden(false);
      } else if (diff > 4) {
        // Scroll down
        setIsHidden(true);
      } else if (diff < -4) {
        // Scroll up
        setIsHidden(false);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // Announcement rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Toggle html.megamenu-open when mega menu opens - blur applied to main/footer in globals.scss
  useEffect(() => {
    if (activeMenu) {
      document.documentElement.classList.add("megamenu-open");
    } else {
      document.documentElement.classList.remove("megamenu-open");
    }
    return () => {
      document.documentElement.classList.remove("megamenu-open");
    };
  }, [activeMenu]);

  const handleMenuEnter = useCallback((label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Switch between different menus - instant (no curtain)
    // Same menu or first open - curtain effect
    isTransitioningRef.current =
      !!activeMenuRef.current && activeMenuRef.current !== label;
    activeMenuRef.current = label;
    setActiveMenu(label);
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      activeMenuRef.current = null;
      isTransitioningRef.current = false;
      setActiveMenu(null);
    }, 80);
  }, []);

  const toggleMobile = () => {
    if (mobileOpen) {
      setHasBeenToggled(true);
    }
    setMobileOpen(!mobileOpen);
    setMobileSubmenu(null);
  };

  // Determine hamburger class
  const hamburgerClass = [
    styles.hamburger,
    mobileOpen ? styles.hamburgerOpen : "",
    !mobileOpen && hasBeenToggled ? styles.hamburgerClosing : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
    <header
      ref={headerRef}
      className={`${styles.header} ${isHidden ? styles.headerHidden : ""}`}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        setIsHidden(false);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* ── Announcement Bar ─────────────────────────────── */}
      <div className={styles.alertBar}>
        <div className={styles.alertBarInner}>
          {announcements.map((msg, i) => (
            <span
              key={i}
              className={`${styles.alertText} ${
                i === currentAnnouncement ? styles.alertActive : ""
              }`}
            >
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* ── Overlay (for mega menu) ────────────────────────── */}
      <div
        className={`${styles.overlay} ${activeMenu ? styles.overlayVisible : ""}`}
        onClick={() => setActiveMenu(null)}
      />

      {/* ── Main Header Bar ──────────────────────────────── */}
      <div className={styles.headerContainer}>
        <div className={styles.headerInner}>
          {/* Left: Nav */}
          <nav aria-label="Primary" className={styles.nav}>
            {/* Mobile hamburger */}
            <button
              className={hamburgerClass}
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <div className={styles.hamburgerInner}>
                <span className={styles.hamburgerLineTop} />
                <span className={styles.hamburgerLineBottom} />
              </div>
            </button>

            {/* Desktop nav list */}
            <ul className={styles.navList}>
              {/* eslint-disable-next-line react-hooks/refs */}
              {mainNav.filter((item) => !item.mobileOnly).map((item) => (
                <li
                  key={item.label}
                  className={`${styles.navItem} ${
                    item.children ? styles.hasMenu : ""
                  } ${activeMenu === item.label ? styles.isOpen : ""}`}
                  onMouseEnter={() =>
                    item.children ? handleMenuEnter(item.label) : undefined
                  }
                  onMouseLeave={item.children ? handleMenuLeave : undefined}
                >
                  {item.children ? (
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      aria-expanded={activeMenu === item.label}
                    >
                      <span className={styles.navLinkText}>
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <Link href={item.href} className={styles.navLink}>
                      <span className={styles.navLinkText}>
                        {item.label}
                      </span>
                    </Link>
                  )}

                  {/* Desktop dropdown — mega menu or simple list */}
                  {(item.megaMenu || item.children) && (
                    <div
                      className={`${styles.megaMenu} ${
                        activeMenu === item.label ? styles.megaMenuOpen : ""
                      } ${
                        isTransitioningRef.current
                          ? styles.megaMenuInstant
                          : ""
                      }`}
                      onMouseEnter={() => handleMenuEnter(item.label)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className={styles.megaMenuInner}>
                        {item.megaMenu ? (
                          /* ── Community: left column + image cards ── */
                          item.megaMenu.cards ? (
                            <div className={styles.megaCommunity}>
                              {/* Left: simple link column */}
                              <div className={styles.megaCommunityLeft}>
                                {item.megaMenu.columns[0]?.groups.map((group, gIdx) => (
                                  <div key={gIdx} className={styles.megaGroup}>
                                    {group.heading && (
                                      <h3 className={styles.megaGroupHeading}>
                                        {group.heading}
                                      </h3>
                                    )}
                                    <ul className={styles.megaGroupList}>
                                      {group.items.map((link) => (
                                        <li key={link.label}>
                                          <Link
                                            href={link.href}
                                            className={styles.megaMenuLink}
                                            onClick={() => setActiveMenu(null)}
                                          >
                                            {link.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              {/* Right: image cards */}
                              <div className={styles.megaCards}>
                                {item.megaMenu.cards.map((card) => (
                                  <Link
                                    key={card.href}
                                    href={card.href}
                                    className={styles.megaCard}
                                    onClick={() => setActiveMenu(null)}
                                  >
                                    <div className={styles.megaCardImage}>
                                      <Image
                                        src={card.image}
                                        alt={card.alt}
                                        fill
                                        sizes="33vw"
                                        className={styles.megaCardImg}
                                      />
                                    </div>
                                    <span className={styles.megaCardTitle}>
                                      {card.title}
                                    </span>
                                    <span className={styles.megaCardCta}>
                                      {card.cta}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                          /* ── Multi-column mega menu (Shop / Why Us) ── */
                          <div className={styles.megaColumns}>
                            {item.megaMenu.columns.map((col, colIdx) => (
                              <div key={colIdx} className={styles.megaColumn}>
                                {col.groups.map((group, gIdx) => (
                                  <div key={gIdx} className={styles.megaGroup}>
                                    {group.heading && (
                                      <h3 className={styles.megaGroupHeading}>
                                        {group.heading}
                                      </h3>
                                    )}
                                    <ul className={styles.megaGroupList}>
                                      {group.items.map((link) => (
                                        <li key={link.label}>
                                          <Link
                                            href={link.href}
                                            className={styles.megaMenuLink}
                                            onClick={() => setActiveMenu(null)}
                                          >
                                            {link.label}
                                            {link.badge && (
                                              <span
                                                className={`${styles.megaBadge} ${
                                                  link.badge === "bestseller"
                                                    ? styles.megaBadgeBestseller
                                                    : link.badge === "new"
                                                    ? styles.megaBadgeNew
                                                    : styles.megaBadgeSale
                                                }`}
                                              >
                                                {link.badgeText ||
                                                  (link.badge === "bestseller"
                                                    ? "BESTSELLER"
                                                    : "NEW")}
                                              </span>
                                            )}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            ))}

                            {/* Promo cards */}
                            {item.megaMenu.promos?.map((promo, pIdx) => (
                              <div key={pIdx} className={styles.megaPromo}>
                                <Link
                                  href={promo.href}
                                  className={styles.megaPromoLink}
                                  onClick={() => setActiveMenu(null)}
                                >
                                  <div className={styles.megaPromoImage}>
                                    <Image
                                      src={promo.image}
                                      alt={promo.alt}
                                      fill
                                      sizes="280px"
                                      className={styles.megaPromoImg}
                                    />
                                  </div>
                                  <span className={styles.megaPromoTitle}>
                                    {promo.title}
                                  </span>
                                  <span className={styles.megaPromoSubtitle}>
                                    {promo.subtitle}
                                  </span>
                                </Link>
                              </div>
                            ))}
                          </div>
                          )
                        ) : (
                          /* ── Simple list (Why Us, Community) ── */
                          <ul className={styles.megaMenuList}>
                            {item.children!.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className={styles.megaMenuLink}
                                  onClick={() => setActiveMenu(null)}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Center: Logo */}
          <Link href="/" className={styles.logo} aria-label="Go to Homepage">
            <span className={styles.logoText}>Prairie Cricket Farms</span>
          </Link>

          {/* Right: Actions */}
          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              aria-label={accountLabel}
              onClick={() => setAccountDrawerOpen(true)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <circle cx="8" cy="5" r="3" />
                <path d="M2 15c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5" />
              </svg>
              <span className={styles.iconBtnLabel}>
                {accountLabel}
              </span>
            </button>
            <button
              className={styles.iconBtn}
              aria-label={`Cart (${mounted ? totalCount : 0} items)`}
              onClick={openCart}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M3.5 4.5h11l-1.2 7H4.7L3.5 4.5z" />
                <path d="M3.5 4.5L2.5 2" />
                <circle cx="6" cy="14" r="0.8" fill="currentColor" stroke="none" />
                <circle cx="11.5" cy="14" r="0.8" fill="currentColor" stroke="none" />
              </svg>
              <span className={styles.iconBtnLabel}>
                Bag <span className={styles.cartCount}>({mounted ? totalCount : 0})</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Quick Nav (sub-bar) ──────────────────── */}
      <nav className={styles.quickNav} aria-label="Quick navigation">
        <ul className={styles.quickNavList}>
          {mobileQuickNav.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={styles.quickNavLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────────── */}
      <div
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuInner}>
          <ul className={styles.mobileNavList}>
            {mainNav.map((item) => (
              <li key={item.label} className={styles.mobileNavItem}>
                {item.children ? (
                  <>
                    <button
                      className={styles.mobileNavLink}
                      onClick={() =>
                        setMobileSubmenu(
                          mobileSubmenu === item.label ? null : item.label
                        )
                      }
                      aria-expanded={mobileSubmenu === item.label}
                    >
                      <span>{item.label}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`${styles.chevron} ${
                          mobileSubmenu === item.label
                            ? styles.chevronOpen
                            : ""
                        }`}
                      >
                        <path
                          d="M11.49 8L6.4 13.09L5.41 12.1L9.51 8L5.41 3.9L6.4 2.91L11.49 8Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <ul
                      className={`${styles.mobileSubmenu} ${
                        mobileSubmenu === item.label
                          ? styles.mobileSubmenuOpen
                          : ""
                      }`}
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className={styles.mobileSubmenuLink}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile bottom links */}
          <div className={styles.mobileBottomLinks}>
            <button
              className={styles.mobileBottomLink}
              onClick={() => { setMobileOpen(false); setAccountDrawerOpen(true); }}
            >
              {accountLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>

    {/* Account Drawer (portal → document.body) */}
    <AccountDrawer
      isOpen={accountDrawerOpen}
      onClose={() => setAccountDrawerOpen(false)}
    />
    </>
  );
}
