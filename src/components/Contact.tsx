'use client';

import { useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import styles from './Contact.module.css';

const contactLinks = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'kennethlascarro@gmail.com',
    href: 'mailto:kennethlascarro@gmail.com',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/KennethDJLS',
    href: 'https://github.com/KennethDJLS',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/kenneth-lascarro-240086412',
    href: 'https://www.linkedin.com/in/kenneth-lascarro-240086412',
  },
  {
    icon: '📱',
    label: 'Teléfono',
    value: '+57 300 803 1966',
    href: 'tel:+573008031966',
  },
];

export default function Contact() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const linksRef = useScrollReveal<HTMLDivElement>({ direction: 'left', delay: 100 });
  const formRef = useScrollReveal<HTMLDivElement>({ direction: 'right', delay: 200 });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.header}>
          <span className={styles.headerLabel}>05 — Contacto</span>
          <div className={styles.headerLine} />
        </div>

        <div className={styles.grid}>
          {/* Links */}
          <div ref={linksRef}>
            <h2 className={styles.linksTitle}>Hablemos</h2>
            <p className={styles.linksSubtitle}>
              ¿Tienes un proyecto de hardware, IoT o software en mente?
              Estoy disponible para colaboraciones y oportunidades.
            </p>
            <div className={styles.links}>
              {contactLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={styles.linkItem}
                >
                  <span className={styles.linkIcon}>{l.icon}</span>
                  <div className={styles.linkTexts}>
                    <span className={styles.linkLabel}>{l.label}</span>
                    <span className={styles.linkValue}>{l.value}</span>
                  </div>
                  <span className={styles.linkArrow}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={formRef}>
            {sent ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>✓</span>
                <p className={styles.successTitle}>Mensaje enviado</p>
                <p className={styles.successSub}>Te responderé pronto.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                  <label className={styles.fieldLabel}>Nombre</label>
                  <input
                    required
                    className={styles.input}
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className={styles.fieldLabel}>Email</label>
                  <input
                    type="email"
                    required
                    className={styles.input}
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className={styles.fieldLabel}>Mensaje</label>
                  <textarea
                    required
                    rows={6}
                    className={styles.textarea}
                    placeholder="Cuéntame sobre tu proyecto..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Enviar mensaje →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
