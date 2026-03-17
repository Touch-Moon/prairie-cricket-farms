"use client";

import { useRef, useState, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { KeenSliderInstance } from "keen-slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CommunityGrid.module.scss";

const VIDEOS = [
  { src: "/videos/testimonials/t4-video.mp4", poster: "/images/testimonials/t4-poster.jpg" },
  { src: "/videos/testimonials/t1-video.mp4", poster: "/images/testimonials/t1-poster.jpg" },
  { src: "/videos/testimonials/t6-video.mp4", poster: "/images/testimonials/t6-poster.jpg" },
  { src: "/videos/testimonials/t2-video.mp4", poster: "/images/testimonials/t2-poster.jpg" },
  { src: "/videos/testimonials/t7-video.mp4", poster: "/images/testimonials/t7-poster.jpg" },
  { src: "/videos/testimonials/t3-video.mp4", poster: "/images/testimonials/t3-poster.jpg" },
  { src: "/videos/testimonials/t5-video.mp4", poster: "/images/testimonials/t5-poster.jpg" },
];

const TOTAL = VIDEOS.length;

// ── Icons ────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 8L4.5 13V3L13.5 8Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5" y="3.5" width="2" height="9" fill="currentColor" />
    <rect x="9" y="3.5" width="2" height="9" fill="currentColor" />
  </svg>
);

const MuteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3.43 6.4H2.4V9.6H5.53L5.93 9.95L8.1 11.88V11.07L9.5 12.47V15L5 11H1V5H2.03L3.43 6.4ZM13.75 4.17C14.53 5.24 15 6.57 15 8C15 9.16 14.69 10.25 14.16 11.19L13.12 10.15C13.43 9.5 13.6 8.77 13.6 8C13.6 6.95 13.28 5.98 12.74 5.17L13.75 4.17ZM12.03 5.88C12.33 6.53 12.5 7.24 12.5 8C12.5 8.47 12.43 8.92 12.31 9.34L11.09 8.12C11.1 8.08 11.1 8.04 11.1 8C11.1 7.64 11.05 7.29 10.95 6.97L12.03 5.88ZM9.5 6.53L8.1 5.13V4.12L7.56 4.59L6.57 3.6L9.5 1V6.53Z" fill="currentColor" />
    <path d="M14.5 13.5L13.5 14.5L1.5 2.5L2.5 1.5L14.5 13.5Z" fill="currentColor" />
  </svg>
);

const UnmuteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 15L5 11H1V5H5L9.5 1V15ZM5.93 6.05L5.53 6.4H2.4V9.6H5.53L5.93 9.95L8.1 11.88V4.12L5.93 6.05Z" fill="currentColor" />
    <path d="M13.75 4.17C14.53 5.24 15 6.57 15 8C15 9.43 14.53 10.76 13.75 11.83L12.74 10.83C13.28 10.02 13.6 9.05 13.6 8C13.6 6.95 13.28 5.98 12.74 5.17L13.75 4.17Z" fill="currentColor" />
    <path d="M12.03 5.88C12.33 6.53 12.5 7.24 12.5 8C12.5 8.76 12.33 9.47 12.03 10.12L10.95 9.03C11.05 8.71 11.1 8.36 11.1 8C11.1 7.64 11.05 7.29 10.95 6.97L12.03 5.88Z" fill="currentColor" />
  </svg>
);

// ── VideoTile ────────────────────────────────────────────────

function VideoTile({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    try {
      if (playing) {
        vid.pause();
        setPlaying(false);
      } else {
        await vid.play();
        setPlaying(true);
      }
    } catch {
      // autoplay policy blocked - ignore
    }
  }, [playing]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  }, [muted]);

  return (
    <div className={styles.tile}>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className={styles.controls}>
        <button className={`${styles.btn} ${styles.btnPlay}`} onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className={styles.btn} onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      </div>
    </div>
  );
}

// ── CommunityGrid ────────────────────────────────────────────

export default function CommunityGrid() {
  const [slide, setSlide] = useState(0);
  const [maxIdx, setMaxIdx] = useState(TOTAL - 1);
  const [thumbW, setThumbW] = useState(1 / TOTAL);
  const [loaded, setLoaded] = useState(false);
  const isDragging = useRef(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    rubberband: false,
    drag: true,
    slides: { perView: 1.2, spacing: 16, number: TOTAL + 2 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.3, spacing: 20, number: TOTAL + 2 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 24, number: TOTAL },
      },
    },
    dragStarted() { isDragging.current = true; },
    dragEnded() { isDragging.current = false; },
    created(s) { sync(s); setLoaded(true); },
    updated(s) { sync(s); },
    slideChanged(s) { setSlide(s.track.details.rel); },
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
    <section className={styles.communityGridSection}>
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
          {VIDEOS.map((v) => (
            <div key={v.src} className={`keen-slider__slide ${styles.slide}`}>
              <VideoTile src={v.src} poster={v.poster} />
            </div>
          ))}
          {/* Ghost slides — mobile perView:1.2 (ceil=2): 9-2-1=6, 7번째 snap 가능 */}
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
        <div className={styles.indicatorTrack}>
          <div
            className={styles.indicatorThumb}
            style={{ width: `${thumbW * 100}%`, left: `${thumbLeft}%` }}
          />
        </div>
      </div>
    </section>
  );
}
