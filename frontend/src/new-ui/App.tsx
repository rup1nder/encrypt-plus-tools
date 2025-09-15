import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import EncryptPage from './EncryptPage';
import DecryptPage from './DecryptPage';
import FAQ from './FAQ';
import './App.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname === '/' ? '/encrypt' : location.pathname);

  const handleNavClick = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 text-center py-12 px-4">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl shadow-2xl mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CryptoVault
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Military-grade encryption for your most sensitive messages. Secure, fast, and beautiful.
          </p>
        </div>

        <a 
          href="https://github.com/yourusername/encryptdecrypt2" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300 border border-white/20 hover:border-white/40"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-center mb-8">
        <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
          <button
            onClick={() => handleNavClick('/encrypt')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === '/encrypt' || activeTab === '/'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            🔒 Encrypt
          </button>
          <button
            onClick={() => handleNavClick('/decrypt')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === '/decrypt'
                ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            🔓 Decrypt
          </button>
          <button
            onClick={() => handleNavClick('/faq')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === '/faq'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            ❓ FAQ
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-12">
        <Routes>
          <Route path="/encrypt" element={<EncryptPage />} />
          <Route path="/decrypt" element={<DecryptPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/" element={<EncryptPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-white/70 text-sm py-8">
        <p className="mb-2">
          <strong>Disclaimer:</strong> This tool is provided "as is" for convenience.
          Use strong passwords and understand encryption limitations.
        </p>
        <p className="mb-0">
          No personal data is stored. Keys expire after 3 days.
          For security-critical applications, use dedicated encryption software.
        </p>
      </footer>
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