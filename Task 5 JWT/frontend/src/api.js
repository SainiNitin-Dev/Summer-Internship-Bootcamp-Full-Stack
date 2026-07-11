const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Thin wrapper around fetch for the auth API.
 * - Always sends credentials so the httpOnly refreshToken cookie works cross-origin.
 * - Automatically attaches the Bearer access token if one is passed in.
 * - Normalizes errors so callers can just catch and read `.message`.
 */
async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      credentials: 'include', // send/receive the refreshToken cookie
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    throw new Error('Could not reach the server. Is the API running and reachable?');
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const authApi = {
  signup: (name, email, password) =>
    request('/api/auth/signup', { method: 'POST', body: { name, email, password } }),

  login: (email, password) =>
    request('/api/auth/login', { method: 'POST', body: { email, password } }),

  logout: (token) => request('/api/auth/logout', { method: 'POST', token }),

  me: (token) => request('/api/auth/me', { method: 'GET', token }),

  health: () => request('/api/health'),
};

export { API_BASE_URL };
