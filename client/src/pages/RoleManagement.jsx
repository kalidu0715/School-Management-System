import React, { useState } from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RoleManagement = () => {
  const { activeRoleView } = useAuth();
  const isOwner = activeRoleView === 'OWNER';

  const [matrix, setMatrix] = useState([
    { permission: 'System Overview & Force Sync', OWNER: true, PRINCIPAL: true, TEACHER: false, STUDENT: false, PARENT: false },
    { permission: 'PostgreSQL Health & Logs Access', OWNER: true, PRINCIPAL: false, TEACHER: false, STUDENT: false, PARENT: false },
    { permission: 'Exam Submission & Grading', OWNER: true, PRINCIPAL: true, TEACHER: true, STUDENT: false, PARENT: false },
    { permission: 'Attendance Marking', OWNER: true, PRINCIPAL: true, TEACHER: true, STUDENT: false, PARENT: false },
    { permission: 'View Student Progress Reports', OWNER: true, PRINCIPAL: true, TEACHER: true, STUDENT: true, PARENT: true },
    { permission: 'Tuition Fee Payment Portal', OWNER: true, PRINCIPAL: false, TEACHER: false, STUDENT: false, PARENT: true },
    { permission: 'Role & User Management', OWNER: true, PRINCIPAL: false, TEACHER: false, STUDENT: false, PARENT: false },
  ]);

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
          Role Management is strictly restricted to the <strong>School Owner</strong> role.
        </p>
      </div>
    );
  }

  const togglePermission = (index, role) => {
    const updated = [...matrix];
    updated[index][role] = !updated[index][role];
    setMatrix(updated);
  };

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Role Access Control Matrix (RBAC)</h1>
          <p className="page-sub">Configure role permissions across Admin, Principal, Teacher, Student, and Parent tiers.</p>
        </div>
      </div>

      <div className="activity-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>PERMISSION / CAPABILITY</th>
                <th style={{ textAlign: 'center' }}>OWNER</th>
                <th style={{ textAlign: 'center' }}>PRINCIPAL</th>
                <th style={{ textAlign: 'center' }}>TEACHER</th>
                <th style={{ textAlign: 'center' }}>STUDENT</th>
                <th style={{ textAlign: 'center' }}>PARENT</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, idx) => (
                <tr key={idx}>
                  <td className="user-name-bold">{row.permission}</td>
                  {['OWNER', 'PRINCIPAL', 'TEACHER', 'STUDENT', 'PARENT'].map((role) => (
                    <td key={role} style={{ textAlign: 'center' }}>
                      <button
                        style={{
                          background: row[role] ? '#dcfce7' : '#fee2e2',
                          color: row[role] ? '#15803d' : '#b91c1c',
                          border: 'none',
                          borderRadius: '6px',
                          width: '28px',
                          height: '28px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => togglePermission(idx, role)}
                      >
                        {row[role] ? <Check size={16} /> : <X size={16} />}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
