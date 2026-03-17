"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { KeenSliderInstance } from "keen-slider";
import type { Product } from "@/types";
import styles from "./RelatedProducts.module.scss";

interface RelatedProductsProps {
  products: Product[];
}

// ── Stars ─────────────────────────────────────────────────────
function StarFull() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" aria-hidden>
      <path d="M6.5 0.5L7.99 4.47L12.19 4.79L9.05 7.47L10.04 11.56L6.5 9.37L2.96 11.56L3.95 7.47L0.81 4.79L5.01 4.47L6.5 0.5Z" />
    </svg>
  );
}
function StarHalf({ uid }: { uid: string }) {
  const id = `rp-${uid}`;
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id}>
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d="M6.5 0.5L7.99 4.47L12.19 4.79L9.05 7.47L10.04 11.56L6.5 9.37L2.96 11.56L3.95 7.47L0.81 4.79L5.01 4.47L6.5 0.5Z"
        fill={`url(#${id})`} stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}
function StarEmpty() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M6.5 0.5L7.99 4.47L12.19 4.79L9.05 7.47L10.04 11.56L6.5 9.37L2.96 11.56L3.95 7.47L0.81 4.79L5.01 4.47L6.5 0.5Z"
        stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}
function StarRating({ rating, uid }: { rating: number; uid: string }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => {
        const v = i + 1;
        if (rating >= v) return <StarFull key={i} />;
        if (rating >= v - 0.5) return <StarHalf key={i} uid={`${uid}-${i}`} />;
        return <StarEmpty key={i} />;
      })}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────
export default function RelatedProducts({ products }: RelatedProductsProps) {
  const TOTAL = products.length;

  const [slide, setSlide] = useState(0);
  const [maxIdx, setMaxIdx] = useState(Math.max(TOTAL - 1, 0));
  const [thumbW, setThumbW] = useState(TOTAL > 0 ? 1 / TOTAL : 1);
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
      dragStarted() { isDragging.current = true; },
      dragEnded()   { isDragging.current = false; },
      created(s)    { sync(s); setLoaded(true); },
      updated(s)    { sync(s); },
      slideChanged(s) { setSlide(s.track.details.rel); },
    }
  );

  if (products.length === 0) return null;

  function sync(s: KeenSliderInstance) {
    const details = s.track.details;
    if (!details) return;
    const mi = details.maxIdx ?? TOTAL - 1;
    setMaxIdx(mi);
    setThumbW((TOTAL - mi) / TOTAL);
    setSlide(details.rel ?? 0);
  }

  const thumbLeft = maxIdx > 0 ? (slide / maxIdx) * (1 - thumbW) * 100 : 0;
  const showPrev  = loaded && slide > 0;
  const showNext  = loaded && slide < maxIdx;

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>You May Also Like</h2>
        <Link href="/shop" className={styles.viewAll}>View all</Link>
      </div>

      {/* Slider */}
      <div className={styles.sliderArea}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft} ${showPrev ? styles.arrowVisible : ""}`}
          onClick={() => instanceRef.current?.prev()}
          aria-label="Previous"
          tabIndex={showPrev ? 0 : -1}
        >
          <div className={styles.arrowInner}>
            <span className={styles.arrowMask} aria-hidden="true"><ChevronLeft size={18} strokeWidth={2.5} /></span>
            <span className={styles.arrowIcon}><ChevronLeft size={18} strokeWidth={2.5} /></span>
          </div>
        </button>

        <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
          {products.map((product) => (
            <div key={product.id} className={`keen-slider__slide ${styles.slide}`}>
              <Link
                href={`/products/${product.handle}`}
                className={styles.card}
                onClick={(e) => { if (isDragging.current) e.preventDefault(); }}
                draggable={false}
              >
                <div className={styles.imageWrap}>
                  <div className={`${styles.imgLayer} ${styles.imgDefault}`}>
                    <Image src={product.image} alt={product.title} fill
                      sizes="(max-width: 1023px) 85vw, 33vw" className={styles.img} draggable={false} />
                  </div>
                  <div className={`${styles.imgLayer} ${styles.imgHover}`}>
                    <Image src={product.hoverImage ?? product.image} alt="" fill
                      sizes="(max-width: 1023px) 85vw, 33vw" className={styles.img} draggable={false} />
                  </div>
                  {product.badge && <span className={styles.badge}>{product.badge}</span>}
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{product.title}</h3>
                  <div className={styles.price}>
                    {product.compareAtPrice
                      ? <>From <s className={styles.was}>${product.compareAtPrice}</s> ${product.price}</>
                      : <>From ${product.price}</>}
                  </div>
                  <div className={styles.reviews}>
                    <StarRating rating={product.rating} uid={`rp${product.id}`} />
                    <span className={styles.count}>({product.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight} ${showNext ? styles.arrowVisible : ""}`}
          onClick={() => instanceRef.current?.next()}
          aria-label="Next"
          tabIndex={showNext ? 0 : -1}
        >
          <div className={styles.arrowInner}>
            <span className={styles.arrowMask} aria-hidden="true"><ChevronRight size={18} strokeWidth={2.5} /></span>
            <span className={styles.arrowIcon}><ChevronRight size={18} strokeWidth={2.5} /></span>
          </div>
        </button>
      </div>

      {/* Indicator */}
      <div className={styles.indicatorWrap}>
        <div className={styles.track}>
          <div className={styles.thumb} style={{ width: `${thumbW * 100}%`, left: `${thumbLeft}%` }} />
        </div>
      </div>
    </section>
  );
}
