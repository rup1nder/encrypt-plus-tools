import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import EncryptPage from './components/EncryptPage';
import DecryptPage from './components/DecryptPage';
import FAQ from './components/FAQ';
import './App.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <header className="text-center mb-4 pb-3 border-bottom">
                <h1 className="h2 mb-2">Secure Encrypt/Decrypt</h1>
                <p className="text-muted small">Protect your confidential messages with RSA encryption</p>
                <a href="https://github.com/yourusername/encryptdecrypt2" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">
                  <i className="fab fa-github me-1"></i>View on GitHub
                </a>
              </header>
              <nav className="mb-4">
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className={`btn flex-fill ${location.pathname === '/encrypt' || location.pathname === '/' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleNavClick('/encrypt')}
                  >
                    🔒 Encrypt
                  </button>
                  <button
                    className={`btn flex-fill ${location.pathname === '/decrypt' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => handleNavClick('/decrypt')}
                  >
                    🔓 Decrypt
                  </button>
                  <button
                    className={`btn flex-fill ${location.pathname === '/faq' ? 'btn-info' : 'btn-outline-info'}`}
                    onClick={() => handleNavClick('/faq')}
                  >
                    ❓ FAQ
                  </button>
                </div>
              </nav>
              <Routes>
                <Route path="/encrypt" element={<EncryptPage />} />
                <Route path="/decrypt" element={<DecryptPage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/" element={<EncryptPage />} />
              </Routes>
              <footer className="mt-5 pt-4 border-top text-center text-muted small">
                <p className="mb-2">
                  <strong>Disclaimer:</strong> This tool is provided "as is" for convenience.
                  Use strong passwords and understand encryption limitations.
                  No personal data is stored. Keys expire after 3 days.
                </p>
                <p className="mb-0">
                  For security-critical applications, use dedicated encryption software.
                  Developers are not liable for data loss or breaches.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
