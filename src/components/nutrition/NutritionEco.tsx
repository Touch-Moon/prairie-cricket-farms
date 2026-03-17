"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef } from "react";
import type { KeenSliderInstance } from "keen-slider";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./NutritionEco.module.scss";

const CARDS: { img: string; alt: string; title: string; copy: string }[] = [
  {
    img: "/images/eco/eco-land.jpg",
    alt: "Red barn in prairie landscape",
    title: "Less Land",
    copy: "Facts: Thanks to their size, cricket protein takes 13x less land for protein production than whey-based proteins.",
  },
  {
    img: "/images/eco/eco-energy.jpg",
    alt: "Vintage windmill in a green field",
    title: "Less Energy",
    copy: "Facts: Crickets are cold blooded. When they take in food they don't use any of the energy to heat their body; it's all transitioned into protein.",
  },
  {
    img: "/images/eco/eco-food.jpg",
    alt: "Hands holding golden wheat bundle",
    title: "Less Food",
    copy: "Facts: Crickets require 12x less food than beef, 4x less than pork and 2x less than poultry for the same weight yield.",
  },
  {
    img: "/images/eco/eco-water.jpg",
    alt: "Weathered wooden bucket outdoors",
    title: "Less Water",
    copy: "Facts: Crickets require approximately 2000x less water to produce the same amount of traditional beef protein and 100x less than plant sources \u2013 and that\u2019s not even considering water for feed production.",
  },
];

const TOTAL = CARDS.length;

export default function NutritionEco() {
  const [slide, setSlide] = useState(0);
  const [maxIdx, setMaxIdx] = useState(TOTAL - 1);
  const [thumbW, setThumbW] = useState(1 / TOTAL);
  const [loaded, setLoaded] = useState(false);
  const isDragging = useRef(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
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
  });

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
        <h2 className={styles.heading}>Crickets Require&hellip;</h2>
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
            <span className={styles.arrowMask} aria-hidden><ChevronLeft size={18} strokeWidth={2.5} /></span>
            <span className={styles.arrowIcon}><ChevronLeft size={18} strokeWidth={2.5} /></span>
          </div>
        </button>

        <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
          {CARDS.map((card) => (
            <div key={card.title} className={`keen-slider__slide ${styles.slide}`}>
              <div className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 85vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{card.title}</h3>
                  <p className={styles.copy}>{card.copy}</p>
                </div>
              </div>
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
            <span className={styles.arrowMask} aria-hidden><ChevronRight size={18} strokeWidth={2.5} /></span>
            <span className={styles.arrowIcon}><ChevronRight size={18} strokeWidth={2.5} /></span>
          </div>
        </button>
      </div>

      {/* Indicator bar */}
      <div className={styles.indicatorWrap}>
        <div className={styles.track}>
          <div className={styles.thumb} style={{ width: `${thumbW * 100}%`, left: `${thumbLeft}%` }} />
        </div>
      </div>
    </section>
  );
}
