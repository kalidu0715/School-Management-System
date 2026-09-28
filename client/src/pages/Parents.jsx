import React, { useState } from 'react';
import { HeartHandshake, Plus, MessageSquare } from 'lucide-react';
import { ParentFeedbackModal } from '../components/ParentFeedbackModal';
import { useAuth } from '../context/AuthContext';

export const Parents = () => {
  const { activeRoleView } = useAuth();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const [feedbackList, setFeedbackList] = useState([
    {
      id: 'fb-1',
      parentName: 'Amitha',
      type: '💡 Idea / Suggestion',
      department: 'Academics & Teachers',
      subject: 'Extend Biology Laboratory Hours for Grade 10',
      message: 'Requesting extra lab hours on Thursdays for students to complete cell division experiments.',
      status: 'Reviewed',
      date: 'Mar 12, 2026',
    },
    {
      id: 'fb-2',
      parentName: 'Supuni',
      type: '⚠️ Complaint / Issue',
      department: 'Transport & Security',
      subject: 'School Bus #4 Morning Route Delay',
      message: 'Bus #4 arrived 20 minutes late on Tuesday. Kindly check route scheduling.',
      status: 'Under Investigation',
      date: 'Mar 11, 2026',
    },
  ]);

  const handleAddFeedback = (newFb) => {
    setFeedbackList([newFb, ...feedbackList]);
  };

  const parents = [
    { id: 'p-1', name: 'Amitha', student: 'Ruwin & Hasini', phone: '+94 77 123 4567', email: 'amitha@gmail.com', feeStatus: 'Cleared Q1 2026' },
    { id: 'p-2', name: 'Supuni', student: 'Tharin (Grade 11)', phone: '+94 71 987 6543', email: 'supuni@gmail.com', feeStatus: 'Cleared Q1 2026' },
    { id: 'p-3', name: 'Ajith', student: 'Amoda (Grade 10)', phone: '+94 70 555 1212', email: 'ajith@gmail.com', feeStatus: 'Pending Q1 2026' },
  ];

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Parent & Guardian Portal</h1>
          <p className="page-sub">Parent contacts, tuition fee clearance, and ideas/complaints submission desk.</p>
        </div>

        <div>
          <button
            className="btn-force-sync"
            style={{ background: '#7e22ce' }}
            onClick={() => setIsFeedbackModalOpen(true)}
          >
            <Plus size={16} />
            <span>Add Idea / Complaint</span>
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="activity-card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-header-action">
          <h2 className="card-title-h2">Parent Directory</h2>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>PARENT NAME</th>
                <th>ASSOCIATED STUDENT</th>
                <th>PHONE NUMBER</th>
                <th>EMAIL ADDRESS</th>
                <th>TUITION FEE STATUS</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          background: '#f3e8ff',
                          color: '#7e22ce',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        <HeartHandshake size={16} />
                      </div>
                      <span className="user-name-bold">{row.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="role-pill PARENT">{row.student}</span>
                  </td>
                  <td>{row.phone}</td>
                  <td>{row.email}</td>
                  <td>
                    <span className={`stat-badge ${row.feeStatus.includes('Cleared') ? 'green' : 'blue'}`}>
                      {row.feeStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submitted Feedback & Ideas Tracker */}
      <div className="activity-card">
        <div className="card-header-action">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MessageSquare size={18} color="#7e22ce" />
            <h2 className="card-title-h2">Submitted Ideas, Suggestions & Complaints</h2>
          </div>
          <button
            className="btn-secondary"
            style={{ borderColor: '#7e22ce', color: '#7e22ce' }}
            onClick={() => setIsFeedbackModalOpen(true)}
          >
            <Plus size={14} />
            <span>New Submission</span>
          </button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>SUBMITTER</th>
                <th>CATEGORY</th>
                <th>DEPARTMENT</th>
                <th>SUBJECT & MESSAGE</th>
                <th>STATUS</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((fb) => (
                <tr key={fb.id}>
                  <td className="user-name-bold">{fb.parentName}</td>
                  <td>
                    <span className="role-pill PARENT">{fb.type}</span>
                  </td>
                  <td>{fb.department}</td>
                  <td>
                    <strong>{fb.subject}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{fb.message}</div>
                  </td>
                  <td>
                    <span className="stat-badge green">{fb.status}</span>
                  </td>
                  <td className="timestamp-col">{fb.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ParentFeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmitFeedback={handleAddFeedback}
      />
    </div>
  );
};
