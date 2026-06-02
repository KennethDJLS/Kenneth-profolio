'use client';

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const links = [
  { label: 'Proyectos', href: '#projects' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <a href="#hero" className={styles.logo}>
        KL<span>.</span>
      </a>

      {/* Desktop */}
      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={styles.link}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="/cv.pdf" download className={styles.cvBtn}>
            CV ↓
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className={styles.burger}
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>

      {open && (
        <div className={styles.mobileMenu}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="/cv.pdf" download className={styles.mobileLink} style={{ color: '#E53E3E' }}>
            CV ↓
          </a>
        </div>
      )}
    </nav>
  );
}
