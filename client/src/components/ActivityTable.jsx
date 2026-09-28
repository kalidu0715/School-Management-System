import React, { useState } from 'react';
import { Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export const ActivityTable = ({ activities }) => {
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const initialActivities = activities || [
    {
      id: 'act-1',
      role: 'TEACHER',
      user: 'Sajith',
      meta: '(Mathematics)',
      actionDescription: 'Submitted "Spring 2026 Math Final" exam papers for Grade 11-B.',
      timestamp: '2026-03-12 14:22:01',
    },
    {
      id: 'act-2',
      role: 'PARENT',
      user: 'Amitha',
      meta: '(Ruwin)',
      actionDescription: 'Cleared Tuition Fees for Q1 2026 via Credit Card. Transaction #8822.',
      timestamp: '2026-03-12 13:45:12',
    },
    {
      id: 'act-3',
      role: 'STUDENT',
      user: 'Ruwin',
      meta: '(Grade 10)',
      actionDescription: 'Late submission: "Historical Context of Rome" Assignment. Flagged: Late.',
      timestamp: '2026-03-12 11:10:44',
    },
    {
      id: 'act-4',
      role: 'SYSTEM',
      user: 'PostgreSQL Worker',
      meta: '',
      actionDescription: 'Automatic database indexing completed. Reclaiming 2.4GB space.',
      timestamp: '2026-03-12 09:00:00',
    },
    {
      id: 'act-5',
      role: 'TEACHER',
      user: 'Rehan',
      meta: '(Biology)',
      actionDescription: 'Marked attendance for "Cell Division" lecture. 3 absentees noted.',
      timestamp: '2026-03-12 08:32:15',
    },
  ];

  const filteredData = initialActivities.filter((item) => {
    if (roleFilter === 'ALL') return true;
    return item.role === roleFilter;
  });

  const exportCSV = () => {
    const headers = ['ROLE,USER,META,ACTION_DESCRIPTION,TIMESTAMP\n'];
    const rows = filteredData.map(
      (item) => `"${item.role}","${item.user}","${item.meta}","${item.actionDescription}","${item.timestamp}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cross_role_activity_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="activity-card">
      <div className="card-header-action">
        <h2 className="card-title-h2">Recent Cross-Role Activity</h2>
        <div className="btn-group" style={{ position: 'relative' }}>
          <button
            className="btn-secondary"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <Filter size={14} />
            <span>Filters</span>
          </button>

          {showFilterDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                background: 'white',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 30,
                padding: '0.4rem',
                minWidth: '130px',
              }}
            >
              {['ALL', 'TEACHER', 'PARENT', 'STUDENT', 'SYSTEM'].map((role) => (
                <div
                  key={role}
                  style={{
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    borderRadius: '4px',
                    background: roleFilter === role ? '#eef2ff' : 'transparent',
                    color: roleFilter === role ? '#4f46e5' : '#334155',
                  }}
                  onClick={() => {
                    setRoleFilter(role);
                    setShowFilterDropdown(false);
                  }}
                >
                  {role}
                </div>
              ))}
            </div>
          )}

          <button className="btn-secondary" onClick={exportCSV}>
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '120px' }}>ROLE</th>
              <th style={{ width: '220px' }}>USER</th>
              <th>ACTION DESCRIPTION</th>
              <th style={{ width: '180px' }}>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>
                  <span className={`role-pill ${row.role}`}>{row.role}</span>
                </td>
                <td>
                  <span className="user-name-bold">{row.user}</span>{' '}
                  <span className="user-meta-sub">{row.meta}</span>
                </td>
                <td>{row.actionDescription}</td>
                <td className="timestamp-col">{row.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer & Pagination */}
      <div className="table-footer">
        <span className="footer-info">
          Showing {filteredData.length} of 124 activities
        </span>
        <div className="pagination-controls">
          <button className="page-btn">
            <ChevronLeft size={14} />
          </button>
          <button
            className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button
            className={`page-btn ${currentPage === 3 ? 'active' : ''}`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>
          <button className="page-btn">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
