import React, { useState } from 'react';
import CodeOutput from './CodeOutput';

const LANGUAGES = ['Python', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'C++', 'C', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'Scala', 'Dart', 'R', 'Bash', 'SQL'];
const MODES = ['function', 'class', 'script', 'api', 'test'];

export default function GeneralGenerator() {
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('Python');
  const [mode, setMode] = useState('function');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true); setResult('');
    try {
      const res = await fetch('http://localhost:8000/generate/general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, language, mode }),
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
      <h2>⚙️ General Code Generator</h2>
      <div className="form-group">
        <label>Describe what you want to build</label>
        <textarea
          rows={4}
          placeholder="e.g. A function that reads a CSV file and returns a list of dictionaries with column names as keys."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="row">
        <div className="form-group">
          <label>Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            {LANGUAGES.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Mode</label>
          <select value={mode} onChange={e => setMode(e.target.value)}>
            {MODES.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleGenerate} disabled={loading || !description.trim()}>
        {loading ? 'Generating...' : '⚡ Generate Code'}
      </button>
      <CodeOutput result={result} loading={loading} />
    </div>
  );
}