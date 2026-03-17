"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/shared/Button";
import styles from "./HeroBanner.module.scss";

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const initGsap = async () => {
      // prefers-reduced-motion: skip animation, show element immediately
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        const els = [
          styles.heroRating,
          styles.heroHeading,
          styles.heroDescription,
          styles.heroButtonContainer,
        ];
        els.forEach((cls) => {
          const el = sectionRef.current?.querySelector(`.${cls}`) as HTMLElement | null;
          if (el) { el.style.opacity = "1"; el.style.transform = "none"; }
        });
        return;
      }

      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── Entry animations ──
        const tl = gsap.timeline({ delay: 0.1 });

        tl.fromTo(
          `.${styles.heroRating}`,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
        )
          .fromTo(
            `.${styles.heroHeading}`,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
            "-=0.25"
          )
          .fromTo(
            `.${styles.heroDescription}`,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(
            `.${styles.heroButtonContainer}`,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            "-=0.3"
          );

        // Desktop sticky scroll is handled by CSS position: sticky
      }, sectionRef);
    };

    initGsap();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Right: Product image (order: 2 on desktop) */}
      <div className={styles.heroMedia}>
        <figure className={styles.mediaWrapper}>
          <Image
            src="/images/hero/pcf-hero-main.jpg"
            alt="Prairie Cricket Farms — Sustainable Cricket Protein"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={styles.heroImage}
          />
        </figure>
      </div>

      {/* Left: Green content panel (order: 1 on desktop) */}
      <div ref={innerRef} className={styles.heroInner}>
        <div className={styles.heroContent} ref={contentRef}>
          {/* Rating */}
          <div className={styles.heroRating}>
            <div className={styles.heroRatingStars} aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 12 12">
                  <path
                    d="M6 0l1.5 4.6H12L8.1 7.5l1.5 4.5L6 9.3l-3.6 2.7 1.5-4.5L0 4.6h4.5L6 0z"
                    fill="currentColor"
                  />
                </svg>
              ))}
            </div>
            <p className={styles.heroRatingText}>1,000+ Happy Customers</p>
          </div>

          {/* Heading */}
          <h1 className={styles.heroHeading}>
            Pure Protein,
            <br />
            Sustainably
            <br />
            Raised
          </h1>

          {/* Description */}
          <p className={styles.heroDescription}>
            Premium cricket-based protein powder. Nutritious, sustainable, and delicious.
          </p>

          {/* CTAs */}
          <div className={styles.heroButtonContainer}>
            <Button href="/shop" label="Shop Products" />
            <Button href="/about" label="Our Story" variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
