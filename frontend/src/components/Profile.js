import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Profile() {
  const user = auth.currentUser;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const q = query(
        collection(db, 'history'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  const languages = [...new Set(history.map(h => h.language))];

  return (
    <div>
      {/* Profile Card */}
      <div className="card" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <img
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=a78bfa&color=fff&size=100`}
          alt="Profile"
          style={{ width: '90px', height: '90px', borderRadius: '50%', marginBottom: '12px', border: '3px solid #a78bfa' }}
        />
        <h2 style={{ color: '#e0e0e0', marginBottom: '4px' }}>
          {user.displayName || 'User'}
        </h2>
        <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '16px' }}>
          {user.email}
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '10px' }}>
          <div>
            <p style={{ color: '#a78bfa', fontSize: '1.8rem', fontWeight: '700' }}>
              {history.length}
            </p>
            <p style={{ color: '#888', fontSize: '0.8rem' }}>Codes Saved</p>
          </div>
          <div>
            <p style={{ color: '#a78bfa', fontSize: '1.8rem', fontWeight: '700' }}>
              {languages.length}
            </p>
            <p style={{ color: '#888', fontSize: '0.8rem' }}>Languages</p>
          </div>
          <div>
            <p style={{ color: '#a78bfa', fontSize: '1.8rem', fontWeight: '700' }}>
              {[...new Set(history.map(h => h.tab))].length}
            </p>
            <p style={{ color: '#888', fontSize: '0.8rem' }}>Tools Used</p>
          </div>
        </div>

        {/* Languages used */}
        {languages.length > 0 && (
          <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {languages.map(lang => (
              <span key={lang} style={{
                background: '#1e1e1e', border: '1px solid #a78bfa',
                color: '#a78bfa', padding: '4px 12px',
                borderRadius: '20px', fontSize: '0.78rem'
              }}>
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Code History */}
      <div className="card">
        <h2 style={{ marginBottom: '16px' }}>📜 Code History</h2>
        {loading ? (
          <div className="loader"><span>Loading...</span></div>
        ) : history.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
            No history yet! Generate some code and click 💾 Save.
          </p>
        ) : (
          history.map(item => (
            <div key={item.id} style={{
              background: '#1a1a1a', border: '1px solid #2a2a2a',
              borderRadius: '10px', padding: '16px', marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    background: '#a78bfa', color: '#fff',
                    padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem'
                  }}>
                    {item.tab}
                  </span>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>
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
          ))
        )}
      </div>
    </div>
  );
}