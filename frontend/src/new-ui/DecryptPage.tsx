import React, { useState } from 'react';
import axios from 'axios';

const DecryptPage: React.FC = () => {
  const [encrypted, setEncrypted] = useState('');
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
      const response = await axios.post('http://localhost:8080/api/decrypt', {
        encrypted,
        password
      });
      setResult(response.data.plaintext);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Decryption failed');
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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Decrypt Your Message
          </span>
        </h2>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Unlock your confidential text with the correct password
        </p>
      </div>

      <div className="glass mb-8">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Encrypted Message
              </label>
              <textarea
                value={encrypted}
                onChange={(e) => setEncrypted(e.target.value)}
                placeholder="Paste the encrypted text here..."
                rows={5}
                className="form-control-enhanced w-full resize-none"
                required
              />
              <p className="text-sm text-gray-400 mt-2">
                📋 Paste the encrypted message you received
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Your Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the password used for encryption"
                className="form-control-enhanced w-full"
                required
              />
              <p className="text-sm text-gray-400 mt-2">
                🔑 This must match the password used during encryption
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-enhanced btn-success-enhanced w-full py-4 text-lg font-semibold"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-enhanced mr-3"></div>
                  Decrypting...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🔓</span>
                  Decrypt Message
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
            <span className="font-semibold">Decryption Failed:</span>
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
                Decrypted Successfully!
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
              <p className="text-green-300 text-sm font-mono">{result}</p>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              ✅ Your original message has been successfully recovered
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

      {/* Help Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="glass p-6">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Having Issues?
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Ensure you have the correct password</li>
            <li>• Check that the encrypted text is complete</li>
            <li>• Verify the text hasn't been modified</li>
            <li>• Make sure you're using the same encryption method</li>
          </ul>
        </div>
        
        <div className="glass p-6">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <span className="mr-2">🔒</span>
            Security Reminder
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Never share your password</li>
            <li>• Store passwords securely</li>
            <li>• Verify message authenticity</li>
            <li>• Use strong, unique passwords</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DecryptPage;