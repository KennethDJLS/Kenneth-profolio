'use client';

import Image from 'next/image';
import { useScrollReveal } from './hooks/useScrollReveal';
import styles from './About.module.css';

const infoCards = [
  { icon: '📍', label: 'Ubicación', value: 'Barranquilla, Colombia' },
  { icon: '🎓', label: 'Universidad', value: 'Uninorte' },
  { icon: '🌐', label: 'Idiomas', value: 'Español · Inglés' },
];

export default function About() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const photoRef = useScrollReveal<HTMLDivElement>({ direction: 'left', delay: 100 });
  const textRef = useScrollReveal<HTMLDivElement>({ direction: 'right', delay: 200 });

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.header}>
          <span className={styles.headerLabel}>
            02 — Sobre <span className={styles.headerLabelRed}>mí</span>
          </span>
          <div className={styles.headerLine} />
        </div>

        <div className={styles.grid}>
          {/* Photo */}
          <div ref={photoRef} className={styles.photoWrap}>
            <div className={styles.spinRing} aria-hidden />
            <div className={styles.photoInner}>
              <Image
                src="/foto.jpg"
                alt="Kenneth Lascarro"
                width={220}
                height={220}
                className={styles.photo}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const fb = e.currentTarget.nextSibling as HTMLElement;
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <span className={styles.photoFallback} style={{ display: 'none' }}>👤</span>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className={styles.textSide}>
            <h2 className={styles.tagline}>
              El mundo real habla en{' '}
              <span className={styles.taglineRed}>analógico</span>.{' '}
              Yo traduzco.
            </h2>

            <p className={styles.bio}>
              Soy Kenneth De Jesús Lascarro Santiago, estudiante de Ingeniería Electrónica en
              Uninorte (Barranquilla). Me especializo en el puente entre hardware y software —
              desde diseñar circuitos analógicos y PCBs hasta implementar sistemas IoT completos
              que corren en la nube.
            </p>
            <p className={styles.bio}>
              Mi interés va desde sensores y microcontroladores hasta machine learning aplicado
              a datos del mundo físico. Creo que los mejores productos nacen cuando alguien
              entiende tanto el transistor como el algoritmo.
            </p>
            <p className={styles.bio}>
              Fuera del laboratorio me encontrarás en hackathons, contribuyendo a proyectos
              open-source o aprendiendo sobre microcontroladores y diseño de websites.
            </p>

            <div className={styles.infoCards}>
              {infoCards.map((c) => (
                <div key={c.label} className={styles.infoCard}>
                  <span className={styles.infoIcon}>{c.icon}</span>
                  <div>
                    <span className={styles.infoLabel}>{c.label}</span>
                    <span className={styles.infoValue}>{c.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
