import React, { useState } from 'react';
import CodeOutput from './CodeOutput';

const LANGUAGES = ['Python', 'Java', 'C++', 'C', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'Scala', 'Dart', 'R'];
const APPROACHES = ['optimized', 'brute', 'both'];

export default function DSAGenerator() {
  const [problem, setProblem] = useState('');
  const [language, setLanguage] = useState('Python');
  const [approach, setApproach] = useState('optimized');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!problem.trim()) return;
    setLoading(true); setResult('');
    try {
      const res = await fetch('http://localhost:8000/generate/dsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, language, approach }),
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
      <h2>🧠 DSA Code Generator</h2>
      <div className="form-group">
        <label>Problem Statement</label>
        <textarea
          rows={4}
          placeholder="e.g. Two Sum — given an array of integers and a target, return indices of two numbers that add up to target."
          value={problem}
          onChange={e => setProblem(e.target.value)}
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
          <label>Approach</label>
          <select value={approach} onChange={e => setApproach(e.target.value)}>
            {APPROACHES.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleGenerate} disabled={loading || !problem.trim()}>
        {loading ? 'Generating...' : '⚡ Generate Solution'}
      </button>
      <CodeOutput result={result} loading={loading} />
    </div>
  );
}