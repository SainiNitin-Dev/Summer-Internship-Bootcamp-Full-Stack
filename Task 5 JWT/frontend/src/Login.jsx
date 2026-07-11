import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Card, Field, Button, Alert } from './ui';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <h1 style={{ fontSize: 20, margin: '0 0 6px' }}>Log in</h1>
      <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '0 0 24px' }}>
        Authenticate to receive an access token.
      </p>

      <Alert kind="error">{error}</Alert>

      <form onSubmit={handleSubmit}>
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={update('email')}
          placeholder="you@example.com"
        />
        <Field
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={update('password')}
          placeholder="••••••••"
        />
        <div style={{ marginTop: 8 }}>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Verifying…' : 'Log in'}
          </Button>
        </div>
      </form>

      <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 20, textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--accent)' }}>
          Create one
        </Link>
      </p>
    </Card>
  );
}
