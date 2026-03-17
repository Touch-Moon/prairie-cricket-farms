"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ContactForm.module.scss";

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  }

  return (
    <section ref={sectionRef} className={`${styles.section} ${inView ? styles.visible : ""}`}>
      <div className={styles.container}>

        {/* Left — founders image */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/contact/pcf-contact-founders.jpg"
              alt="Prairie Cricket Farms founders"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>

        {/* Right — contact form */}
        <div className={styles.formCol}>
          <div className={styles.formInner}>
            <p className={styles.eyebrow}>Send us a message</p>

            {submitted ? (
              <div className={styles.success}>
                <p className={styles.successHeading}>Thank you!</p>
                <p className={styles.successText}>
                  We&apos;ve received your message and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>

                {/* Name row — Last / First */}
                <div className={styles.twoCol}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lastName">
                      Last <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className={styles.input}
                      placeholder="Smith"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="firstName">
                      First <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className={styles.input}
                      placeholder="Jane"
                    />
                  </div>
                </div>

                {/* Email / Phone row */}
                <div className={styles.twoCol}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      Email <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={styles.input}
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={styles.input}
                      placeholder="(999) 999-9999"
                    />
                  </div>
                </div>

                {/* Inquiry — textarea */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="inquiry">
                    Inquiry <span className={styles.req}>*</span>
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    required
                    rows={5}
                    className={styles.textarea}
                    placeholder="Tell us how we can help…"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  <span className={styles.mask}>
                    <span
                      className={styles.slide}
                      data-content={loading ? "Sending…" : "Send Message"}
                    >
                      {loading ? "Sending…" : "Send Message"}
                    </span>
                  </span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
