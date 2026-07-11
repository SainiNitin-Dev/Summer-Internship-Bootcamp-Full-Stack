import { API_BASE_URL } from './api';

export default function Shell({ children }) {
  return (
    <div style={styles.page}>
      <div style={styles.scanline} aria-hidden="true" />
      <header style={styles.header}>
        <div style={styles.brand}>
          <span style={styles.dot} />
          <span style={styles.brandText}>session console</span>
        </div>
        <div style={styles.endpoint} className="mono">
          {API_BASE_URL}
        </div>
      </header>
      <main style={styles.main}>{children}</main>
      <footer style={styles.footer} className="mono">
        JWT auth demo · access + refresh tokens · bcrypt-hashed at rest
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  scanline: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage:
      'radial-gradient(circle at 15% 10%, rgba(78,226,163,0.06), transparent 40%), radial-gradient(circle at 85% 90%, rgba(78,226,163,0.04), transparent 40%)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 28px',
    borderBottom: '1px solid var(--border)',
    zIndex: 1,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--accent)',
    boxShadow: '0 0 8px var(--accent)',
  },
  brandText: {
    fontSize: 13,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--text-dim)',
    fontWeight: 600,
  },
  endpoint: {
    fontSize: 12,
    color: 'var(--text-faint)',
  },
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    zIndex: 1,
  },
  footer: {
    textAlign: 'center',
    padding: '16px',
    fontSize: 11,
    color: 'var(--text-faint)',
    borderTop: '1px solid var(--border)',
    zIndex: 1,
  },
};
