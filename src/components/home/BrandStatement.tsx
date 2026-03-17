import styles from "./BrandStatement.module.scss";

interface BrandStatementProps {
  text: string;
}

export default function BrandStatement({ text }: BrandStatementProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.text}>{text}</p>
      </div>
    </section>
  );
}
