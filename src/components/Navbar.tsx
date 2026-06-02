'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Educación', href: '#education' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(13,22,38,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(79,126,255,0.15)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <span style={{ color: '#4F7EFF', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
        KL<span style={{ color: '#E8EDF8' }}>.</span>
      </span>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }} className="hidden-mobile">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                color: '#8A9BC0',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#4F7EFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BC0')}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px',
        }}
        className="show-mobile"
        aria-label="Menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              background: '#4F7EFF',
              borderRadius: '2px',
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: 'rgba(13,22,38,0.97)',
            borderBottom: '1px solid rgba(79,126,255,0.2)',
            padding: '1rem 2rem',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                color: '#8A9BC0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
