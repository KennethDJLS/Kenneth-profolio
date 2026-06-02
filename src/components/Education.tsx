'use client';

import { useEffect, useRef } from 'react';

const education = [
  {
    degree: 'Ingeniería Electrónica',
    institution: 'Universidad del Norte',
    period: '2018 — 2023',
    description: 'Énfasis en sistemas embebidos, control automático y diseño de circuitos analógicos y digitales.',
    badge: 'Título',
  },
  {
    degree: 'Diplomado en IoT Industrial',
    institution: 'SENA',
    period: '2022',
    description: 'Protocolos de comunicación industrial, integración de sensores y plataformas en la nube para IIoT.',
    badge: 'Cert.',
  },
  {
    degree: 'PCB Design Professional',
    institution: 'Altium Academy',
    period: '2021',
    description: 'Diseño avanzado de PCB multicapa, integridad de señal y gestión térmica en Altium Designer.',
    badge: 'Cert.',
  },
];

export default function Education() {
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hEl = headingRef.current;
    if (hEl) {
      hEl.style.opacity = '0';
      hEl.style.transform = 'translateY(30px)';
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          hEl.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          hEl.style.opacity = '1';
          hEl.style.transform = 'translateY(0)';
          obs.unobserve(hEl);
        }
      }, { threshold: 0.1 });
      obs.observe(hEl);
    }

    const lEl = listRef.current;
    if (!lEl) return;
    const items = Array.from(lEl.children) as HTMLElement[];
    items.forEach((c) => { c.style.opacity = '0'; c.style.transform = 'translateX(-30px)'; });

    const obs2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        (async () => {
          const { animate, stagger } = await import('animejs');
          animate(items, {
            opacity: [0, 1],
            translateX: [-30, 0],
            delay: stagger(120),
            duration: 700,
            ease: 'outExpo',
          });
        })();
        obs2.unobserve(lEl);
      }
    }, { threshold: 0.1 });
    obs2.observe(lEl);

    return () => obs2.disconnect();
  }, []);

  return (
    <section id="education" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div ref={headingRef} style={{ marginBottom: '3rem' }}>
        <span style={{ color: '#4F7EFF', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
          — Educación
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0.5rem 0 0', lineHeight: 1.1 }}>
          Formación académica
        </h2>
      </div>

      <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {education.map((edu) => (
          <div
            key={edu.degree}
            style={{
              background: '#162035',
              border: '1px solid rgba(79,126,255,0.15)',
              borderRadius: '16px',
              padding: '2rem',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem',
              alignItems: 'start',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(79,126,255,0.12)',
                  border: '1px solid rgba(79,126,255,0.25)',
                  color: '#4F7EFF',
                  borderRadius: '6px',
                  padding: '0.15rem 0.5rem',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}
              >
                {edu.badge}
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E8EDF8', margin: '0 0 0.25rem' }}>
                {edu.degree}
              </h3>
              <p style={{ color: '#4F7EFF', fontSize: '0.9rem', margin: '0 0 0.75rem', fontWeight: 500 }}>
                {edu.institution}
              </p>
              <p style={{ color: '#8A9BC0', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                {edu.description}
              </p>
            </div>
            <span style={{ color: '#8A9BC0', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{edu.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
