import React, { useState } from 'react';
import CodeOutput from './CodeOutput';

const LANGUAGES = ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Java', 'C++', 'C', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'Scala', 'Dart', 'R', 'Bash', 'SQL'];

export default function CodeDebugger() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('Python');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    if (!code.trim()) return;
    setLoading(true); setResult('');
    try {
      const res = await fetch('https://codegen-ai-backend.onrender.com/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, error }),
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
      <h2>🐛 Code Debugger</h2>
      <div className="form-group">
        <label>Paste your buggy code</label>
        <textarea
          rows={7}
          placeholder="Paste the code that has bugs or isn't working as expected..."
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Error message (optional)</label>
        <input
          type="text"
          placeholder="e.g. TypeError: unsupported operand type(s) for +: 'int' and 'str'"
          value={error}
          onChange={e => setError(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Language</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {LANGUAGES.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleDebug} disabled={loading || !code.trim()}>
        {loading ? 'Debugging...' : '🐛 Debug Code'}
      </button>
      <CodeOutput result={result} loading={loading} language={language} />
    </div>
  );
}