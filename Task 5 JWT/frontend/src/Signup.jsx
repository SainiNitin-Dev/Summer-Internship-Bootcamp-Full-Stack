import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Card, Field, Button, Alert } from './ui';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <h1 style={{ fontSize: 20, margin: '0 0 6px' }}>Create account</h1>
      <p style={{ fontSize: 13, color: 'var(--text-dim)', margin: '0 0 24px' }}>
        Password needs 8+ chars, upper, lower, number, and a symbol.
      </p>

      <Alert kind="error">{error}</Alert>

      <form onSubmit={handleSubmit}>
        <Field label="Name" type="text" required value={form.name} onChange={update('name')} placeholder="Nitin" />
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
            {submitting ? 'Creating account…' : 'Create account'}
          </Button>
        </div>
      </form>

      <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 20, textAlign: 'center' }}>
        Already registered?{' '}
        <Link to="/login" style={{ color: 'var(--accent)' }}>
          Log in
        </Link>
      </p>
    </Card>
  );
}
