import React from 'react';
import { Database, Server, Cpu, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { DBHealthCard } from '../components/DBHealthCard';
import { AuthLogsCard } from '../components/AuthLogsCard';
import { useAuth } from '../context/AuthContext';

export const DBStatus = () => {
  const { activeRoleView } = useAuth();
  const isOwner = activeRoleView === 'OWNER';

  if (!isOwner) {
    return (
      <div className="content-body" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            background: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '16px',
            marginBottom: '1rem',
          }}
        >
          <ShieldCheck size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
          Access Restricted
        </h2>
        <p style={{ color: '#64748b', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
          PostgreSQL Database Status and Health Metrics are strictly restricted to the <strong>School Owner</strong> role.
        </p>
      </div>
    );
  }

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">PostgreSQL Infrastructure & Prisma ORM Status</h1>
          <p className="page-sub">Database connection pool performance, migration history, and active schema statistics.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">DATABASE VERSION</span>
            <Database className="stat-icon" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.4rem' }}>PostgreSQL 16.2</div>
          <div className="stat-subtext">Schema: public</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">PRISMA CLIENT</span>
            <Terminal className="stat-icon" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.4rem' }}>v5.10.2</div>
          <div className="stat-subtext">Engine: Node-API</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">RECLAIMED STORAGE</span>
            <Activity className="stat-icon" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.4rem' }}>2.4 GB</div>
          <div className="stat-subtext">Auto-index completed</div>
        </div>
      </div>

      <div className="bottom-grid">
        <DBHealthCard />
        <AuthLogsCard />
      </div>
    </div>
  );
};
