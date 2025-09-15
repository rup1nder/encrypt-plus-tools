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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Paste your encrypted message:</label>
          <textarea
            className="form-control"
            value={encrypted}
            onChange={(e) => setEncrypted(e.target.value)}
            placeholder="Paste the encrypted text here..."
            rows={4}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter your password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the password used for encryption"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? (
            <>
              Decrypting your message
              <span className="loading"></span>
            </>
          ) : (
            '🔓 Decrypt Message'
          )}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3"><strong>❌ Error:</strong> {error}</div>}
      {result && (
        <div className="alert alert-success mt-3">
          <h5 className="alert-heading">
            🎉 Decrypted Successfully!
            <button className="btn btn-sm btn-outline-light ms-2" onClick={copyToClipboard}>📋 Copy</button>
          </h5>
          <pre className="mb-0">{result}</pre>
        </div>
      )}
      {copySuccess && <div className="alert alert-info mt-3">✅ Copied to clipboard!</div>}
    </div>
  );
};

export default DecryptPage;