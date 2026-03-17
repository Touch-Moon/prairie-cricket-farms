"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { Product } from "@/types";
import styles from "./ProductHero.module.scss";
import StickyCartBar from "./StickyCartBar";
import { useCart } from "@/context/CartContext";

interface ProductHeroProps {
  product: Product;
}

// Reference: absolutecollagen.com benefits-grid-wrapper 4 types of icons
const TRUST_ITEMS = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" stroke="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.75 1C10.9926 1 12 2.00736 12 3.25C12 3.71254 11.8604 4.14247 11.6211 4.5H14V9H13V14H3V9H2V4.5H4.37891C4.13958 4.14247 4 3.71254 4 3.25C4 2.00736 5.00736 1 6.25 1C6.95689 1 7.58751 1.32609 8 1.83594C8.41249 1.32609 9.04311 1 9.75 1ZM8.7002 12.5996H11.5996V9.40039H8.7002V12.5996ZM4.40039 12.5996H7.2998V9.40039H4.40039V12.5996ZM8.7002 7.59961H12.5996V5.90039H8.7002V7.59961ZM3.40039 7.59961H7.2998V5.90039H3.40039V7.59961ZM6.25 2.40039C5.78056 2.40039 5.40039 2.78056 5.40039 3.25C5.40039 3.71944 5.78056 4.09961 6.25 4.09961H7.09961V3.25C7.09961 2.78056 6.71944 2.40039 6.25 2.40039ZM9.75 2.40039C9.28056 2.40039 8.90039 2.78056 8.90039 3.25V4.09961H9.75C10.2194 4.09961 10.5996 3.71944 10.5996 3.25C10.5996 2.78056 10.2194 2.40039 9.75 2.40039Z" />
      </svg>
    ),
    label: "Save when you subscribe",
    sub: "",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" stroke="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.4326 6.44922L14.5674 7.55078L13.2002 6.47656V14.2246H2.7998V6.47656L1.43262 7.55078L0.567383 6.44922L8 0.609375L15.4326 6.44922ZM4.2002 5.37598V12.8252H11.7998V5.37598L8 2.3916L4.2002 5.37598Z" />
      </svg>
    ),
    label: "Free shipping",
    sub: "on orders over $50 CAD",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" stroke="none">
        <path d="M11.4639 6.21191L6.90332 10.7734L4.28613 8.15723L5.27637 7.16699L6.90332 8.79395L10.4736 5.22266L11.4639 6.21191Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1ZM8 2.40039C4.90721 2.40039 2.40039 4.90721 2.40039 8C2.40039 11.0928 4.90721 13.5996 8 13.5996C11.0928 13.5996 13.5996 11.0928 13.5996 8C13.5996 4.90721 11.0928 2.40039 8 2.40039Z" />
      </svg>
    ),
    label: "Satisfaction guarantee",
    sub: "",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" stroke="none">
        <path d="M7 13H5V3H7V13Z" />
        <path d="M11 13H9V3H11V13Z" />
      </svg>
    ),
    label: "Pause anytime",
    sub: "no commitment required",
  },
];

