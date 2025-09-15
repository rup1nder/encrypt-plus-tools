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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter your secret message:</label>
          <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            placeholder="Type your confidential text here..."
            rows={4}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Create a password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a strong password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              Encrypting your message
              <span className="loading"></span>
            </>
          ) : (
            '🔒 Encrypt Message'
          )}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3"><strong>❌ Error:</strong> {error}</div>}
      {result && (
        <div className="alert alert-success mt-3">
          <h5 className="alert-heading">
            🎉 Encrypted Successfully!
            <button className="btn btn-sm btn-outline-light ms-2" onClick={copyToClipboard}>📋 Copy</button>
          </h5>
          <pre className="mb-0">{result}</pre>
        </div>
      )}
      {copySuccess && <div className="alert alert-info mt-3">✅ Copied to clipboard!</div>}
    </div>
  );
};

export default EncryptPage;