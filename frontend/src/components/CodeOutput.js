import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeOutput({ result, loading, language }) {
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
    a.download = `codegen_output.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('⬇️ Downloaded!');
  };

  if (loading) return (
    <div className="loader"><span>⚡ Generating with Groq...</span></div>
  );

  if (!result) return null;

  // Extract code blocks from result
  const codeBlockRegex = /```[\w]*\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(result)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: result.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'code', content: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < result.length) {
    parts.push({ type: 'text', content: result.slice(lastIndex) });
  }

  const lang = language ? language.toLowerCase() : 'python';

  return (
    <div className="output-section">
      <div className="output-header">
        <span>Output</span>
        <div className="output-actions">
          <button className="btn btn-secondary" onClick={handleCopy}>📋 Copy</button>
          <button className="btn btn-secondary" onClick={handleDownload}>⬇️ Download</button>
        </div>
      </div>

      <div className="output-box" style={{padding: 0, background: 'transparent'}}>
        {parts.length > 0 ? parts.map((part, index) => (
          part.type === 'code' ? (
            <SyntaxHighlighter
              key={index}
              language={lang}
              style={vscDarkPlus}
              customStyle={{
                borderRadius: '10px',
                fontSize: '0.85rem',
                margin: '10px 0',
              }}
            >
              {part.content}
            </SyntaxHighlighter>
          ) : (
            <p key={index} style={{
              padding: '10px 16px',
              color: '#d4d4d4',
              fontSize: '0.88rem',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap'
            }}>
              {part.content}
            </p>
          )
        )) : (
          <SyntaxHighlighter
            language={lang}
            style={vscDarkPlus}
            customStyle={{
              borderRadius: '10px',
              fontSize: '0.85rem',
            }}
          >
            {result}
          </SyntaxHighlighter>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}