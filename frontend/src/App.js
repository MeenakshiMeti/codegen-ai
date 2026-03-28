import React, { useState } from 'react';
import './App.css';
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

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ CodeGen AI</h1>
        <p>Powered by Groq · LLaMA 3 70B</p>
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