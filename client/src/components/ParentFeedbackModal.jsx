import React, { useState } from 'react';
import { MessageSquare, X, Send, HeartHandshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ParentFeedbackModal = ({ isOpen, onClose, onSubmitFeedback }) => {
  const { user } = useAuth();
  const [type, setType] = useState('Idea / Suggestion');
  const [department, setDepartment] = useState('Academics & Teachers');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) return;

    onSubmitFeedback({
      id: 'fb-' + Date.now(),
      parentName: user ? user.name : 'Sarah W.',
      type,
      department,
      subject,
      message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending Admin Review',
    });

    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HeartHandshake size={22} color="#7e22ce" />
            <h3 className="modal-title">Parent Portal: Ideas & Complaints</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="form-label">Submission Category</label>
              <select
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Idea / Suggestion">💡 Idea / Suggestion</option>
                <option value="Complaint / Issue">⚠️ Complaint / Issue</option>
                <option value="Academic Inquiry">📚 Academic Inquiry</option>
                <option value="Facility & Safety">🏫 Facility & Safety</option>
              </select>
            </div>

            <div>
              <label className="form-label">Target Department</label>
              <select
                className="form-input"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Academics & Teachers">Academics & Teachers</option>
                <option value="School Administration">School Administration</option>
                <option value="Finance & Billing">Finance & Billing</option>
                <option value="Transport & Security">Transport & Security</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Suggestion regarding Grade 10 Science lab hours"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Explanation</label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Please describe your suggestion, feedback, or complaint in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ resize: 'vertical' }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              background: '#7e22ce',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <Send size={16} />
            <span>Submit Feedback to School Board</span>
          </button>
        </form>
      </div>
    </div>
  );
};
