"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProcessSteps.module.scss";

const STEPS = [
  {
    number: "01",
    title: "Farm",
    description:
      "Our crickets are raised indoors on our family farm in Miami, Manitoba, Canada. They're fed a natural grain-based diet and given plenty of space to grow in a clean, controlled environment.",
    image: "/images/process/pcf-process-step1-habitat.jpg",
    alt: "Indoor cricket habitat — stacked trays on metal shelving under LED lights",
  },
  {
    number: "02",
    title: "Harvest",
    description:
      "Crickets are harvested at prime age to ensure peak nutritional density. The process is efficient, generating extremely low emissions and virtually no waste compared to conventional livestock.",
    image: "/images/process/pcf-process-step2-harvest.jpg",
    alt: "Gloved hands scooping harvested protein into a stainless steel bowl",
  },
  {
    number: "03",
    title: "Freeze",
    description:
      "Freshly harvested crickets are immediately frozen — a quick, humane method that also locks in their full nutritional profile before the next stage of processing.",
    image: "/images/process/pcf-process-step3-clean.jpg",
    alt: "Rinsing and cleaning process in a fine mesh strainer",
  },
  {
    number: "04",
    title: "Boil & Roast",
    description:
      "Crickets are boiled to meet strict food safety standards, then oven-roasted to develop a rich, nutty depth of flavour. No fillers. No additives. Just pure cricket.",
    image: "/images/process/pcf-process-step4-roast.jpg",
    alt: "Golden-brown roasted granules spread on a parchment-lined baking tray",
  },
  {
    number: "05",
    title: "Mill",
    description:
      "Finally, roasted crickets are milled into a super-fine powder — smooth enough to blend seamlessly into smoothies, baked goods, and everyday recipes without altering the taste.",
    image: "/images/process/pcf-process-step5-powder.jpg",
    alt: "Fine golden cricket protein powder on a ceramic spoon",
  },
];

export default function ProcessSteps() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left — sticky heading */}
        <div className={styles.colLeft}>
          <p className={styles.eyebrow}>Quick Facts</p>
          <h2 className={styles.heading}>
            How does cricket farming work?
          </h2>
          <p className={styles.description}>
            Our crickets are farmed indoors in Miami, Manitoba, Canada. This
            practice is efficient and clean — a process with extremely low
            emissions and little to no waste.
          </p>
          <Link href="/shop" className={styles.btn}>
            <div className={styles.mask}>
              <span className={styles.slidingText} data-content="Shop Cricket Protein">
                Shop Cricket Protein
              </span>
            </div>
          </Link>
        </div>

        {/* Right — numbered steps */}
        <div className={styles.colRight}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 1023px) 120px, 160px"
                  className={styles.stepImage}
                />
                <span className={styles.stepNumLabel}>{step.number}</span>
              </div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
