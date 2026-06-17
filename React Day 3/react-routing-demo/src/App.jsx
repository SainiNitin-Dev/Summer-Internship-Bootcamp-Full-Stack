import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageWrapper({ children }) {
  return (
    <div className="page-enter">
      {children}
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*" element={
          <PageWrapper>
            <main style={{ paddingTop: '64px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '64px 2rem 4rem' }}>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '8rem', lineHeight: 1, background: 'linear-gradient(135deg, var(--accent2), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</div>
              <p style={{ color: 'var(--muted2)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>This page slipped into a different dimension.</p>
              <a href="/" style={{ padding: '0.75rem 1.75rem', borderRadius: '50px', background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)', fontWeight: 500 }}>Take me home</a>
            </main>
          </PageWrapper>
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
