"use client";

import { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { KeenSliderInstance } from "keen-slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./TestimonialGrid.module.scss";

const TESTIMONIALS = [
  {
    video: "/videos/testimonials/t1-video.mp4",
    poster: "/images/testimonials/t1-poster.jpg",
    name: "Aysha",
    age: 42,
    product: "Protein Powder",
    quote:
      "I love how easy it is to mix and take. I've seen results in my energy levels, but especially my recovery.",
  },
  {
    video: "/videos/testimonials/t2-video.mp4",
    poster: "/images/testimonials/t2-poster.jpg",
    name: "Lara",
    age: 49,
    product: "Protein Powder & Bar",
    quote:
      "I've noticed a huge difference in my strength and my stamina. It's perfect in my smoothies — super soluble and completely tasteless.",
  },
  {
    video: "/videos/testimonials/t3-video.mp4",
    poster: "/images/testimonials/t3-poster.jpg",
    name: "Karen",
    age: 51,
    product: "Cricket Flour",
    quote:
      "Another thing I do to help stay fabulous and keep my energy up. I absolutely love it — it tastes really nice!",
  },
  {
    video: "/videos/testimonials/t4-video.mp4",
    poster: "/images/testimonials/t4-poster.jpg",
    name: "Kelly",
    age: 41,
    product: "Protein Powder",
    quote:
      "The taste is totally undetectable when you're putting it into a hot drink or a smoothie, I'm thrilled with the results.",
  },
  {
    video: "/videos/testimonials/t5-video.mp4",
    poster: "/images/testimonials/t5-poster.jpg",
    name: "Anna",
    age: 44,
    product: "Cricket Protein Powder",
    quote:
      "I'm never going to go without this... I've never known such phenomenal results in any product.",
  },
  {
    video: "/videos/testimonials/t6-video.mp4",
    poster: "/images/testimonials/t6-poster.jpg",
    name: "Amanda",
    age: 41,
    product: "Protein Powder",
    quote:
      "It has a neutral flavour and actually smells quite nice. It mixed well and didn't change the taste of my smoothie.",
  },
  {
    video: "/videos/testimonials/t7-video.mp4",
    poster: "/images/testimonials/t7-poster.jpg",
    name: "Nisha",
    age: 44,
    product: "Cricket Protein Powder",
    quote:
      "I like the convenience of it and it's doing me a whole load of good. My energy has been in the best condition.",
  },
];

const TOTAL = TESTIMONIALS.length;

// ── Icons ──────────────────────────────────────────────────────

const MuteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5 15L5 11H1V5H5L9.5 1V15ZM5.92969 6.0459L5.53223 6.40039H2.40039V9.59961H5.53223L5.92969 9.9541L8.09961 11.8828V4.11621L5.92969 6.0459Z"
      fill="currentColor"
    />
    <path
      d="M13.748 4.16699C14.5344 5.24182 15 6.5662 15 8C15 9.4338 14.5344 10.7582 13.748 11.833L12.7432 10.8281C13.2837 10.0187 13.5996 9.04645 13.5996 8C13.5996 6.95325 13.284 5.98045 12.7432 5.1709L13.748 4.16699Z"
      fill="currentColor"
    />
    <path
      d="M12.0303 5.88379C12.331 6.52657 12.5 7.24345 12.5 8C12.5 8.75624 12.3308 9.47266 12.0303 10.1152L10.9482 9.0332C11.0462 8.70587 11.0996 8.35921 11.0996 8C11.0996 7.64046 11.0463 7.29342 10.9482 6.96582L12.0303 5.88379Z"
      fill="currentColor"
    />
  </svg>
);

const UnmuteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3.42969 6.40039H2.40039V9.59961H5.53223L5.92969 9.9541L8.09961 11.8828V11.0703L9.5 12.4707V15L5 11H1V5H2.0293L3.42969 6.40039ZM13.748 4.16699C14.5343 5.24171 14.9999 6.56641 15 8C14.9999 9.15996 14.694 10.2479 14.1611 11.1904L13.1221 10.1514C13.4272 9.49763 13.5996 8.7691 13.5996 8C13.5995 6.95347 13.2838 5.98033 12.7432 5.1709L13.748 4.16699ZM12.0303 5.88379C12.3309 6.52642 12.5 7.24366 12.5 8C12.5 8.46574 12.434 8.91617 12.3145 9.34375L11.0947 8.12402C11.0962 8.08293 11.0996 8.04144 11.0996 8C11.0996 7.64067 11.0462 7.29324 10.9482 6.96582L12.0303 5.88379ZM9.5 6.5293L8.09961 5.12891V4.11621L7.56348 4.59277L6.57227 3.60156L9.5 1V6.5293Z"
      fill="currentColor"
    />
    <path
      d="M14.4951 13.5049L13.5049 14.4951L1.50488 2.49512L2.49512 1.50488L14.4951 13.5049Z"
      fill="currentColor"
    />
  </svg>
);

// ── TestimonialCard ────────────────────────────────────────────

function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className={styles.testimonialCard}>
      {/* Video */}
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          className={styles.video}
          src={item.video}
          muted
          loop
          playsInline
          preload="none"
          poster={item.poster}
        />
        <div className={styles.controls}>
          <button
            className={`${styles.controlBtn} ${styles["controlBtn--play"]}`}
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="5" y="3.5" width="2" height="9" fill="currentColor" />
                <rect x="9" y="3.5" width="2" height="9" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 8L4.5 13V3L13.5 8Z" fill="currentColor" />
              </svg>
            )}
          </button>
          <button
            className={styles.controlBtn}
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <UnmuteIcon /> : <MuteIcon />}
          </button>
        </div>
      </div>

      {/* Text */}
      <div className={styles.testimonialCardBody}>
        <p className={styles.meta}>
          <span className={styles.name}>
            {item.name} — Age {item.age}
          </span>
          <span className={styles.product}>{item.product}</span>
        </p>
        <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
        <div className={styles.stars} aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L9.854 5.678L15 6.243L11.25 9.752L12.472 15L8 12.277L3.528 15L4.75 9.752L1 6.243L6.146 5.678L8 1Z"
                fill="#14171A"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TestimonialGrid ────────────────────────────────────────────

export default function TestimonialGrid() {
  const [slide, setSlide] = useState(0);
  const [maxIdx, setMaxIdx] = useState(TOTAL - 1);
  const [thumbW, setThumbW] = useState(1 / TOTAL);
  const [loaded, setLoaded] = useState(false);
  const isDragging = useRef(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    rubberband: false,
    drag: true,
    // mobile: keen-slider maxIdx = totalSlides - ceil(perView) - 1
    // ghost 2개 추가 → 9 - 2 - 1 = 6, 7번째 카드까지 snap 가능
    // number 명시로 desktop breakpoint number:TOTAL 누출 방지
    slides: { perView: 1.2, spacing: 12, number: TOTAL + 2 },
    breakpoints: {
      // desktop: number:TOTAL 로 ghost 무시 → maxIdx = 7 - 3 = 4, 모든 카드 접근 가능
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24, number: TOTAL },
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
  });

  function sync(s: KeenSliderInstance) {
    const details = s?.track?.details;
    if (!details) return;
    const mi = details.maxIdx ?? TOTAL - 1;
    setMaxIdx(mi);
    setThumbW((TOTAL - mi) / TOTAL);
    setSlide(details.rel ?? 0);
  }

  const thumbLeft = maxIdx > 0 ? (slide / maxIdx) * (1 - thumbW) * 100 : 0;
  const showPrev = loaded && slide > 0;
  const showNext = loaded && slide < maxIdx;

  const prev = () => instanceRef.current?.prev();
  const next = () => instanceRef.current?.next();

  return (
    <section className={styles.testimonialSection}>
      {/* Slider area */}
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
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className={`keen-slider__slide ${styles.slide}`}
            >
              <TestimonialCard item={item} />
            </div>
          ))}
          {/* Ghost slides — mobile maxIdx = totalSlides - ceil(perView) - 1
              perView:1.2(ceil=2) 기준 ghost 2개 필요: 9-2-1=6, 마지막 카드 snap 가능 */}
          <div className={`keen-slider__slide ${styles.slide} ${styles.ghostSlide}`} aria-hidden="true" />
          <div className={`keen-slider__slide ${styles.slide} ${styles.ghostSlide}`} aria-hidden="true" />
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
