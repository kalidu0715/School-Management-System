import React, { useState } from 'react';
import { BookOpen, Plus, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Subjects = () => {
  const { activeRoleView } = useAuth();
  const canAddSubject = activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL' || activeRoleView === 'TEACHER';

  const [subjectsList, setSubjectsList] = useState([
    { id: 'subj-1', code: 'MATH-201', name: 'Calculus & Advanced Algebra', grade: 'Grade 11-B', teacher: 'Sajith', room: 'Room 302', students: 34 },
    { id: 'subj-2', code: 'BIO-104', name: 'Cell Division & Molecular Biology', grade: 'Grade 10-A', teacher: 'Rehan', room: 'Lab 108', students: 28 },
    { id: 'subj-3', code: 'HIST-301', name: 'Historical Context of Ancient Rome', grade: 'Grade 10-A', teacher: 'Amal', room: 'Room 204', students: 30 },
    { id: 'subj-4', code: 'PHYS-202', name: 'Classical Mechanics & Wave Dynamics', grade: 'Grade 12-A', teacher: 'Siriwardhane', room: 'Lab 201', students: 22 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubj, setNewSubj] = useState({ code: '', name: '', grade: 'Grade 10', teacher: '' });

  const handleAddSubject = (e) => {
    e.preventDefault();
    setSubjectsList([
      ...subjectsList,
      {
        id: 'subj-' + Date.now(),
        code: newSubj.code,
        name: newSubj.name,
        grade: newSubj.grade,
        teacher: newSubj.teacher || 'Sajith',
        room: 'Room 101',
        students: 25,
      },
    ]);
    setShowAddModal(false);
    setNewSubj({ code: '', name: '', grade: 'Grade 10', teacher: '' });
  };

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Academic Subjects & Curricula</h1>
          <p className="page-sub">Manage subject offerings, teacher assignments, and classroom schedules.</p>
        </div>

        {canAddSubject && (
          <button className="btn-force-sync" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            <span>Add New Subject</span>
          </button>
        )}
      </div>

      <div className="activity-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>CODE</th>
                <th>SUBJECT NAME</th>
                <th>GRADE LEVEL</th>
                <th>ASSIGNED INSTRUCTOR</th>
                <th>LOCATION</th>
                <th>ENROLLED</th>
              </tr>
            </thead>
            <tbody>
              {subjectsList.map((row) => (
                <tr key={row.id}>
                  <td className="timestamp-col">
                    <strong style={{ color: '#4f46e5' }}>{row.code}</strong>
                  </td>
                  <td className="user-name-bold">{row.name}</td>
                  <td>
                    <span className="role-pill SYSTEM">{row.grade}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <GraduationCap size={14} color="#1d4ed8" />
                      <span>{row.teacher}</span>
                    </div>
                  </td>
                  <td>{row.room}</td>
                  <td className="user-name-bold">{row.students} Students</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Academic Subject</h3>
            </div>
            <form onSubmit={handleAddSubject}>
              <div className="form-group">
                <label className="form-label">Subject Code</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. CHEM-101"
                  value={newSubj.code}
                  onChange={(e) => setNewSubj({ ...newSubj, code: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Subject Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. General Chemistry & Kinetics"
                  value={newSubj.name}
                  onChange={(e) => setNewSubj({ ...newSubj, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Instructor Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Sajith / Rehan"
                  value={newSubj.teacher}
                  onChange={(e) => setNewSubj({ ...newSubj, teacher: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Save Subject</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
