import React, { useState } from 'react';
import { Search, X, User, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const mockRecords = [
    { type: 'Student', name: 'Ruwin', meta: 'Grade 10-A', target: 'students' },
    { type: 'Student', name: 'Tharin', meta: 'Grade 11-B', target: 'students' },
    { type: 'Student', name: 'Amoda', meta: 'Grade 10-B', target: 'students' },
    { type: 'Student', name: 'Hasini', meta: 'Grade 12-A', target: 'students' },
    { type: 'Teacher', name: 'Sajith', meta: 'Mathematics Department', target: 'teachers' },
    { type: 'Teacher', name: 'Rehan', meta: 'Biology Department', target: 'teachers' },
    { type: 'Teacher', name: 'Amal', meta: 'History Department', target: 'teachers' },
    { type: 'Teacher', name: 'Siriwardhane', meta: 'Physics Department', target: 'teachers' },
    { type: 'Parent', name: 'Amitha', meta: 'Parent of Ruwin & Hasini', target: 'parents' },
    { type: 'Parent', name: 'Supuni', meta: 'Parent of Tharin', target: 'parents' },
    { type: 'Parent', name: 'Ajith', meta: 'Parent of Amoda', target: 'parents' },
    { type: 'Subject', name: 'Calculus & Advanced Algebra', meta: 'MATH-201', target: 'subjects' },
    { type: 'Subject', name: 'Cell Division & Genetics', meta: 'BIO-104', target: 'subjects' },
  ];

  const results = query.trim()
    ? mockRecords.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.meta.toLowerCase().includes(query.toLowerCase()) ||
          r.type.toLowerCase().includes(query.toLowerCase())
      )
    : mockRecords;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={18} color="#4f46e5" />
            <h3 className="modal-title">Global Quick Jump</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Type student name (Ruwin, Tharin...), teacher, subject code, or role..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  border: '1px solid #f1f5f9',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  onNavigate(item.target);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {item.type === 'Student' && <User size={16} color="#15803d" />}
                  {item.type === 'Teacher' && <GraduationCap size={16} color="#1d4ed8" />}
                  {item.type === 'Subject' && <BookOpen size={16} color="#4f46e5" />}
                  {item.type === 'Parent' && <User size={16} color="#7e22ce" />}

                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.meta}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#4f46e5', fontWeight: 600 }}>
                  <span>{item.type}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.875rem' }}>
              No matching records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
