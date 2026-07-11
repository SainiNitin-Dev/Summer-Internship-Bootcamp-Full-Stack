export function Card({ children, width = 400 }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: width,
        background: 'var(--bg-panel)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: 32,
      }}
    >
      {children}
    </div>
  );
}

export function Field({ label, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: 18 }}>
      <span
        style={{
          display: 'block',
          fontSize: 12,
          color: 'var(--text-dim)',
          marginBottom: 7,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </span>
      <input
        {...props}
        style={{
          width: '100%',
          padding: '11px 13px',
          background: 'var(--bg-panel-raised)',
          border: '1px solid var(--border)',
          borderRadius: 7,
          color: 'var(--text)',
          fontSize: 14,
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent-dim)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
    </label>
  );
}

export function Button({ children, variant = 'primary', full = true, ...props }) {
  const base = {
    padding: '12px 18px',
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 600,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent',
    transition: 'opacity 0.15s, border-color 0.15s',
    width: full ? '100%' : 'auto',
    opacity: props.disabled ? 0.55 : 1,
  };

  const variants = {
    primary: { background: 'var(--accent)', color: '#08130e' },
    ghost: { background: 'transparent', color: 'var(--text-dim)', borderColor: 'var(--border)' },
    danger: { background: 'transparent', color: 'var(--danger)', borderColor: 'var(--danger-dim)' },
  };

  return (
    <button {...props} style={{ ...base, ...variants[variant] }}>
      {children}
    </button>
  );
}

export function Alert({ kind = 'error', children }) {
  if (!children) return null;
  const colors = {
    error: { border: 'var(--danger-dim)', bg: 'rgba(255,107,107,0.08)', text: 'var(--danger)' },
    success: { border: 'var(--accent-dim)', bg: 'rgba(78,226,163,0.08)', text: 'var(--accent)' },
    warn: { border: '#7a5f22', bg: 'rgba(232,182,78,0.08)', text: 'var(--warn)' },
  };
  const c = colors[kind];
  return (
    <div
      style={{
        border: `1px solid ${c.border}`,
        background: c.bg,
        color: c.text,
        fontSize: 13,
        padding: '10px 13px',
        borderRadius: 7,
        marginBottom: 18,
        lineHeight: 1.5,
      }}
    >
      {children}
    </div>
  );
}
