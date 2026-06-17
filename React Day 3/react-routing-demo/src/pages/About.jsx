import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FloatingOrbs from '../components/FloatingOrbs';
import Footer from '../components/Footer';

const timeline = [
  { year: '2019', title: 'The beginning', desc: 'Orbit started as a side project in a shared apartment in Bangalore. Two developers, one MacBook, zero sleep.' },
  { year: '2021', title: 'First product', desc: 'Launched our first real product — a routing utility library that quietly shipped in 40+ apps across 12 countries.' },
  { year: '2023', title: 'Growing the team', desc: 'Brought on design and PM talent. Moved into a proper studio. Started obsessing over micro-interactions.' },
  { year: '2025', title: 'Today', desc: 'A tight team of 12 working on tools that help developers build interfaces worth remembering.' },
];

const team = [
  { name: 'Aria Chen', role: 'Design Lead', bio: 'Obsessed with the space between code and beauty. Formerly at Linear.', initial: 'A', color: 'var(--accent2)' },
  { name: 'Dev Kapoor', role: 'Frontend Engineer', bio: 'Wrote his first React component in 2017 and hasn\'t stopped since.', initial: 'D', color: 'var(--accent)' },
  { name: 'Mia Torres', role: 'Product Manager', bio: 'Turns chaos into roadmaps. Somehow loves both designers and engineers.', initial: 'M', color: '#5de8c8' },
  { name: 'Sven Hoffer', role: 'Systems Architect', bio: 'Makes things fast. Then faster. Benchmarks for fun.', initial: 'S', color: '#f56565' },
];

const values = [
  { icon: '🔬', label: 'Craft over speed', desc: 'We ship slowly on purpose. Every pixel is a decision, not an accident.' },
  { icon: '🤝', label: 'Radical honesty', desc: 'We say what we think. Politely, always. Vaguely, never.' },
  { icon: '♾️', label: 'Curious forever', desc: 'The day we stop asking why is the day we stop building anything useful.' },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

export default function About() {
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const timelineRef = useRef(null);
  const tlInView = useInView(timelineRef);

  return (
    <div style={{ paddingTop: '64px' }}>

      {/* HERO */}
      <section style={{ position: 'relative', padding: '7rem 2rem 5rem', maxWidth: '900px', margin: '0 auto', overflow: 'hidden' }}>
        <FloatingOrbs />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeup" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '0.35rem 0.9rem', borderRadius: '50px',
            border: '1px solid rgba(245,166,35,0.25)', background: 'var(--accent-dim)',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem',
          }}>Our story</div>

          <h1 className="animate-fadeup delay-1" style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            lineHeight: 1.0, letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}>
            We build tools<br />
            that feel like{' '}
            <em style={{
              background: 'linear-gradient(135deg, var(--accent2) 0%, #b09ef8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>home.</em>
          </h1>

          <p className="animate-fadeup delay-2" style={{ color: 'var(--muted2)', fontSize: '1.15rem', lineHeight: 1.8, maxWidth: '540px' }}>
            Orbit is a small, opinionated studio that believes software should be fast, honest, and a little bit beautiful. We've been building on the web since before it was fashionable to care about performance.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section ref={timelineRef} style={{ padding: '4rem 2rem 6rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2rem', marginBottom: '3rem', letterSpacing: '-0.02em' }}>
          How we got here
        </h2>
        <div style={{ position: 'relative' }}>
          {/* vertical line */}
          <div style={{ position: 'absolute', left: '72px', top: 0, bottom: 0, width: '1px', background: 'var(--border2)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {timeline.map((item, i) => (
              <div key={i} className={tlInView ? 'animate-fadeup' : ''} style={{
                animationDelay: `${i * 0.15}s`,
                display: 'flex', gap: '2rem', paddingBottom: '3rem', alignItems: 'flex-start',
              }}>
                <div style={{ flexShrink: 0, textAlign: 'right', width: '52px' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.05em' }}>{item.year}</span>
                </div>

                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: 'var(--bg)', border: '2px solid var(--accent)',
                    marginTop: '2px',
                    boxShadow: '0 0 12px rgba(245,166,35,0.4)',
                  }} />
                  {i < timeline.length - 1 && (
                    <div style={{ position: 'absolute', top: '14px', left: '6px', width: '1px', height: 'calc(100% + 3rem)', background: 'transparent' }} />
                  )}
                </div>

                <div style={{ paddingTop: '0' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted2)', fontSize: '0.92rem', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '4rem 2rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: '0.75rem', fontWeight: 600 }}>The people</p>
          <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            Small team.<br /><em>Outsized craft.</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {team.map((member, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredTeam(i)}
              onMouseLeave={() => setHoveredTeam(null)}
              style={{
                background: hoveredTeam === i ? 'var(--surface2)' : 'var(--surface)',
                border: `1px solid ${hoveredTeam === i ? member.color + '50' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                padding: '1.75rem',
                transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                transform: hoveredTeam === i ? 'translateY(-6px)' : 'none',
                cursor: 'default',
                position: 'relative', overflow: 'hidden',
              }}>
              {hoveredTeam === i && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`,
                  animation: 'fadeIn 0.3s ease',
                }} />
              )}
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: `${member.color}18`, border: `1px solid ${member.color}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Instrument Serif, serif', fontSize: '1.4rem',
                color: member.color, marginBottom: '1.25rem',
                transition: 'transform 0.3s',
                transform: hoveredTeam === i ? 'scale(1.1)' : 'none',
              }}>{member.initial}</div>
              <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>{member.name}</div>
              <div style={{ color: member.color, fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{member.role}</div>
              <p style={{ color: 'var(--muted2)', fontSize: '0.875rem', lineHeight: 1.6 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section style={{
        margin: '0 2rem 6rem', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px',
        padding: 'clamp(3rem, 5vw, 5rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,108,248,0.07), transparent 70%)', pointerEvents: 'none' }} />
        <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '3rem', letterSpacing: '-0.02em' }}>
          What we stand for
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          {values.map(({ icon, label, desc }) => (
            <div key={label}>
              <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>{label}</h3>
              <p style={{ color: 'var(--muted2)', fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PULLQUOTE */}
      <section style={{ padding: '2rem 2rem 8rem', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ position: 'absolute', top: '-1.5rem', left: '-1rem', fontFamily: 'Georgia, serif', fontSize: '6rem', color: 'var(--accent2)', opacity: 0.15, lineHeight: 1 }}>"</span>
          <blockquote style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
            fontStyle: 'italic', lineHeight: 1.5,
            color: 'var(--text)', marginBottom: '1.5rem',
          }}>
            The best interface is the one that makes the user forget an interface exists at all.
          </blockquote>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--border2)' }} />
          <span style={{ color: 'var(--muted)', fontSize: '0.82rem', letterSpacing: '0.08em' }}>ORBIT DESIGN PRINCIPLE</span>
          <div style={{ width: '32px', height: '1px', background: 'var(--border2)' }} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
