"use client";

import Image from "next/image";
import styles from "./AboutMission.module.scss";

interface MissionCard {
  image: string;
  alt: string;
  title?: string;
  description: string;
}

interface AboutMissionProps {
  heading?: string;
  cards: MissionCard[];
}

export default function AboutMission({
  heading = "OUR MISSION",
  cards,
}: AboutMissionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        <div className={styles.grid}>
          {cards.map((card, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                {card.title && <h3 className={styles.cardTitle}>{card.title}</h3>}
                <p className={styles.cardDesc}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
