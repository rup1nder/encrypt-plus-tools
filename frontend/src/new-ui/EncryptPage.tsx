import React, { useState } from 'react';
import axios from 'axios';

const EncryptPage: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    setCopySuccess(false);

    try {
      const response = await axios.post('http://localhost:8080/api/encrypt', {
        plaintext,
        password
      });
      setResult(response.data.encrypted);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Encryption failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Encrypt Your Message
          </span>
        </h2>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Transform your confidential text into an unbreakable encrypted format
        </p>
      </div>

      <div className="glass mb-8">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Your Secret Message
              </label>
              <textarea
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Type your confidential text here..."
                rows={5}
                className="form-control-enhanced w-full resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Create a Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="form-control-enhanced w-full"
                required
              />
              <p className="text-sm text-gray-400 mt-2">
                🔒 This password will be required to decrypt your message
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-enhanced btn-primary-enhanced w-full py-4 text-lg font-semibold"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-enhanced mr-3"></div>
                  Encrypting...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🔒</span>
                  Encrypt Message
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="alert-enhanced alert-danger-enhanced mb-6">
          <div className="flex items-center">
            <span className="text-red-400 mr-3 text-xl">❌</span>
            <span className="font-semibold">Encryption Failed:</span>
            <span className="ml-2">{error}</span>
          </div>
        </div>
      )}

      {result && (
        <div className="glass mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-300 font-semibold flex items-center text-lg">
                <span className="mr-2">🎉</span>
                Encrypted Successfully!
              </h3>
              <button
                onClick={copyToClipboard}
                className="btn-enhanced bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
              >
                <span className="mr-2">📋</span>
                Copy
              </button>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-green-500/30">
              <code className="text-green-300 text-sm break-all font-mono">{result}</code>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              💡 Save this encrypted message and remember your password. You'll need both to decrypt later.
            </p>
          </div>
        </div>
      )}

      {copySuccess && (
        <div className="alert-enhanced alert-success-enhanced">
          <div className="flex items-center">
            <span className="text-green-400 mr-3 text-xl">✅</span>
            <span>Copied to clipboard!</span>
          </div>
        </div>
      )}

      {/* Security Tips */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="glass p-6">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <span className="mr-2">🔐</span>
            Security Tips
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Use long, complex passwords</li>
            <li>• Never reuse passwords from other services</li>
            <li>• Store your password securely</li>
            <li>• Save the encrypted message immediately</li>
          </ul>
        </div>
        
        <div className="glass p-6">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <span className="mr-2">⏰</span>
            Important Notes
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Decryption keys expire after 3 days</li>
            <li>• We don't store your messages</li>
            <li>• Encryption happens on your device</li>
            <li>• Without the password, data is unrecoverable</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EncryptPage;