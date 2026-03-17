"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./VideoFeature.module.scss";

const PauseIcon = () => (
  <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="2" height="9" fill="currentColor" />
    <rect x="6" y="0" width="2" height="9" fill="currentColor" />
  </svg>
);

const PlayIcon = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0L10 6L0 12V0Z" fill="currentColor" />
  </svg>
);

const MuteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 15L5 11H1V5H5L9.5 1V15ZM5.92969 6.0459L5.53223 6.40039H2.40039V9.59961H5.53223L5.92969 9.9541L8.09961 11.8828V4.11621L5.92969 6.0459Z" fill="currentColor" />
    <path d="M13.748 4.16699C14.5344 5.24182 15 6.5662 15 8C15 9.4338 14.5344 10.7582 13.748 11.833L12.7432 10.8281C13.2837 10.0187 13.5996 9.04645 13.5996 8C13.5996 6.95325 13.284 5.98045 12.7432 5.1709L13.748 4.16699Z" fill="currentColor" />
    <path d="M12.0303 5.88379C12.331 6.52657 12.5 7.24345 12.5 8C12.5 8.75624 12.3308 9.47266 12.0303 10.1152L10.9482 9.0332C11.0462 8.70587 11.0996 8.35921 11.0996 8C11.0996 7.64046 11.0463 7.29342 10.9482 6.96582L12.0303 5.88379Z" fill="currentColor" />
  </svg>
);

const UnmuteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.42969 6.40039H2.40039V9.59961H5.53223L5.92969 9.9541L8.09961 11.8828V11.0703L9.5 12.4707V15L5 11H1V5H2.0293L3.42969 6.40039ZM13.748 4.16699C14.5343 5.24171 14.9999 6.56641 15 8C14.9999 9.15996 14.694 10.2479 14.1611 11.1904L13.1221 10.1514C13.4272 9.49763 13.5996 8.7691 13.5996 8C13.5995 6.95347 13.2838 5.98033 12.7432 5.1709L13.748 4.16699ZM12.0303 5.88379C12.3309 6.52642 12.5 7.24366 12.5 8C12.5 8.46574 12.434 8.91617 12.3145 9.34375L11.0947 8.12402C11.0962 8.08293 11.0996 8.04144 11.0996 8C11.0996 7.64067 11.0462 7.29324 10.9482 6.96582L12.0303 5.88379ZM9.5 6.5293L8.09961 5.12891V4.11621L7.56348 4.59277L6.57227 3.60156L9.5 1V6.5293Z" fill="currentColor" />
    <path d="M14.4951 13.5049L13.5049 14.4951L1.50488 2.49512L2.49512 1.50488L14.4951 13.5049Z" fill="currentColor" />
  </svg>
);

export default function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
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
    <section className={styles.section}>
      {/* Left — yellow text panel */}
      <div className={styles.colText}>
        <div className={styles.textInner}>
          <h2 className={styles.heading}>With Protein Comes Power</h2>
          <p className={styles.copy}>
            Cricket protein is a bold choice — a declaration of eating smarter,
            living stronger, and fuelling your body with what it truly needs.
          </p>
          <Link href="/about" className={styles.btn}>
            <div className={styles.mask}>
              <span className={styles.slidingText} data-content="Discover More">
                Discover More
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Right — video */}
      <div className={styles.colMedia}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/videos/videofeature-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/video-feature/poster.jpg"
        />

        {/* Bottom controls — play left, mute right, same baseline */}
        <div className={styles.controls}>
          <button
            className={`${styles.controlBtn} ${styles["controlBtn--play"]}`}
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
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
    </section>
  );
}
