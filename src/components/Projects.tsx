'use client';

import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    featured: true,
    title: 'UrbanTrack',
    meta: '2026 · Uninorte',
    desc: 'Plataforma IoT de rastreo vehicular urbano en tiempo real. OBD-II → ESP32 → AWS IoT Core → dashboard web con SSE. Predicción de tráfico con LightGBM.',
    tags: ['ESP32', 'OBD-II', 'AWS IoT', 'LightGBM', 'Next.js', 'SSE'],
    primaryTags: ['ESP32', 'AWS IoT', 'LightGBM'],
    icon: '🚗',
  },
  {
    featured: false,
    title: 'Aria — Mano Robótica',
    meta: '2026 · Microcontroladores',
    desc: 'Prótesis robótica de 5 dedos controlada por EMG. Firmware STM32, servos PWM, filtrado de señal analógica en tiempo real.',
    tags: ['STM32', 'EMG', 'Servo PWM', 'C', 'SolidWorks'],
    primaryTags: ['STM32', 'EMG'],
    icon: '🦾',
  },
  {
    featured: false,
    title: 'Amperímetro Hall 0–20A',
    meta: 'ago. 2025 · Electrónica 3',
    desc: 'Instrumento de medición de corriente DC/AC basado en sensor Hall ACS712. PCB diseñada en KiCad, amplificador de instrumentación, ADC 12-bit.',
    tags: ['KiCad', 'Op-Amps', 'ACS712', 'ADC', 'Instr. Amps'],
    primaryTags: ['KiCad', 'Op-Amps'],
    icon: '⚡',
  },
  {
    featured: false,
    title: 'BLOC 2026 · Forecasting',
    meta: 'may. 2026 · Hackathon 48h',
    desc: 'Modelo de predicción de demanda de productos en cadena de suministro usando XGBoost + serie temporal. 1er lugar hackathon BLOC Uninorte.',
    tags: ['XGBoost', 'Python', 'Pandas', 'Time Series', 'AWS SageMaker'],
    primaryTags: ['XGBoost', 'AWS SageMaker'],
    icon: '📈',
  },
  {
    featured: false,
    title: 'Sistema NTC',
    meta: '2025 · Mediciones e Inst.',
    desc: 'Adquisición y linealización de temperatura con termistor NTC. Circuito de acondicionamiento, calibración Steinhart-Hart, visualización serial.',
    tags: ['NTC', 'LTSpice', 'Arduino', 'Signal Cond.', 'DAQ'],
    primaryTags: ['LTSpice', 'Signal Cond.'],
    icon: '🌡️',
  },
];

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading reveal
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

    // Featured card
    const fEl = featuredRef.current;
    if (fEl) {
      fEl.style.opacity = '0';
      fEl.style.transform = 'translateY(30px)';
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          fEl.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          fEl.style.opacity = '1';
          fEl.style.transform = 'none';
          obs.unobserve(fEl);
        }
      }, { threshold: 0.1 });
      obs.observe(fEl);
    }

    // Stagger grid cards
    const gEl = gridRef.current;
    if (!gEl) return;
    const cards = Array.from(gEl.children) as HTMLElement[];
    cards.forEach((c) => { c.style.opacity = '0'; c.style.transform = 'translateY(40px)'; });

    const obs2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        (async () => {
          const { animate, stagger } = await import('animejs');
          animate(cards, {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(110),
            duration: 750,
            ease: 'outExpo',
          });
        })();
        obs2.unobserve(gEl);
      }
    }, { threshold: 0.1 });
    obs2.observe(gEl);

    return () => obs2.disconnect();
  }, []);

  const springHover = async (el: HTMLElement, enter: boolean) => {
    const { animate } = await import('animejs');
    animate(el, {
      translateY: enter ? -5 : 0,
      duration: 350,
      ease: 'spring(1, 90, 12, 0)',
    });
  };

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.header}>
          <span className={styles.headerLabel}>02 — Proyectos</span>
          <div className={styles.headerLine} />
        </div>

        {/* Featured */}
        <div
          ref={featuredRef}
          className={styles.featured}
          onMouseEnter={(e) => springHover(e.currentTarget, true)}
          onMouseLeave={(e) => springHover(e.currentTarget, false)}
        >
          <div className={styles.featuredVisual}>{featured.icon}</div>
          <div className={styles.featuredBody}>
            <div>
              <p className={styles.meta}>{featured.meta}</p>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.desc}>{featured.desc}</p>
            </div>
            <div>
              <div className={styles.tags}>
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    className={featured.primaryTags.includes(t) ? styles.tagRed : styles.tagGray}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className={styles.arrow}>↗</span>
            </div>
          </div>
        </div>

        {/* 2-col grid */}
        <div ref={gridRef} className={styles.grid}>
          {rest.map((p) => (
            <div
              key={p.title}
              className={styles.card}
              onMouseEnter={(e) => springHover(e.currentTarget, true)}
              onMouseLeave={(e) => springHover(e.currentTarget, false)}
            >
              <p className={styles.meta}>{p.meta}</p>
              <h3 className={styles.cardTitle}>
                {p.icon} {p.title}
              </h3>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.tags}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={p.primaryTags.includes(t) ? styles.tagRed : styles.tagGray}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className={styles.arrow}>↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
