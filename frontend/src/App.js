import React, { useState, useEffect } from 'react';
import './App.css';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './components/Login';
import DSAGenerator from './components/DSAGenerator';
import GeneralGenerator from './components/GeneralGenerator';
import CodeExplainer from './components/CodeExplainer';
import CodeDebugger from './components/CodeDebugger';

const TABS = [
  { id: 'dsa', label: '🧠 DSA Generator' },
  { id: 'general', label: '⚙️ General Generator' },
  { id: 'explain', label: '📖 Code Explainer' },
  { id: 'debug', label: '🐛 Code Debugger' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dsa');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return (
    <div style={{
      minHeight: '100vh', background: '#0d0d0d',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#a78bfa', fontSize: '1.2rem'
    }}>
      ⚡ Loading...
    </div>
  );

  if (!user) return <Login onLogin={() => {}} />;

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ CodeGen AI</h1>
        <p>Powered by Groq · LLaMA 3 70B</p>
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ color: '#888', fontSize: '0.85rem' }}>👋 {user.displayName || user.email}</span>
          <button
            onClick={() => signOut(auth)}
            style={{
              padding: '6px 14px', borderRadius: '6px',
              border: '1px solid #2e2e2e', background: '#1e1e1e',
              color: '#aaa', cursor: 'pointer', fontSize: '0.8rem'
            }}
          >
            Sign Out
          </button>
        </div>
      </header>
      <nav className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main className="main">
        {activeTab === 'dsa' && <DSAGenerator />}
        {activeTab === 'general' && <GeneralGenerator />}
        {activeTab === 'explain' && <CodeExplainer />}
        {activeTab === 'debug' && <CodeDebugger />}
      </main>
    </div>
  );
}