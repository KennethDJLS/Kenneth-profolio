export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(79,126,255,0.1)',
        padding: '2rem',
        textAlign: 'center',
        color: '#8A9BC0',
        fontSize: '0.85rem',
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Kenneth De Jesús Lascarro Santiago — Ingeniero Electrónico
      </p>
    </footer>
  );
}
