'use client';

import { useEffect, useRef } from 'react';

const categories = [
  {
    label: 'Diseño de Hardware',
    icon: '🔌',
    skills: ['Altium Designer', 'KiCad', 'SPICE', 'PCB Layout', 'Esquemáticos'],
  },
  {
    label: 'Sistemas Embebidos',
    icon: '💻',
    skills: ['STM32', 'ESP32', 'Arduino', 'PIC', 'FreeRTOS', 'C/C++'],
  },
  {
    label: 'Automatización',
    icon: '⚙️',
    skills: ['PLC Siemens', 'TIA Portal', 'SCADA', 'Ladder Logic', 'HMI'],
  },
  {
    label: 'IoT & Comunicaciones',
    icon: '📶',
    skills: ['MQTT', 'LoRaWAN', 'Modbus', 'I2C', 'SPI', 'UART', 'Wi-Fi'],
  },
  {
    label: 'Software & Herramientas',
    icon: '🛠️',
    skills: ['Python', 'MATLAB', 'Node-RED', 'Git', 'Linux', 'Docker'],
  },
  {
    label: 'Instrumentación',
    icon: '📊',
    skills: ['Osciloscopio', 'Analizador Lógico', 'Multímetro', 'LCR Meter'],
  },
];

export default function Skills() {
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
    cards.forEach((c) => { c.style.opacity = '0'; c.style.transform = 'translateY(40px)'; });

    const obs2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        (async () => {
          const { animate, stagger } = await import('animejs');
          animate(cards, {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(80),
            duration: 600,
            ease: 'outExpo',
            onComplete: () => {
              const allPills = gEl.querySelectorAll('.skill-pill');
              animate(allPills, {
                opacity: [0, 1],
                scale: [0.7, 1],
                delay: stagger(25),
                duration: 400,
                ease: 'outBack',
              });
            },
          });
        })();
        obs2.unobserve(gEl);
      }
    }, { threshold: 0.1 });
    obs2.observe(gEl);

    return () => obs2.disconnect();
  }, []);

  return (
    <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div ref={headingRef} style={{ marginBottom: '3rem' }}>
        <span style={{ color: '#4F7EFF', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
          — Habilidades técnicas
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0.5rem 0 0', lineHeight: 1.1 }}>
          Stack &amp; herramientas
        </h2>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.label}
            style={{
              background: '#162035',
              border: '1px solid rgba(79,126,255,0.12)',
              borderRadius: '16px',
              padding: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#E8EDF8', margin: 0 }}>{cat.label}</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill"
                  style={{
                    background: 'rgba(79,126,255,0.08)',
                    border: '1px solid rgba(79,126,255,0.18)',
                    color: '#8A9BC0',
                    borderRadius: '6px',
                    padding: '0.3rem 0.65rem',
                    fontSize: '0.8rem',
                    opacity: 0,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
