import React, { useState } from 'react';

export default function CodeOutput({ result, loading }) {
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    showToast('✅ Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codegen_output.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('⬇️ Downloaded!');
  };

  if (loading) return (
    <div className="loader"><span>⚡ Generating with Groq...</span></div>
  );

  if (!result) return null;

  return (
    <div className="output-section">
      <div className="output-header">
        <span>Output</span>
        <div className="output-actions">
          <button className="btn btn-secondary" onClick={handleCopy}>📋 Copy</button>
          <button className="btn btn-secondary" onClick={handleDownload}>⬇️ Download</button>
        </div>
      </div>
      <div className="output-box">{result}</div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}