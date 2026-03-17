import Link from "next/link";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  href: string;
  label: string;
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  href,
  label,
  variant = "primary",
  className,
}: ButtonProps) {
  const cls = [styles[variant], className].filter(Boolean).join(" ");

  return (
    <Link href={href} className={cls}>
      <div className={styles.mask}>
        <span className={styles.slide} data-content={label}>
          {label}
        </span>
      </div>
    </Link>
  );
}
