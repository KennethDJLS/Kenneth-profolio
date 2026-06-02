'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Sistema de Monitoreo IoT',
    description:
      'Plataforma de monitoreo en tiempo real para sensores industriales usando ESP32, MQTT y dashboard en Node-RED con alertas automáticas.',
    tags: ['ESP32', 'MQTT', 'Node-RED', 'IoT'],
    icon: '📡',
  },
  {
    title: 'Control de Motor BLDC',
    description:
      'Diseño e implementación de controlador FOC para motores brushless usando STM32 y algoritmos de control vectorial en tiempo real.',
    tags: ['STM32', 'FOC', 'Altium', 'C'],
    icon: '⚡',
  },
  {
    title: 'Fuente de Poder Conmutada',
    description:
      'Diseño de SMPS flyback de 150W con corrección de factor de potencia (PFC), eficiencia >90% y certificación EMC.',
    tags: ['Altium', 'SPICE', 'PFC', 'EMC'],
    icon: '🔋',
  },
  {
    title: 'Brazo Robótico 3-DOF',
    description:
      'Robot articulado controlado por PLC Siemens S7-1200 con visión por computadora para pick-and-place automatizado.',
    tags: ['PLC', 'Python', 'OpenCV', 'TIA Portal'],
    icon: '🤖',
  },
  {
    title: 'Red de Sensores LoRaWAN',
    description:
      'Infraestructura de medición agrícola con nodos LoRa de bajo consumo, gateway TTN y análisis de datos en la nube.',
    tags: ['LoRa', 'Arduino', 'TTN', 'Grafana'],
    icon: '🌿',
  },
];

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    const gEl = gridRef.current;
    if (!gEl) return;
    const cards = Array.from(gEl.children) as HTMLElement[];
    cards.forEach((c) => { c.style.opacity = '0'; c.style.transform = 'translateY(50px)'; });

    const obs2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        (async () => {
          const { animate, stagger } = await import('animejs');
          animate(cards, {
            opacity: [0, 1],
            translateY: [50, 0],
            delay: stagger(100),
            duration: 700,
            ease: 'outExpo',
          });
        })();
        obs2.unobserve(gEl);
      }
    }, { threshold: 0.1 });
    obs2.observe(gEl);

    return () => obs2.disconnect();
  }, []);

  const handleCardHover = async (card: HTMLElement, entering: boolean) => {
    const { animate } = await import('animejs');
    animate(card, {
      translateY: entering ? -8 : 0,
      scale: entering ? 1.02 : 1,
      duration: 300,
      ease: 'spring(1, 80, 10, 0)',
    });
  };

  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div ref={headingRef} style={{ marginBottom: '3rem' }}>
        <span style={{ color: '#4F7EFF', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
          — Proyectos
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0.5rem 0 0', lineHeight: 1.1 }}>
          Trabajo destacado
        </h2>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {projects.map((p) => (
          <div
            key={p.title}
            onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            style={{
              background: '#162035',
              border: '1px solid rgba(79,126,255,0.15)',
              borderRadius: '16px',
              padding: '2rem',
              cursor: 'default',
              willChange: 'transform',
            }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{p.icon}</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#E8EDF8' }}>
              {p.title}
            </h3>
            <p style={{ color: '#8A9BC0', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {p.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: 'rgba(79,126,255,0.1)',
                    border: '1px solid rgba(79,126,255,0.2)',
                    color: '#7BA3FF',
                    borderRadius: '6px',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
