import React from 'react';
import { Users, GraduationCap, Sparkles, Server } from 'lucide-react';

export const StatCards = ({ metrics }) => {
  const data = metrics || {
    totalStudents: '1,432',
    studentChange: '+12',
    activeTeachers: '84',
    teacherStatus: 'On Shift',
    pendingPTO: '2 pending PTO requests',
    portalUsage: '78%',
    portalSub: 'Monthly avg.',
    infrastructure: '99.9%',
    latency: 'ms_latency: 24ms',
  };

  return (
    <div className="metrics-grid">
      {/* 1. Total Students */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">TOTAL STUDENTS</span>
          <Users className="stat-icon" />
        </div>
        <div className="stat-value-row">
          <span className="stat-num">{data.totalStudents}</span>
          <span className="stat-badge green">{data.studentChange}</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: '70%' }}></div>
        </div>
      </div>

      {/* 2. Active Teachers */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">ACTIVE TEACHERS</span>
          <GraduationCap className="stat-icon" />
        </div>
        <div className="stat-value-row">
          <span className="stat-num">{data.activeTeachers}</span>
          <span className="stat-badge blue" style={{ color: '#4f46e5' }}>{data.teacherStatus}</span>
        </div>
        <div className="stat-subtext">{data.pendingPTO}</div>
      </div>

      {/* 3. Portal Usage */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">PORTAL USAGE</span>
          <Sparkles className="stat-icon" />
        </div>
        <div className="stat-value-row">
          <span className="stat-num">{data.portalUsage}</span>
          <span className="stat-badge blue">{data.portalSub}</span>
        </div>
        {/* Step progress bar style */}
        <div style={{ display: 'flex', gap: '3px', marginTop: '0.5rem' }}>
          <div style={{ height: '4px', flex: 1, background: '#4f46e5', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, background: '#4f46e5', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, background: '#4f46e5', borderRadius: '2px' }}></div>
          <div style={{ height: '4px', flex: 1, background: '#cbd5e1', borderRadius: '2px' }}></div>
        </div>
      </div>

      {/* 4. Infrastructure */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">INFRASTRUCTURE</span>
          <Server className="stat-icon" />
        </div>
        <div className="stat-value-row">
          <span className="stat-num">{data.infrastructure}</span>
          <span className="stat-badge green">Uptime</span>
        </div>
        <div className="stat-subtext" style={{ fontFamily: 'monospace', color: '#64748b' }}>
          {data.latency}
        </div>
      </div>
    </div>
  );
};
