'use client';

import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    featured: true,
    title: 'UrbanTrack',
    meta: '2026 · Uninorte',
    desc: 'Sistema full-stack de rastreo GPS vehicular y telemetría OBD-II en tiempo real. App Android transmite ubicación a servidor Node.js en AWS EC2, almacena en PostgreSQL y visualiza rutas en mapa web con Leaflet. Arquitectura redundante con 4 instancias EC2 y CI/CD con GitHub Actions.',
    tags: ['Node.js', 'PostgreSQL', 'AWS EC2/RDS', 'OBD-II', 'Kotlin', 'Leaflet', 'GitHub Actions', 'SSE'],
    primaryTags: ['Node.js', 'PostgreSQL', 'AWS EC2/RDS', 'OBD-II'],
    icon: '🚗',
  },
  {
    featured: false,
    title: 'Aria — Mano Robótica',
    meta: '2026 · Microcontroladores',
    desc: 'Sistema de teleoperación inalámbrica de mano robótica antropomórfica de cinco dedos. Guante instrumentado con ESP32-S3 detecta flexión de cada dedo y transmite por ESP-NOW (1–10 ms) al receptor, que controla 5 servos HS-645MG vía driver PCA9685. Alimentación autónoma 9V + LM7805.',
    tags: ['ESP32-S3', 'ESP-NOW', 'PCA9685', 'C/Arduino', 'Servo PWM', 'I2C', 'LM7805'],
    primaryTags: ['ESP32-S3', 'ESP-NOW', 'PCA9685'],
    icon: '🦾',
  },
  {
    featured: false,
    title: 'Amperímetro Hall 0–20A',
    meta: 'ago. 2025 · Electrónica 3',
    desc: 'Instrumento de medición de corriente con aislamiento galvánico. Sensor Hall WCS1800 → acondicionamiento con OTA → Arduino Nano con OLED I2C. PCB diseñada en Eagle, carcasa en Fusion 360 impresa en PLA. Calibrado contra patrón Fluke 179: error promedio 1.2%.',
    tags: ['Sensor Hall', 'Eagle PCB', 'Arduino Nano', 'OTA', 'OLED I2C', 'Fusion 360', 'Impresión 3D'],
    primaryTags: ['Sensor Hall', 'Eagle PCB', 'Arduino Nano'],
    icon: '⚡',
  },
  {
    featured: false,
    title: 'BLOC 2026 · GRIP Shipping Logistics Challenge',
    meta: 'may. 2026 · Hackathon 48h',
    desc: 'Modelo LightGBM de forecasting de demanda diaria sobre 1.2M de órdenes cold-chain para el GRIP Shipping Logistics Challenge. 19 features, 46 versiones iterativas. RMSLE 1.037 — reducción del 50% vs baseline. Dashboard interactivo en producción desplegado en AWS S3. 3er lugar en el leaderboard final.',
    tags: ['Python', 'LightGBM', 'AWS SageMaker', 'Pandas', 'React', 'D3.js', 'XGBoost'],
    primaryTags: ['Python', 'LightGBM', 'AWS SageMaker'],
    icon: '📈',
  },
  {
    featured: false,
    title: 'Sistema NTC',
    meta: '2025 · Mediciones e Inst.',
    desc: 'Sistema de adquisición de temperatura con cadena analógica completa: puente de Wheatstone → amplificador de instrumentación AD620 → filtro Sallen-Key de 2° orden (TL072). Calibrado en 30 puntos (4.9°C–58°C), R²=0.997. Visualización en tiempo real con LabVIEW y DAQ.',
    tags: ['AD620', 'Sallen-Key', 'TL072', 'LabVIEW', 'DAQ', 'Wheatstone'],
    primaryTags: ['AD620', 'Sallen-Key'],
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
          <span className={styles.headerLabel}>03 — Proyectos</span>
          <div className={styles.headerLine} />
        </div>

        {/* Featured — full-width text */}
        <div
          ref={featuredRef}
          className={styles.featured}
          onMouseEnter={(e) => springHover(e.currentTarget, true)}
          onMouseLeave={(e) => springHover(e.currentTarget, false)}
        >
          <div className={styles.featuredBody}>
            {/* Left: meta + title + desc */}
            <div>
              <p className={styles.meta}>{featured.meta}</p>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.desc} style={{ maxWidth: '620px' }}>{featured.desc}</p>
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
            </div>
            {/* Right: arrow */}
            <span className={styles.arrow} style={{ marginTop: 0, alignSelf: 'flex-start' }}>↗</span>
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
              <h3 className={styles.cardTitle}>{p.title}</h3>
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
