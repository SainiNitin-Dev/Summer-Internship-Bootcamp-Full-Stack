import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Card, Button, Alert } from './ui';

// Decodes the payload of a JWT WITHOUT verifying the signature — this is purely
// for display purposes in the UI. Real verification always happens server-side.
function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const payload = useMemo(() => (token ? decodeJwtPayload(token) : null), [token]);

  const expiresIn = useMemo(() => {
    if (!payload?.exp) return null;
    const secondsLeft = payload.exp - Math.floor(Date.now() / 1000);
    return secondsLeft > 0 ? secondsLeft : 0;
  }, [payload]);

  async function handleLogout() {
    setError('');
    setLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <Card width={520}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 6px var(--accent)',
          }}
        />
        <span style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '0.04em' }}>AUTHENTICATED</span>
      </div>
      <h1 style={{ fontSize: 20, margin: '4px 0 24px' }}>{user?.name}</h1>

      <Alert kind="error">{error}</Alert>

      <div style={rowGroupStyle}>
        <Row label="Email" value={user?.email} />
        <Row label="User ID" value={user?._id} mono />
        <Row label="Joined" value={user?.createdAt ? new Date(user.createdAt).toLocaleString() : '—'} />
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8 }}>
          Decoded access token payload
        </div>
        <pre style={payloadBoxStyle} className="mono">
          {payload ? JSON.stringify(payload, null, 2) : 'unavailable'}
        </pre>
        {expiresIn !== null && (
          <div style={{ fontSize: 12, color: expiresIn === 0 ? 'var(--danger)' : 'var(--text-faint)', marginTop: 8 }}>
            {expiresIn === 0 ? 'Token expired' : `Expires in ${expiresIn}s`}
          </div>
        )}
      </div>

      <div style={{ marginTop: 28 }}>
        <Button variant="danger" onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? 'Ending session…' : 'Log out'}
        </Button>
      </div>
    </Card>
  );
}

function Row({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{label}</span>
      <span className={mono ? 'mono' : undefined} style={{ fontSize: 13, color: 'var(--text)' }}>
        {value || '—'}
      </span>
    </div>
  );
}

const rowGroupStyle = {
  borderTop: '1px solid var(--border)',
};

const payloadBoxStyle = {
  background: 'var(--bg-panel-raised)',
  border: '1px solid var(--border)',
  borderRadius: 7,
  padding: 14,
  fontSize: 12,
  lineHeight: 1.6,
  color: 'var(--text-dim)',
  overflowX: 'auto',
  margin: 0,
};
