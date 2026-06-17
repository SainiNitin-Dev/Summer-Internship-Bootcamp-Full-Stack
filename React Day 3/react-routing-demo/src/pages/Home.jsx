import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ParticleCanvas from '../components/ParticleCanvas';
import FloatingOrbs from '../components/FloatingOrbs';
import Footer from '../components/Footer';

function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = ts => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

function StatCard({ value, suffix, label, delay, inView }) {
  const num = useCountUp(value, 1600, inView);
  return (
    <div className="animate-fadeup" style={{ animationDelay: delay, textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Instrument Serif, serif',
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        lineHeight: 1,
        background: 'linear-gradient(135deg, var(--accent) 0%, #f7c05a 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: '0.4rem',
      }}>{num.toLocaleString()}{suffix}</div>
      <div style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

const features = [
  {
    icon: '⚡',
    title: 'Instant navigation',
    desc: 'Client-side routing means zero full-page reloads. Transitions happen in under 16ms — the browser never blinks.',
    accent: 'var(--accent)',
    size: 'large',
  },
  {
    icon: '🎯',
    title: 'Active link awareness',
    desc: 'NavLink tracks every active route automatically.',
    accent: 'var(--accent2)',
    size: 'small',
  },
  {
    icon: '🧩',
    title: 'Shared layouts',
    desc: 'Navbar persists. Only the page slot swaps. Your UI feels like a native app.',
    accent: 'var(--accent)',
    size: 'small',
  },
  {
    icon: '🛡️',
    title: 'Nested routes & guards',
    desc: 'Protect pages, nest layouts infinitely, and handle 404s with a single catch-all route — all declarative.',
    accent: 'var(--accent2)',
    size: 'large',
  },
];

const marqueeItems = ['React Router v6', 'BrowserRouter', 'NavLink', 'useNavigate', 'useParams', 'Outlet', 'createBrowserRouter', 'Nested Routes', 'Route Guards', 'Lazy Loading'];

export default function Home() {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onMove = e => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div style={{ paddingTop: '64px' }}>

      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <ParticleCanvas />
        <FloatingOrbs />

        {/* grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(30,34,54,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,34,54,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at center, black 20%, transparent 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '4rem 2rem', maxWidth: '900px' }}>
          {/* badge */}
          <div className="animate-fadeup" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '0.35rem 1rem',
            borderRadius: '50px',
            border: '1px solid rgba(124,108,248,0.3)',
            background: 'rgba(124,108,248,0.08)',
            fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--accent2)',
            marginBottom: '2rem',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent2)',
              boxShadow: '0 0 8px var(--accent2)',
              animation: 'glow-pulse 2s ease-in-out infinite',
            }} />
            React Router Demo · 2025
          </div>

          <h1 className="animate-fadeup delay-1" style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            marginBottom: '1.5rem',
            transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -4}px)`,
            transition: 'transform 0.1s ease-out',
          }}>
            Navigate the<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #f7c05a 40%, var(--accent2) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}>universe</span>{' '}
            <em>of</em><br />
            modern web.
          </h1>

          <p className="animate-fadeup delay-2" style={{
            color: 'var(--muted2)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.75, maxWidth: '540px', margin: '0 auto 3rem',
            transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -2}px)`,
            transition: 'transform 0.15s ease-out',
          }}>
            Orbit is a showcase of what happens when React Router meets obsessive attention to motion, layout, and craft.
          </p>

          <div className="animate-fadeup delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.85rem 2rem', borderRadius: '50px',
              background: 'linear-gradient(135deg, var(--accent2) 0%, #9b8df5 100%)',
              color: '#fff', fontWeight: 600, fontSize: '0.95rem',
              boxShadow: '0 4px 24px rgba(124,108,248,0.35)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,108,248,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,108,248,0.35)'; }}
            >
              Explore Orbit →
            </Link>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.85rem 2rem', borderRadius: '50px',
              border: '1px solid var(--border2)', color: 'var(--text)',
              fontWeight: 500, fontSize: '0.95rem',
              background: 'rgba(255,255,255,0.03)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'var(--muted)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
            >
              Say hello
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          animation: 'float 2.5s ease-in-out infinite',
        }}>
          <span>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', overflow: 'hidden', padding: '1rem 0' }}>
        <div style={{ display: 'flex', animation: 'marquee 20s linear infinite', width: 'max-content' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ padding: '0 2.5rem', color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.06em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              {item}
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent2)', display: 'inline-block', opacity: 0.5 }} />
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section ref={statsRef} style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '3rem' }}>
          {statsVisible && (
            <>
              <StatCard value={4} suffix="+" label="Pages routed" delay="0s" inView={statsVisible} />
              <StatCard value={160} suffix="" label="Live particles" delay="0.1s" inView={statsVisible} />
              <StatCard value={0} suffix="ms" label="Page reload time" delay="0.2s" inView={statsVisible} />
              <StatCard value={100} suffix="%" label="Client-side" delay="0.3s" inView={statsVisible} />
            </>
          )}
        </div>
      </section>

      {/* BENTO FEATURES */}
      <section style={{ padding: '2rem 2rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: '0.75rem', fontWeight: 600 }}>
            What's under the hood
          </p>
          <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Routing, but make it<br /><em>feel alive.</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {features.map((f, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? 'var(--surface2)' : 'var(--surface)',
                border: `1px solid ${hovered === i ? f.accent + '40' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                padding: '2rem',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                transform: hovered === i ? 'translateY(-4px)' : 'none',
                boxShadow: hovered === i ? `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${f.accent}20` : 'none',
                position: 'relative', overflow: 'hidden',
                cursor: 'default',
              }}>
              {hovered === i && (
                <div style={{
                  position: 'absolute', top: '-50%', right: '-20%',
                  width: '200px', height: '200px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${f.accent}12, transparent 70%)`,
                  pointerEvents: 'none',
                  animation: 'fadeIn 0.3s ease',
                }} />
              )}
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: `${f.accent}18`, border: `1px solid ${f.accent}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', marginBottom: '1.25rem',
                transition: 'all 0.3s',
                transform: hovered === i ? 'scale(1.1) rotate(-5deg)' : 'none',
              }}>{f.icon}</div>
              <h3 style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.6rem', color: hovered === i ? 'var(--text)' : 'var(--text)' }}>{f.title}</h3>
              <p style={{ color: 'var(--muted2)', fontSize: '0.9rem', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{
        margin: '0 2rem 6rem',
        maxWidth: '1100px',
        marginLeft: 'auto', marginRight: 'auto',
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        border: '1px solid var(--border2)',
        borderRadius: '20px',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,108,248,0.08), transparent 70%)', pointerEvents: 'none' }} />
        <div>
          <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em', marginBottom: '0.75rem', lineHeight: 1.1 }}>
            Ready to build<br />something great?
          </h2>
          <p style={{ color: 'var(--muted2)', fontSize: '1rem', maxWidth: '420px', lineHeight: 1.7 }}>
            Every project starts with a conversation. Tell us what you're building and let's figure out the rest together.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
          <Link to="/contact" style={{
            padding: '0.9rem 2.2rem', borderRadius: '50px',
            background: 'linear-gradient(135deg, var(--accent) 0%, #f7c05a 100%)',
            color: '#0d0f14', fontWeight: 700, fontSize: '0.95rem',
            boxShadow: '0 4px 20px rgba(245,166,35,0.3)',
            textAlign: 'center',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(245,166,35,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,166,35,0.3)'; }}
          >Start a project →</Link>
          <Link to="/about" style={{ textAlign: 'center', color: 'var(--muted2)', fontSize: '0.875rem', padding: '0.5rem' }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted2)'}
          >Meet the team</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
