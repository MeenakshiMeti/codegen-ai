import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEmailAuth = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0d0d0d',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#151515', border: '1px solid #222',
        borderRadius: '16px', padding: '40px', width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: '#a78bfa', textAlign: 'center', marginBottom: '8px' }}>
          ⚡ CodeGen AI
        </h1>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: '28px' }}>
          {isRegister ? 'Create an account' : 'Sign in to continue'}
        </p>

        {error && (
          <div style={{
            background: '#2a1a1a', border: '1px solid #ff4444',
            borderRadius: '8px', padding: '10px', marginBottom: '16px',
            color: '#ff6666', fontSize: '0.85rem'
          }}>
            {error}
          </div>
        )}

        <button onClick={handleGoogle} disabled={loading} style={{
          width: '100%', padding: '12px', borderRadius: '8px',
          border: '1px solid #2e2e2e', background: '#1e1e1e',
          color: '#e0e0e0', cursor: 'pointer', fontSize: '0.95rem',
          marginBottom: '20px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '10px'
        }}>
          <img src="https://www.google.com/favicon.ico" width="18" alt="Google" />
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', color: '#555', marginBottom: '20px' }}>
          — or —
        </div>

        <div style={{ marginBottom: '14px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px',
              background: '#1e1e1e', border: '1px solid #2e2e2e',
              borderRadius: '8px', color: '#e0e0e0', fontSize: '0.95rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px',
              background: '#1e1e1e', border: '1px solid #2e2e2e',
              borderRadius: '8px', color: '#e0e0e0', fontSize: '0.95rem'
            }}
          />
        </div>

        <button onClick={handleEmailAuth} disabled={loading} style={{
          width: '100%', padding: '12px', borderRadius: '8px',
          border: 'none', background: '#a78bfa',
          color: '#fff', cursor: 'pointer', fontSize: '0.95rem',
          fontWeight: '600', marginBottom: '16px'
        }}>
          {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.88rem' }}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: '#a78bfa', cursor: 'pointer' }}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}