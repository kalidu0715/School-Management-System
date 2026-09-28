import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Students = () => {
  const roster = [
    { id: 'std-1', name: 'Ruwin', grade: 'Grade 10', parent: 'Amitha', gpa: '3.8', attendance: '96%', avatar: 'RU' },
    { id: 'std-2', name: 'Tharin', grade: 'Grade 11', parent: 'Supuni', gpa: '3.9', attendance: '98%', avatar: 'TH' },
    { id: 'std-3', name: 'Amoda', grade: 'Grade 10', parent: 'Ajith', gpa: '3.5', attendance: '92%', avatar: 'AM' },
    { id: 'std-4', name: 'Hasini', grade: 'Grade 12', parent: 'Amitha', gpa: '4.0', attendance: '99%', avatar: 'HA' },
  ];

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Student Enrolled Roster</h1>
          <p className="page-sub">View student records, parent linkage, GPA metrics, and attendance tracking.</p>
        </div>
      </div>

      <div className="activity-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>STUDENT NAME</th>
                <th>GRADE LEVEL</th>
                <th>LINKED PARENT / GUARDIAN</th>
                <th>CUMULATIVE GPA</th>
                <th>ATTENDANCE RATE</th>
                <th>PORTAL ACCESS</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          background: '#dcfce7',
                          color: '#15803d',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                        }}
                      >
                        {student.avatar}
                      </div>
                      <span className="user-name-bold">{student.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="role-pill STUDENT">{student.grade}</span>
                  </td>
                  <td>{student.parent}</td>
                  <td className="user-name-bold">{student.gpa} / 4.0</td>
                  <td className="timestamp-col">{student.attendance}</td>
                  <td>
                    <span className="stat-badge green">
                      <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '3px' }} /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
