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
      title: 'Inter-School Sports Meet & Non-Academic Briefing',
      targetAudience: 'Teachers & Students',
      priority: 'Important',
      content: 'All sports squads are requested to attend the athletic orientation at the Gymnasium on Friday at 3:00 PM.',
      author: 'Admin Office',
      date: 'Mar 10, 2026',
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
