import React, { useState } from 'react';
import CodeOutput from './CodeOutput';

const LANGUAGES = ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Java', 'C++', 'C', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'Scala', 'Dart', 'R', 'Bash', 'SQL'];

export default function CodeExplainer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!code.trim()) return;
    setLoading(true); setResult('');
    try {
      const res = await fetch('https://codegen-ai-backend.onrender.com/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch {
      setResult('❌ Error connecting to backend. Make sure it is running on port 8000.');
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>📖 Code Explainer</h2>
      <div className="form-group">
        <label>Paste your code here</label>
        <textarea
          rows={8}
          placeholder="Paste any code here and get a clear, step-by-step explanation..."
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Language</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {LANGUAGES.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleExplain} disabled={loading || !code.trim()}>
        {loading ? 'Explaining...' : '📖 Explain Code'}
      </button>
      <CodeOutput result={result} loading={loading} language={language} />
    </div>
  );
}