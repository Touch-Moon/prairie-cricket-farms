"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef } from "react";
import type { KeenSliderInstance } from "keen-slider";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import styles from "./ProductCarousel.module.scss";

// ── Star Rating ───────────────────────────────────────────────
function StarFull() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden>
      <path d="M6.5 0.5L7.99 4.47L12.19 4.79L9.05 7.47L10.04 11.56L6.5 9.37L2.96 11.56L3.95 7.47L0.81 4.79L5.01 4.47L6.5 0.5Z" />
    </svg>
  );
}

// id determined by call location (productIdx + starIdx) - SSR/Client match
function StarHalf({ uid }: { uid: string }) {
  const id = `hg-${uid}`;
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id}>
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M6.5 0.5L7.99 4.47L12.19 4.79L9.05 7.47L10.04 11.56L6.5 9.37L2.96 11.56L3.95 7.47L0.81 4.79L5.01 4.47L6.5 0.5Z"
        fill={`url(#${id})`}
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function StarEmpty() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path
        d="M6.5 0.5L7.99 4.47L12.19 4.79L9.05 7.47L10.04 11.56L6.5 9.37L2.96 11.56L3.95 7.47L0.81 4.79L5.01 4.47L6.5 0.5Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function StarRating({ rating, uid }: { rating: number; uid: string }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => {
        const val = i + 1;
        if (rating >= val) return <StarFull key={i} />;
        if (rating >= val - 0.5) return <StarHalf key={i} uid={`${uid}-${i}`} />;
        return <StarEmpty key={i} />;
      })}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────
const ITEMS = products.filter((p) => p.available).slice(0, 5);
const TOTAL = ITEMS.length;

// ── Component ─────────────────────────────────────────────────
export default function ProductCarousel() {
  const [slide, setSlide] = useState(0);
  const [maxIdx, setMaxIdx] = useState(TOTAL - 1);
  const [thumbW, setThumbW] = useState(1 / TOTAL);
  const [loaded, setLoaded] = useState(false);
  const isDragging = useRef(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      mode: "snap",
      rubberband: false,
      drag: true,
      slides: { perView: 1.2, spacing: 12 },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 20 },
        },
      },
      dragStarted() {
        isDragging.current = true;
      },
      dragEnded() {
        isDragging.current = false;
      },
      created(s) {
        sync(s);
        setLoaded(true);
      },
      updated(s) {
        sync(s);
      },
      slideChanged(s) {
        setSlide(s.track.details.rel);
      },
    }
  );

  function sync(s: KeenSliderInstance) {
    const details = s.track.details;
    if (!details) return;
    const mi = details.maxIdx ?? TOTAL - 1;
    setMaxIdx(mi);
    // thumbW = 보이는 슬라이드 수 / 전체 (maxIdx 로 근사)
    setThumbW((TOTAL - mi) / TOTAL);
    setSlide(details.rel ?? 0);
  }

  // ── Indicator geometry ──────────────────────────────────────
  const thumbLeft = maxIdx > 0 ? (slide / maxIdx) * (1 - thumbW) * 100 : 0;

  // ── Arrows visibility ───────────────────────────────────────
  const showPrev = loaded && slide > 0;
  const showNext = loaded && slide < maxIdx;

  const prev = () => instanceRef.current?.prev();
  const next = () => instanceRef.current?.next();

  return (
    <section className={styles.carouselSection}>
      {/* Header */}
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselHeading}>Bestsellers</h2>
      </div>

      {/* Slider area — full bleed */}
      <div className={styles.sliderArea}>
        {/* Prev arrow */}
        <button
          className={`${styles.arrow} ${styles.arrowLeft} ${showPrev ? styles.arrowVisible : ""}`}
          onClick={prev}
          aria-label="Previous"
          tabIndex={showPrev ? 0 : -1}
        >
          <div className={styles.arrowInner}>
            <span className={styles.arrowMask} aria-hidden="true">
              <ChevronLeft size={18} strokeWidth={2.5} />
            </span>
            <span className={styles.arrowIcon}>
              <ChevronLeft size={18} strokeWidth={2.5} />
            </span>
          </div>
        </button>

        {/* keen-slider */}
        <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
          {ITEMS.map((product) => (
            <div
              key={product.id}
              className={`keen-slider__slide ${styles.slide}`}
            >
              <Link
                href={`/products/${product.handle}`}
                className={styles.carouselCard}
                // prevent navigation on drag
                onClick={(e) => {
                  if (isDragging.current) e.preventDefault();
                }}
                draggable={false}
              >
                {/* Image */}
                <div className={styles.carouselImageWrap}>
                  <div className={`${styles.carouselImageLayer} ${styles.carouselImageDefault}`}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 1023px) 85vw, (max-width: 1440px) 33vw, 30vw"
                      className={styles.carouselImage}
                      draggable={false}
                    />
                  </div>
                  {/* Hover image */}
                  <div className={`${styles.carouselImageLayer} ${styles.carouselImageHover}`}>
                    <Image
                      src={product.hoverImage ?? product.image}
                      alt=""
                      fill
                      sizes="(max-width: 1023px) 85vw, (max-width: 1440px) 33vw, 30vw"
                      className={styles.carouselImage}
                      draggable={false}
                    />
                  </div>
                  {/* Badge */}
                  {product.badge && (
                    <span className={styles.carouselBadge}>{product.badge}</span>
                  )}
                </div>

                {/* Content */}
                <div className={styles.carouselCardContent}>
                  <h3 className={styles.carouselCardTitle}>{product.title}</h3>
                  <div className={styles.price}>
                    {product.compareAtPrice ? (
                      <>
                        From <s className={styles.was}>£{product.compareAtPrice}</s>{" "}
                        £{product.price}
                      </>
                    ) : (
                      <>From £{product.price}</>
                    )}
                  </div>
                  <div className={styles.reviews}>
                    <StarRating rating={product.rating} uid={`p${product.id}`} />
                    <span className={styles.count}>
                      ({product.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Next arrow */}
        <button
          className={`${styles.arrow} ${styles.arrowRight} ${showNext ? styles.arrowVisible : ""}`}
          onClick={next}
          aria-label="Next"
          tabIndex={showNext ? 0 : -1}
        >
          <div className={styles.arrowInner}>
            <span className={styles.arrowMask} aria-hidden="true">
              <ChevronRight size={18} strokeWidth={2.5} />
            </span>
            <span className={styles.arrowIcon}>
              <ChevronRight size={18} strokeWidth={2.5} />
            </span>
          </div>
        </button>
      </div>

      {/* Indicator bar */}
      <div className={styles.indicatorWrap}>
        <div className={styles.track}>
          <div
            className={styles.thumb}
            style={{
              width: `${thumbW * 100}%`,
              left: `${thumbLeft}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
