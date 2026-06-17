import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem',
      background: 'var(--bg2)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.2rem', marginBottom: '0.35rem' }}>
            Orbit<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Built with React Router · Designed for delight</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['/', '/about', '/contact'].map((path, i) => (
            <Link key={path} to={path} style={{ color: 'var(--muted)', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{['Home','About','Contact'][i]}</Link>
          ))}
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>© 2025 Orbit. All rights reserved.</p>
      </div>
    </footer>
  );
}
