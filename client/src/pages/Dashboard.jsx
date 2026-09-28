import React, { useState } from 'react';
import { RefreshCw, Plus, MessageSquare, Megaphone, Trash2 } from 'lucide-react';
import { StatCards } from '../components/StatCards';
import { ActivityTable } from '../components/ActivityTable';
import { DBHealthCard } from '../components/DBHealthCard';
import { AuthLogsCard } from '../components/AuthLogsCard';
import { NoticeModal } from '../components/NoticeModal';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { activeRoleView } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedText, setLastSyncedText] = useState('1 MIN AGO');
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  const [notices, setNotices] = useState([
    {
      id: 'notif-1',
      title: 'Mandatory Faculty Meeting & Q1 Exam Syllabus Review',
      targetAudience: 'Teachers & Principal',
      priority: 'Urgent',
      content: 'All Mathematics and Science faculty are requested to assemble in Conference Room 2 for Q1 exam syllabus synchronization.',
      author: 'Principal Office',
      date: 'Mar 12, 2026',
    },
    {
      id: 'notif-2',
      title: 'Grade 10 Parent-Teacher Association (PTA) Conference Schedule',
      targetAudience: 'Teachers & Parents',
      priority: 'Important',
      content: 'PTA meeting scheduled for Friday at 3:00 PM. Individual progress reports have been dispatched to student portals.',
      author: 'Admin Office',
      date: 'Mar 10, 2026',
    },
  ]);

  const [parentFeedbacks] = useState([
    {
      id: 'fb-1',
      parentName: 'Amitha (Ruwin)',
      type: '💡 Idea',
      subject: 'Extend Biology Laboratory Hours for Grade 10',
      message: 'Requesting extra lab hours on Thursdays for students to complete cell division experiments.',
      status: 'Reviewed',
      date: 'Mar 12',
    },
    {
      id: 'fb-2',
      parentName: 'Supuni (Tharin)',
      type: '⚠️ Complaint',
      subject: 'School Bus #4 Morning Route Delay',
      message: 'Bus #4 arrived 20 minutes late on Tuesday. Kindly check route scheduling.',
      status: 'Under Investigation',
      date: 'Mar 11',
    },
  ]);

  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedText('JUST NOW');
    }, 1000);
  };

  const handleAddNotice = (newNotice) => {
    setNotices([newNotice, ...notices]);
  };

  const handleDeleteNotice = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const canPostNotice = activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL';
  const canDeleteNotice = activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL' || activeRoleView === 'TEACHER';
  const isOwnerOrPrincipal = activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL';
  const isOwner = activeRoleView === 'OWNER';

  return (
    <div className="content-body">
      {/* Title & Actions */}
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Dashboard - Spring 2026</h1>
          <p className="page-sub">
            School management metrics, official notices, and administrative logging.
          </p>
        </div>

        <div className="sync-status-box">
          <span className="sync-time-label">LAST SYNCED: {lastSyncedText}</span>
          
          {canPostNotice && (
            <button
              className="btn-force-sync"
              style={{ background: '#4f46e5' }}
              onClick={() => setIsNoticeModalOpen(true)}
            >
              <Plus size={16} />
              <span>Add Notice</span>
            </button>
          )}

          <button
            className="btn-force-sync"
            onClick={handleForceSync}
            disabled={isSyncing}
          >
            <RefreshCw size={14} className={isSyncing ? 'spin-icon' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Force Sync'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <StatCards />

      {/* School Announcements & Notices Section */}
      <div className="activity-card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-header-action">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Megaphone size={20} color="#4f46e5" />
            <h2 className="card-title-h2">School Announcements & Notices</h2>
          </div>
          <span className="stat-badge blue" style={{ background: '#eef2ff', color: '#4f46e5' }}>
            For Teachers & Principal
          </span>
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notices.map((n) => (
            <div key={n.id} className="notice-card-item">
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <h3 className="notice-title">{n.title}</h3>
                  <span
                    className="role-pill"
                    style={{
                      background: n.priority === 'Urgent' ? '#fee2e2' : '#fef3c7',
                      color: n.priority === 'Urgent' ? '#b91c1c' : '#b45309',
                    }}
                  >
                    {n.priority}
                  </span>
                </div>
                <p className="notice-body">{n.content}</p>
                <div className="notice-meta">
                  Audience: <strong>{n.targetAudience}</strong> • Issued by {n.author} on {n.date}
                </div>
              </div>

              {canDeleteNotice && (
                <button
                  className="icon-btn"
                  title="Delete Notice"
                  style={{ color: '#ef4444', borderColor: '#fee2e2' }}
                  onClick={() => handleDeleteNotice(n.id)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Parent Feedback & Complaints Widget (For Admin & Principal) */}
      {isOwnerOrPrincipal && (
        <div className="activity-card" style={{ marginBottom: '1.75rem' }}>
          <div className="card-header-action">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MessageSquare size={20} color="#7e22ce" />
              <h2 className="card-title-h2">Parent Ideas, Suggestions & Complaints</h2>
            </div>
            <span className="stat-badge" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
              Parent Inbox
            </span>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>PARENT NAME</th>
                  <th>TYPE</th>
                  <th>SUBJECT & INQUIRY</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                {parentFeedbacks.map((fb) => (
                  <tr key={fb.id}>
                    <td className="user-name-bold">{fb.parentName}</td>
                    <td>
                      <span className="role-pill PARENT">{fb.type}</span>
                    </td>
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
      )}

      {/* Recent Cross-Role Activity Table (Only visible to Admin & Principal) */}
      {isOwnerOrPrincipal && <ActivityTable />}

      {/* Bottom Grid: DB Health & Authorization Logs (Only visible to School Owner) */}
      {isOwner && (
        <div className="bottom-grid">
          <DBHealthCard />
          <AuthLogsCard />
        </div>
      )}

      {/* Notice Modal */}
      <NoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onAddNotice={handleAddNotice}
      />
    </div>
  );
};
