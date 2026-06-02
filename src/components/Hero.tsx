'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { createTimeline, stagger } = await import('animejs');

      createTimeline({ defaults: { ease: 'outExpo' } })
        .add(badgeRef.current!, { opacity: [0, 1], translateY: [-20, 0], duration: 600 })
        .add(titleRef.current!, { opacity: [0, 1], translateY: [40, 0], duration: 800 }, 400)
        .add(lineRef.current!, { scaleX: [0, 1], duration: 600, ease: 'inOutQuart' }, 800)
        .add(subtitleRef.current!, { opacity: [0, 1], translateY: [20, 0], duration: 700 }, 1000)
        .add(ctaRef.current!.children as unknown as Element[], {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(120),
          duration: 600,
        }, 1100);
    })();
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(79,126,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,126,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Glow blob */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(79,126,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
      />

      <div style={{ textAlign: 'center', maxWidth: '780px', position: 'relative' }}>
        <span
          ref={badgeRef}
          style={{
            display: 'inline-block',
            background: 'rgba(79,126,255,0.12)',
            border: '1px solid rgba(79,126,255,0.3)',
            color: '#4F7EFF',
            borderRadius: '100px',
            padding: '0.35rem 1rem',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        >
          Ingeniero Electrónico
        </span>

        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            margin: '0 0 1rem',
            opacity: 0,
            background: 'linear-gradient(135deg, #E8EDF8 0%, #7BA3FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Kenneth
          <br />
          Lascarro
        </h1>

        <div
          ref={lineRef}
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, #4F7EFF, #7BA3FF)',
            borderRadius: '2px',
            width: '80px',
            margin: '0 auto 1.5rem',
            transformOrigin: 'left center',
          }}
        />

        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#8A9BC0',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
            opacity: 0,
          }}
        >
          Diseño sistemas embebidos, circuitos electrónicos y soluciones IoT que
          conectan el mundo físico con el digital.
        </p>

        <div
          ref={ctaRef}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#projects"
            style={{
              display: 'inline-block',
              background: '#4F7EFF',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              opacity: 0,
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3a6ae8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#4F7EFF';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Ver Proyectos
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#4F7EFF',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: '1px solid rgba(79,126,255,0.4)',
              opacity: 0,
              transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(79,126,255,0.08)';
              e.currentTarget.style.borderColor = '#4F7EFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(79,126,255,0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contactar
          </a>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: '#8A9BC0',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
        }}
      >
        <span>SCROLL</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #4F7EFF, transparent)' }} />
      </div>
    </section>
  );
}
