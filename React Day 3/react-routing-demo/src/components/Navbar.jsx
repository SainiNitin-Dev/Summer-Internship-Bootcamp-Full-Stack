import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
        background: scrolled ? 'rgba(7,8,16,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '9px',
            background: 'linear-gradient(135deg, var(--accent2) 0%, var(--accent) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(124,108,248,0.4)',
            fontSize: '0.85rem', fontWeight: 700, color: '#fff',
          }}>O</div>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.3rem', letterSpacing: '-0.01em' }}>
            Orbit
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '0.15rem', listStyle: 'none', alignItems: 'center' }}
            className="desktop-nav">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to} end
                style={({ isActive }) => ({
                  padding: '0.45rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent)' : 'var(--muted2)',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  border: isActive ? '1px solid rgba(245,166,35,0.2)' : '1px solid transparent',
                  transition: 'all 0.25s',
                  display: 'block',
                  letterSpacing: isActive ? '0' : '0.01em',
                })}
              >{label}</NavLink>
            </li>
          ))}
          <li style={{ marginLeft: '0.5rem' }}>
            <NavLink to="/contact" style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '50px',
              fontSize: '0.875rem', fontWeight: 600,
              color: '#0d0f14',
              background: 'linear-gradient(135deg, var(--accent) 0%, #f7c05a 100%)',
              boxShadow: '0 2px 12px rgba(245,166,35,0.25)',
              transition: 'all 0.25s',
              display: 'block',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,166,35,0.45)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(245,166,35,0.25)'}
            >Get in touch →</NavLink>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', padding: '4px', flexDirection: 'column', gap: '5px' }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: 'var(--text)', borderRadius: '2px',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 199,
          background: 'rgba(7,8,16,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          animation: 'fadeUp 0.25s ease both',
        }}>
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end style={({ isActive }) => ({
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
              color: isActive ? 'var(--accent)' : 'var(--text)',
              background: isActive ? 'var(--accent-dim)' : 'transparent',
              fontWeight: isActive ? 600 : 400, fontSize: '1rem',
            })}>{label}</NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 680px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
