'use client';

import { useScrollReveal } from './useScrollReveal';

const stats = [
  { value: '5+', label: 'Años de estudio' },
  { value: '10+', label: 'Proyectos completados' },
  { value: '3+', label: 'Áreas de especialización' },
];

export default function About() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const textRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div ref={headingRef} style={{ marginBottom: '3rem' }}>
        <span style={{ color: '#4F7EFF', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
          — Sobre mí
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0.5rem 0 0', lineHeight: 1.1 }}>
          Pasión por la electrónica
          <br />
          <span style={{ color: '#4F7EFF' }}>y la innovación</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-grid">
        <div ref={textRef}>
          <p style={{ color: '#8A9BC0', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            Soy Kenneth De Jesús Lascarro Santiago, Ingeniero Electrónico con sólida
            formación en diseño de circuitos, sistemas embebidos y automatización
            industrial. Me apasiona crear soluciones que integren hardware y software
            de manera eficiente.
          </p>
          <p style={{ color: '#8A9BC0', lineHeight: 1.8, fontSize: '1.05rem' }}>
            Mi enfoque combina rigor técnico con creatividad para resolver problemas
            complejos, desde el prototipado hasta la implementación final en entornos
            de producción.
          </p>
        </div>

        <div ref={statsRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: '#162035',
                border: '1px solid rgba(79,126,255,0.15)',
                borderRadius: '12px',
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4F7EFF', minWidth: '80px' }}>
                {s.value}
              </span>
              <span style={{ color: '#8A9BC0', fontSize: '0.95rem' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
