import React, { useState } from 'react';
import { Bell, X, Send, AlertTriangle } from 'lucide-react';

export const NoticeModal = ({ isOpen, onClose, onAddNotice }) => {
  const [title, setTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('Teachers & Staff');
  const [priority, setPriority] = useState('Important');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    onAddNotice({
      id: 'notif-' + Date.now(),
      title,
      targetAudience,
      priority,
      content,
      author: 'Admin Office',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });

    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} color="#4f46e5" />
            <h3 className="modal-title">Publish Official School Notice</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Notice Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Mandatory Faculty Meeting & Q1 Exam Review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="form-label">Target Audience</label>
              <select
                className="form-input"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              >
                <option value="Teachers & Staff">Teachers & Staff</option>
                <option value="Principal & Department Heads">Principal & Dept Heads</option>
                <option value="All Faculty">All Faculty</option>
                <option value="Parents & Guardians">Parents & Guardians</option>
              </select>
            </div>

            <div>
              <label className="form-label">Priority Level</label>
              <select
                className="form-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notice Announcement Body</label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Enter detailed notice content, instructions, or meeting agenda..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ resize: 'vertical' }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Send size={16} />
            <span>Broadcast Notice Now</span>
          </button>
        </form>
      </div>
    </div>
  );
};
