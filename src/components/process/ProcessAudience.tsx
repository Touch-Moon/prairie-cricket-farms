import Image from "next/image";
import Link from "next/link";
import styles from "./ProcessAudience.module.scss";

const AUDIENCES = [
  {
    image: "/images/process/audience-active.jpg",
    alt: "Active lifestyles — green smoothie with protein powder",
    title: "Active Lifestyles",
    description:
      "High in complete protein and all 9 essential amino acids, cricket powder is the ideal pre- or post-workout fuel to support muscle recovery and sustained energy.",
    href: "/shop",
  },
  {
    image: "/images/process/audience-families.jpg",
    alt: "Families enjoying healthy meal prep together",
    title: "Families",
    description:
      "Easy to blend into everyday recipes without changing the taste, it's a hidden superfood the whole family can benefit from — even the pickiest eaters.",
    href: "/shop",
  },
  {
    image: "/images/process/audience-nondairy.jpg",
    alt: "Non-dairy plant-based protein alternative",
    title: "Non-Dairy Folks",
    description:
      "A natural, non-dairy source of calcium and complete protein, cricket powder is a great choice for those who avoid lactose or dairy-based supplements.",
    href: "/shop",
  },
  {
    image: "/images/process/audience-pets.jpg",
    alt: "Pet bowl with protein supplement for furry friends",
    title: "Furry Friends",
    description:
      "Crickets are naturally high in protein and highly digestible, making them an excellent sustainable ingredient for homemade pet treats and food toppers.",
    href: "/shop",
  },
];

export default function ProcessAudience() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <p className={styles.eyebrow}>Who is it for?</p>
          <h2 className={styles.heading}>
            Cricket protein is for everyone
          </h2>
        </div>

        <div className={styles.grid}>
          {AUDIENCES.map((item) => (
            <div key={item.title} className={styles.card}>
              <Link href={item.href} className={styles.imageWrap}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className={styles.image}
                />
              </Link>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
                <Link href={item.href} className={styles.btn}>
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
