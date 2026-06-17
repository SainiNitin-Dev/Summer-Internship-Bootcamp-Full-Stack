import { useState, useRef } from 'react';
import FloatingOrbs from '../components/FloatingOrbs';
import Footer from '../components/Footer';

const reasons = ['New project', 'Freelance work', 'Just saying hi', 'Partnership', 'Other'];

const socials = [
  { label: 'Twitter / X', handle: '@orbit_dev', icon: '𝕏' },
  { label: 'GitHub', handle: 'github.com/orbit', icon: '⌥' },
  { label: 'Linear', handle: 'orbit.linear.app', icon: '◈' },
];

function Field({ label, children, style }) {
  return (
    <div style={style}>
      <label style={{
        display: 'block', fontSize: '0.75rem', color: 'var(--muted)',
        textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
        marginBottom: '0.5rem',
      }}>{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const inputBase = (name) => ({
    width: '100%', padding: '0.8rem 1rem',
    background: focused === name ? 'var(--surface2)' : 'var(--surface)',
    border: `1px solid ${focused === name ? 'rgba(124,108,248,0.5)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.95rem',
    outline: 'none', fontFamily: 'Inter, sans-serif',
    transition: 'all 0.25s',
    boxShadow: focused === name ? '0 0 0 3px rgba(124,108,248,0.1)' : 'none',
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1400);
  };

  return (
    <div style={{ paddingTop: '64px' }}>
      <section style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '6rem 2rem 6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
        <FloatingOrbs />

        {/* LEFT */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeup" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '0.35rem 0.9rem', borderRadius: '50px',
            border: '1px solid rgba(245,166,35,0.25)', background: 'var(--accent-dim)',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem',
          }}>Let's talk</div>

          <h1 className="animate-fadeup delay-1" style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
          }}>
            We'd love to<br />
            hear from{' '}
            <em style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #f7c05a 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>you.</em>
          </h1>

          <p className="animate-fadeup delay-2" style={{ color: 'var(--muted2)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
            Whether you have a project in mind or just want to explore what's possible — drop us a message. We read every single one.
          </p>

          {/* Info cards */}
          <div className="animate-fadeup delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
            {[
              { icon: '📬', label: 'Email', value: 'hello@orbit.dev' },
              { icon: '🕐', label: 'Response time', value: 'Within 24 hours' },
              { icon: '🌍', label: 'Based in', value: 'Remote · Global' },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.875rem 1.125rem',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
              }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: '0.92rem', marginTop: '0.1rem' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '1rem' }}>Find us at</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {socials.map(({ label, handle, icon }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 700 }}>{icon}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{label}</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--accent2)' }}>{handle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {sent ? (
            <div className="animate-fadeup" style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '20px', padding: '4rem 2rem', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.07), transparent 70%)', pointerEvents: 'none' }} />
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'var(--accent-dim)', border: '1px solid rgba(245,166,35,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem', fontSize: '1.5rem',
                animation: 'float 3s ease-in-out infinite',
              }}>✓</div>
              <h3 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.8rem', marginBottom: '0.75rem' }}>Message sent!</h3>
              <p style={{ color: 'var(--muted2)', fontSize: '0.95rem', lineHeight: 1.7 }}>We'll get back to you at<br /><strong style={{ color: 'var(--text)' }}>{form.email}</strong> within 24 hours.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', reason: '', message: '' }); }}
                style={{
                  marginTop: '2rem', padding: '0.65rem 1.5rem', borderRadius: '50px',
                  border: '1px solid var(--border2)', background: 'transparent',
                  color: 'var(--muted2)', fontSize: '0.85rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.target.style.borderColor = 'var(--muted)'}
                onMouseLeave={e => e.target.style.borderColor = 'var(--border2)'}
              >Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '20px', padding: 'clamp(2rem, 4vw, 2.5rem)',
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <Field label="Name">
                  <input name="name" value={form.name} onChange={onChange} placeholder="Your name" required
                    style={inputBase('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                </Field>
                <Field label="Email">
                  <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" required
                    style={inputBase('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                </Field>
              </div>

              <Field label="Reason for reaching out">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {reasons.map(r => (
                    <button type="button" key={r} onClick={() => setForm(f => ({ ...f, reason: r }))} style={{
                      padding: '0.4rem 0.9rem', borderRadius: '50px', fontSize: '0.82rem',
                      border: `1px solid ${form.reason === r ? 'rgba(124,108,248,0.5)' : 'var(--border)'}`,
                      background: form.reason === r ? 'var(--accent2-dim)' : 'transparent',
                      color: form.reason === r ? 'var(--accent2)' : 'var(--muted2)',
                      fontWeight: form.reason === r ? 600 : 400,
                      transition: 'all 0.2s', cursor: 'pointer',
                    }}>{r}</button>
                  ))}
                </div>
              </Field>

              <Field label="Message">
                <textarea name="message" value={form.message} onChange={onChange} placeholder="Tell us what you're thinking..." rows={5} required
                  style={{ ...inputBase('message'), resize: 'vertical', minHeight: '130px' }}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
              </Field>

              <button type="submit" disabled={sending} style={{
                padding: '0.9rem 2rem', borderRadius: '50px',
                background: sending ? 'var(--surface2)' : 'linear-gradient(135deg, var(--accent2) 0%, #9b8df5 100%)',
                border: 'none', color: sending ? 'var(--muted)' : '#fff',
                fontWeight: 700, fontSize: '0.95rem',
                boxShadow: sending ? 'none' : '0 4px 20px rgba(124,108,248,0.3)',
                transition: 'all 0.3s', cursor: sending ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
                onMouseEnter={e => !sending && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = '')}
              >
                {sending ? (
                  <>
                    <span style={{ width: '14px', height: '14px', border: '2px solid var(--muted)', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin-slow 0.8s linear infinite' }} />
                    Sending…
                  </>
                ) : 'Send message →'}
              </button>
            </form>
          )}
        </div>

        <style>{`
          @media (max-width: 760px) {
            section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}
