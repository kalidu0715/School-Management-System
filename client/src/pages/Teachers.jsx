import React from 'react';
import { Mail, BookOpen } from 'lucide-react';

export const Teachers = () => {
  const faculty = [
    { id: 't-1', name: 'Sajith', dept: 'Mathematics', email: 'sajith@school.edu', subjects: ['MATH-201', 'ALG-102'], avatar: 'SA' },
    { id: 't-2', name: 'Rehan', dept: 'Biology', email: 'rehan@school.edu', subjects: ['BIO-104', 'GEN-301'], avatar: 'RE' },
    { id: 't-3', name: 'Amal', dept: 'History', email: 'amal@school.edu', subjects: ['HIST-301'], avatar: 'AM' },
    { id: 't-4', name: 'Siriwardhane', dept: 'Physics', email: 'siriwardhane@school.edu', subjects: ['PHYS-202'], avatar: 'SI' },
  ];

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Faculty & Teachers Directory</h1>
          <p className="page-sub">Academic department staff, contact records, and active courses.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {faculty.map((teacher) => (
          <div className="stat-card" key={teacher.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: '#dbeafe',
                  color: '#1d4ed8',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}
              >
                {teacher.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>{teacher.name}</h3>
                <span className="role-pill TEACHER">{teacher.dept} Department</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} />
                <span>{teacher.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={14} />
                <span>Assigned Courses: <strong>{teacher.subjects.join(', ')}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
