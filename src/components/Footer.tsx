import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        © {new Date().getFullYear()} Kenneth Lascarro
        <span className={styles.copyRed}> ·</span> Barranquilla, Colombia
      </p>
      <div className={styles.socials}>
        <a href="https://github.com/KennethDJLS" target="_blank" rel="noopener noreferrer" className={styles.social}>
          GitHub
        </a>
        <a href="https://linkedin.com/in/kenneth-lascarro" target="_blank" rel="noopener noreferrer" className={styles.social}>
          LinkedIn
        </a>
        <a href="mailto:kennethlascarro@gmail.com" className={styles.social}>
          Email
        </a>
      </div>
    </footer>
  );
}