export default function ProductHero({ product }: ProductHeroProps) {
  const { addItem } = useCart();

  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [added, setAdded] = useState(false);
  const [atcError, setAtcError] = useState(false);
  const [activeVariant, setActiveVariant] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Sync with Lenis + GSAP ticker: check position every frame with RAF loop
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const hero = heroRef.current;
      if (hero) {
        setBarVisible(hero.getBoundingClientRect().bottom < window.innerHeight);
      }
      // sticky-reveal is position:sticky so getBoundingClientRect always inside viewport
      // instead check when white content sibling before sticky-reveal passes viewport bottom
      const stickyReveal = document.querySelector(".sticky-reveal");
      const contentAbove = stickyReveal?.previousElementSibling;
      if (contentAbove) {
        setFooterVisible(contentAbove.getBoundingClientRect().bottom < window.innerHeight);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const currentVariant = product.variants?.[activeVariant];
  const displayPrice = currentVariant?.price ?? product.price;

  // Calculate save %
  const savePercent =
    product.compareAtPrice
      ? Math.round(
          (1 - parseFloat(displayPrice) / parseFloat(product.compareAtPrice)) * 100
        )
      : null;

  const handleAddToCart = async () => {
    const currentVariantData = product.variants?.[activeVariant];
    const shopifyVariantId = currentVariantData?.shopifyVariantId;

    if (!shopifyVariantId) {
      // No Shopify variant ID - cart unavailable (product not registered)
      setAtcError(true);
      setTimeout(() => setAtcError(false), 3000);
      return;
    }

    await addItem(shopifyVariantId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.productHeroContent}>

        {/* ── LEFT: sticky image slider panel ─────────────────── */}
        <div className={styles.imagePanel}>

          <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
            {allImages.map((src, i) => (
              <div key={i} className={`keen-slider__slide ${styles.slide}`}>
                <Image
                  src={src}
                  alt={`${product.title} – image ${i + 1}`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className={styles.heroSlideImage}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Diamond dots */}
          {allImages.length > 1 && (
            <div className={styles.dots}>
              {allImages.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === currentSlide ? styles.dotActive : ""}`}
                  onClick={() => instanceRef.current?.moveToIdx(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}

        </div>

        {/* ── RIGHT: scrollable info panel ───────────────────── */}
        <div className={styles.infoPanel}>
          <div className={styles.infoPanelInner}>

            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/shop" className={styles.breadcrumbLink}>Our Shop</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>{product.title}</span>
            </nav>

            {/* Badge */}
            {product.badge && (
              <span className={styles.productBadge}>{product.badge}</span>
            )}

            {/* Title */}
            <h1 className={styles.productTitle}>{product.title}</h1>

            {/* Rating */}
            <div className={styles.rating}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="10.5"
                    height="10.5"
                    viewBox="0 0 16 16"
                    fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M8 1l1.9 4.1 4.5.4-3.3 3 1 4.4-4.1-2.4-4.1 2.4 1-4.4-3.3-3 4.5-.4z" />
                  </svg>
                ))}
              </div>
              <span className={styles.ratingScore}>{product.rating}</span>
              <span className={styles.reviewCount}>({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className={styles.priceBlock}>
              <div className={styles.priceRow}>
                {product.compareAtPrice && (
                  <span className={styles.comparePrice}>${product.compareAtPrice} CAD</span>
                )}
                <span className={styles.price}>${displayPrice} CAD</span>
              </div>
              {savePercent && (
                <p className={styles.saveText}>Save {savePercent}%</p>
              )}
            </div>

            {/* Description */}
            <p className={styles.description}>{product.description}</p>

            {/* Benefits - ✦ bullet */}
            {product.benefits && product.benefits.length > 0 && (
              <ul className={styles.benefits}>
                {product.benefits.map((b, i) => (
                  <li key={i} className={styles.benefitItem}>
                    <span className={styles.benefitBullet}>✦</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Trust icons */}
            <div className={styles.trustRow}>
              {TRUST_ITEMS.map((t, i) => (
                <div key={i} className={styles.trustItem}>
                  <span className={styles.trustIcon}>{t.icon}</span>
                  <span className={styles.trustLabel}>{t.label}</span>
                  {t.sub && <span className={styles.trustSub}>{t.sub}</span>}
                </div>
              ))}
            </div>

            {/* Variant / size selector */}
            {product.variants && product.variants.length > 0 && (
              <div className={styles.variantSection}>
                <p className={styles.variantLabel}>Select Size</p>
                <div className={styles.variantGrid}>
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      className={`${styles.variantCard} ${i === activeVariant ? styles.variantActive : ""}`}
                      onClick={() => setActiveVariant(i)}
                    >
                      <div className={`${styles.variantRadio} ${i === activeVariant ? styles.variantRadioActive : ""}`} />
                      <div className={styles.variantInfo}>
                        <div className={styles.variantNameRow}>
                          <span className={styles.variantName}>{v.label}</span>
                          {v.badge && <span className={styles.variantBadge}>{v.badge}</span>}
                        </div>
                        <span className={styles.variantSize}>{v.size}</span>
                      </div>
                      <span className={styles.variantPrice}>${v.price} CAD</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div ref={ctaRef} className={styles.ctaSection}>
              <button
                className={`${styles.addToCart} ${added ? styles.addedToCart : ""}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ Added to cart!" : "Add to cart"}
              </button>
              {atcError && (
                <p className={styles.atcError}>
                  This product is not yet available for purchase.
                </p>
              )}
              <p className={styles.shippingNote}>
                Free shipping on orders over $50 CAD
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Sticky bottom cart bar ───────────────────────── */}
      <StickyCartBar
        visible={barVisible && !footerVisible}
        image={allImages[0]}
        title={product.title}
        variantLabel={
          currentVariant
            ? `${currentVariant.label}${currentVariant.size ? ` · ${currentVariant.size}` : ""}`
            : undefined
        }
        price={displayPrice}
        added={added}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}
