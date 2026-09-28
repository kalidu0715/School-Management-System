import React from 'react';
import { Database } from 'lucide-react';

export const DBHealthCard = ({ data }) => {
  const stats = data || {
    connections: '48 / 200',
    connPercent: 24,
    cacheHitRate: '99.82%',
    tps: '1.2k TPS',
  };

  return (
    <div className="info-card">
      <div className="info-card-header">
        <Database size={18} />
        <span>PostgreSQL Health Cluster</span>
      </div>

      <div className="metrics-list">
        <div>
          <div className="metric-row" style={{ marginBottom: '0.4rem' }}>
            <span className="metric-label">Connections</span>
            <span className="metric-val">{stats.connections}</span>
          </div>
          <div className="progress-bar-bg" style={{ height: '6px' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${stats.connPercent}%`,
                background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
              }}
            ></div>
          </div>
        </div>

        <div className="metric-row">
          <span className="metric-label">Cache Hit Rate</span>
          <span className="metric-val" style={{ color: '#10b981' }}>
            {stats.cacheHitRate}
          </span>
        </div>

        <div className="metric-row">
          <span className="metric-label">Transaction Rate</span>
          <span className="metric-val">{stats.tps}</span>
        </div>
      </div>
    </div>
  );
};
