'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

/* ── Particle canvas ── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

function initParticles(w: number, h: number, count = 80): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 1.5 + 0.5,
  }));
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  w: number,
  h: number
) {
  ctx.clearRect(0, 0, w, h);
  const MAX_DIST = 90;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    // dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(229,62,62,0.6)';
    ctx.fill();

    // connections
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        const alpha = (1 - dist / MAX_DIST) * 0.25;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(229,62,62,${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  }
}

/* ── Typewriter words ── */
const WORDS = ['Hardware Designer', 'IoT Engineer', 'Electronic Engineer'];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriter state
  const [displayText, setDisplayText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  /* ── Canvas loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = initParticles(canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const loop = () => {
      drawParticles(ctx, particles, canvas.width, canvas.height);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Typewriter loop ── */
  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayText.length < word.length) {
        timeout = setTimeout(
          () => setDisplayText(word.slice(0, displayText.length + 1)),
          80
        );
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1800);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          45
        );
      } else {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, wordIdx, phase]);

  /* ── Entrance timeline ── */
  useEffect(() => {
    (async () => {
      const { createTimeline } = await import('animejs');
      const tl = createTimeline({ defaults: { ease: 'outExpo' } });

      tl.add(badgeRef.current!, { opacity: [0, 1], translateY: [-15, 0], duration: 600 }, 300)
        .add(nameRef.current!, { opacity: [0, 1], translateY: [50, 0], duration: 900 }, 600)
        .add(typeRef.current!, { opacity: [0, 1], translateY: [20, 0], duration: 700 }, 1000)
        .add(tagRef.current!, { opacity: [0, 1], translateY: [20, 0], duration: 700 }, 1200)
        .add(ctaRef.current!, { opacity: [0, 1], translateY: [20, 0], duration: 700 }, 1400)
        .add(scrollRef.current!, { opacity: [0, 0.9], duration: 800 }, 2000);
    })();
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        <span ref={badgeRef} className={styles.badge}>
          — Ingeniero Electrónico · Barranquilla
        </span>

        <h1 ref={nameRef} className={styles.nameBlock}>
          <span className={styles.nameLine1}>Kenneth De Jesús</span>
          <span className={styles.nameLine2}>Lascarro</span>
        </h1>

        <div ref={typeRef} className={styles.typewriterWrap}>
          <span className={styles.typewriterText}>{displayText}</span>
          <span className={styles.cursor} aria-hidden />
        </div>

        <p ref={tagRef} className={styles.tagline}>
          The real world speaks in analog.{' '}
          <span className={styles.taglineRed}>I translate.</span>
        </p>

        <div ref={ctaRef} className={styles.ctas}>
          <a href="#projects" className={styles.btnPrimary}>
            Ver Proyectos
          </a>
          <a href="#contact" className={styles.btnGhost}>
            Contacto
          </a>
        </div>
      </div>

      <div ref={scrollRef} className={styles.scrollCue}>
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
