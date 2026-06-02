'use client';

import { useState } from 'react';
import { useScrollReveal } from './useScrollReveal';

export default function Contact() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();
  const infoRef = useScrollReveal<HTMLDivElement>();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production connect to a serverless function or Resend/EmailJS
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#1E2D4F',
    border: '1px solid rgba(79,126,255,0.2)',
    borderRadius: '10px',
    padding: '0.85rem 1.1rem',
    color: '#E8EDF8',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <section id="contact" style={{ padding: '6rem 2rem 8rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div ref={headingRef} style={{ marginBottom: '3rem' }}>
        <span style={{ color: '#4F7EFF', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
          — Contacto
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0.5rem 0 0', lineHeight: 1.1 }}>
          Hablemos
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }} className="contact-grid">
        <div ref={infoRef}>
          <p style={{ color: '#8A9BC0', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            ¿Tienes un proyecto electrónico en mente? Estoy disponible para colaboraciones
            freelance, consultoría técnica y oportunidades de trabajo.
          </p>

          {[
            { icon: '✉️', label: 'Email', value: 'kenneth@email.com' },
            { icon: '📍', label: 'Ubicación', value: 'Colombia' },
            { icon: '🔗', label: 'LinkedIn', value: '/in/kennethlascarro' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <div>
                <div style={{ color: '#8A9BC0', fontSize: '0.75rem', marginBottom: '0.15rem' }}>{item.label}</div>
                <div style={{ color: '#E8EDF8', fontSize: '0.95rem' }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div ref={formRef}>
          {sent ? (
            <div style={{
              background: 'rgba(79,126,255,0.1)',
              border: '1px solid rgba(79,126,255,0.3)',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ color: '#4F7EFF', marginBottom: '0.5rem' }}>Mensaje enviado</h3>
              <p style={{ color: '#8A9BC0' }}>Te responderé lo antes posible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', color: '#8A9BC0', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Nombre
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#4F7EFF')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(79,126,255,0.2)')}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#8A9BC0', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#4F7EFF')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(79,126,255,0.2)')}
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#8A9BC0', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Mensaje
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#4F7EFF')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(79,126,255,0.2)')}
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>
              <button
                type="submit"
                style={{
                  background: '#4F7EFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.9rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.15s',
                  fontFamily: 'inherit',
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
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
