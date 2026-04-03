import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(
        collection(db, 'history'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(items);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'history', id));
    setHistory(history.filter(item => item.id !== id));
  };

  if (loading) return (
    <div className="loader"><span>Loading history...</span></div>
  );

  if (history.length === 0) return (
    <div className="card" style={{ textAlign: 'center', color: '#888', padding: '40px' }}>
      <p>No history yet!</p>
      <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>Generate some code and click 💾 Save to see it here.</p>
    </div>
  );

  return (
    <div className="card">
      <h2>📜 Code History</h2>
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '20px' }}>
        {history.length} saved {history.length === 1 ? 'item' : 'items'}
      </p>
      {history.map(item => (
        <div key={item.id} style={{
          background: '#1a1a1a', border: '1px solid #2a2a2a',
          borderRadius: '10px', padding: '16px', marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <span style={{
                background: '#a78bfa', color: '#fff',
                padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem'
              }}>
                {item.tab}
              </span>
              <span style={{ color: '#888', fontSize: '0.8rem', marginLeft: '10px' }}>
                {item.language}
              </span>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              style={{
                background: 'transparent', border: 'none',
                color: '#ff6666', cursor: 'pointer', fontSize: '0.85rem'
              }}
            >
              🗑️ Delete
            </button>
          </div>
          <pre style={{
            background: '#111', borderRadius: '8px',
            padding: '12px', color: '#d4d4d4',
            fontSize: '0.82rem', overflowX: 'auto',
            maxHeight: '200px', overflowY: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {item.result?.slice(0, 500)}
            {item.result?.length > 500 ? '...' : ''}
          </pre>
        </div>
      ))}
    </div>
  );
}