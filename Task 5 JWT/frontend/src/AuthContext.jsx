import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi } from './api';

const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = 'auth_access_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const applySession = useCallback((accessToken, userData) => {
    setToken(accessToken);
    setUser(userData);
    sessionStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }, []);

  // On first load, if a token exists in this tab's session, validate it against /me.
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.me(token);
        if (!cancelled) setUser(res.data.user);
      } catch {
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signup = useCallback(
    async (name, email, password) => {
      const res = await authApi.signup(name, email, password);
      applySession(res.data.accessToken, res.data.user);
      return res.data.user;
    },
    [applySession]
  );

  const login = useCallback(
    async (email, password) => {
      const res = await authApi.login(email, password);
      applySession(res.data.accessToken, res.data.user);
      return res.data.user;
    },
    [applySession]
  );

  const logout = useCallback(async () => {
    try {
      if (token) await authApi.logout(token);
    } finally {
      clearSession();
    }
  }, [token, clearSession]);

  const value = { token, user, loading, signup, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
