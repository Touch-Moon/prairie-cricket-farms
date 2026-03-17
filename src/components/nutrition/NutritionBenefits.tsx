"use client";

import { ChevronsUp, HeartPulse, Ban, Scale, Pill, Layers, LucideIcon } from "lucide-react";
import Link from "next/link";
import styles from "./NutritionBenefits.module.scss";

const PILLARS: { icon: LucideIcon; heading: string; copy: string | null }[] = [
  { icon: ChevronsUp,  heading: "High in Protein",                          copy: null },
  { icon: HeartPulse,  heading: "Contains Prebiotic Fibre that supports gut health", copy: null },
  { icon: Ban,         heading: "Non-Dairy Source of Calcium",               copy: null },
  { icon: Scale,       heading: "Ideal Ratio of Omega 6:3",                  copy: null },
  { icon: Pill,        heading: "Excellent Source of\u2026",                 copy: "Vitamin B12\nZinc\nManganese" },
  { icon: Layers,      heading: "Contains all 9 Essential Amino Acids",      copy: "His , Ile , Leu\nPhe , Lys , Met\nThr , Trp , Val" },
];

export default function NutritionBenefits() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left — heading + CTA */}
        <div className={styles.colLeft}>
          <h2 className={styles.heading}>Proven. Pure. Powerful.</h2>
          <Link href="/shop" className={styles.btn}>
            <div className={styles.mask}>
              <span className={styles.slidingText} data-content="Shop Cricket Protein">
                Shop Cricket Protein
              </span>
            </div>
          </Link>
        </div>

        {/* Right — 2×3 pillar grid */}
        <div className={styles.colRight}>
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.heading} className={styles.pillar}>
                <div className={styles.iconWrap}>
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <div className={styles.pillarBody}>
                  <h3 className={styles.pillarHeading}>{pillar.heading}</h3>
                  {pillar.copy && (
                    <p className={styles.pillarCopy}>
                      {pillar.copy.split("\n").map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
