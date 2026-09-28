import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const AuthLogsCard = ({ logs }) => {
  const defaultLogs = logs || [
    {
      id: 'log-1',
      status: 'AUTH_OK',
      time: '03:45:11',
      message: 'owner@school.edu authorized session.',
    },
    {
      id: 'log-2',
      status: 'AUTH_WARN',
      time: '02:12:04',
      message: 'Failed login attempt from IP 192.168.1.44 (Student).',
    },
    {
      id: 'log-3',
      status: 'AUTH_OK',
      time: '01:05:00',
      message: 'SysWorker rotation of security tokens completed.',
    },
    {
      id: 'log-4',
      status: 'AUTH_OK',
      time: '00:12:12',
      message: 'admin session refreshed.',
    },
  ];

  return (
    <div className="info-card">
      <div className="info-card-header">
        <ShieldAlert size={18} />
        <span>Role Authorization Logs</span>
      </div>

      <div className="log-stream">
        {defaultLogs.map((log) => (
          <div className="log-item" key={log.id}>
            <span className={`log-status-badge ${log.status}`}>
              [{log.status}]
            </span>
            <span className="log-text">
              <strong>{log.time}</strong> - {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
