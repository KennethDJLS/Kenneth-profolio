'use client';

import { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const categories = [
  {
    full: true,
    icon: '🔌',
    title: 'Hardware & Embedded',
    primary: ['BJT Circuits', 'Op-Amps', 'Instr. Amps', 'Signal Cond.', 'Arduino', 'ESP32', 'PCB Design', 'LTSpice', 'C/C++'],
    secondary: ['ESP-NOW', 'Multisim', 'SkyWater 130nm', 'SolidWorks', 'AutoCAD', 'I2C/SPI', 'Servo PWM', 'Firmware', 'DAQ'],
  },
  {
    full: false,
    icon: '💻',
    title: 'Software',
    primary: ['Python', 'MATLAB', 'JavaScript', 'TypeScript'],
    secondary: ['Next.js', 'SQL', 'Git', 'LabVIEW'],
  },
  {
    full: false,
    icon: '📶',
    title: 'IoT',
    primary: ['MQTT/TLS', 'Wi-Fi/BLE', 'OBD-II'],
    secondary: ['LTE/4G', 'UDP/TCP', 'SSE'],
  },
  {
    full: false,
    icon: '☁️',
    title: 'Cloud',
    primary: ['AWS IoT Core', 'AWS Lambda', 'DynamoDB'],
    secondary: ['AWS EC2', 'AWS CDK', 'SageMaker', 'S3'],
  },
  {
    full: false,
    icon: '🤖',
    title: 'AI / Data',
    primary: ['LightGBM', 'XGBoost', 'OpenCV'],
    secondary: ['Computer Vision', 'NumPy', 'Pandas'],
  },
];

export default function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hEl = headingRef.current;
    if (hEl) {
      hEl.style.opacity = '0';
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          hEl.style.transition = 'opacity 0.6s ease';
          hEl.style.opacity = '1';
          obs.unobserve(hEl);
        }
      }, { threshold: 0.2 });
      obs.observe(hEl);
    }

    const gEl = gridRef.current;
    if (!gEl) return;
    const cards = Array.from(gEl.children) as HTMLElement[];
    cards.forEach((c) => { c.style.opacity = '0'; c.style.transform = 'translateY(35px)'; });

    const obs2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        (async () => {
          const { animate, stagger } = await import('animejs');

          // Stagger cards
          await animate(cards, {
            opacity: [0, 1],
            translateY: [35, 0],
            delay: stagger(90),
            duration: 650,
            ease: 'outExpo',
          }).then(() => {});

          // Stagger pills
          const pills = gEl.querySelectorAll('[data-pill]');
          animate(pills, {
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: stagger(18),
            duration: 300,
            ease: 'outBack',
          });
        })();
        obs2.unobserve(gEl);
      }
    }, { threshold: 0.08 });
    obs2.observe(gEl);

    return () => obs2.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.header}>
          <span className={styles.headerLabel}>03 — Habilidades</span>
          <div className={styles.headerLine} />
        </div>

        <div ref={gridRef} className={styles.grid}>
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`${styles.card} ${cat.full ? styles.cardFull : ''}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{cat.icon}</span>
                <span className={styles.cardTitle}>{cat.title}</span>
              </div>
              <div className={styles.pills}>
                {cat.primary.map((s) => (
                  <span key={s} className={styles.pillRed} data-pill style={{ opacity: 0 }}>{s}</span>
                ))}
                {cat.secondary.map((s) => (
                  <span key={s} className={styles.pillGray} data-pill style={{ opacity: 0 }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
