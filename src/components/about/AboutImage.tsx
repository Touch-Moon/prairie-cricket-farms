"use client";

import Image from "next/image";
import styles from "./AboutImage.module.scss";

interface AboutImageProps {
  src: string;
  alt: string;
}

export default function AboutImage({ src, alt }: AboutImageProps) {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrap}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
}
