import React, { useState } from 'react';
import { FileCheck, CheckCircle2, Clock, AlertCircle, Plus, X, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Exams = () => {
  const { activeRoleView } = useAuth();
  const canAddExam = activeRoleView === 'PRINCIPAL' || activeRoleView === 'TEACHER' || activeRoleView === 'OWNER';

  const [exams, setExams] = useState([
    { id: 'ex-1', title: 'Spring 2026 Math Final', subject: 'Mathematics (MATH-201)', grade: 'Grade 11-B', date: '2026-03-15', status: 'Submitted', teacher: 'Sajith', gradingScale: 'A+ (90-100), A (80-89), B (70-79)' },
    { id: 'ex-2', title: 'Cell Biology Midterm Exam', subject: 'Biology (BIO-104)', grade: 'Grade 10-A', date: '2026-03-18', status: 'Scheduled', teacher: 'Rehan', gradingScale: 'Standard Point Scale (0-100)' },
    { id: 'ex-3', title: 'Roman Empire History Essay', subject: 'History (HIST-301)', grade: 'Grade 10-A', date: '2026-03-12', status: 'Pending Review', teacher: 'Amal', gradingScale: 'Rubric Based (Content, Logic, Sources)' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    title: '',
    subject: 'Mathematics (MATH-201)',
    grade: 'Grade 10',
    date: '2026-03-25',
    teacher: 'Sajith',
    gradingScale: 'Standard Grade System (A-F)',
  });

  const handleAddExam = (e) => {
    e.preventDefault();
    setExams([
      ...exams,
      {
        id: 'ex-' + Date.now(),
        title: newExam.title,
        subject: newExam.subject,
        grade: newExam.grade,
        date: newExam.date,
        status: 'Scheduled',
        teacher: newExam.teacher,
        gradingScale: newExam.gradingScale,
      },
    ]);
    setIsModalOpen(false);
    setNewExam({
      title: '',
      subject: 'Mathematics (MATH-201)',
      grade: 'Grade 10',
      date: '2026-03-25',
      teacher: 'Sajith',
      gradingScale: 'Standard Grade System (A-F)',
    });
  };

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Examinations & Grade Submissions</h1>
          <p className="page-sub">Track exam schedules, paper submissions, and term evaluations.</p>
        </div>

        {canAddExam && (
          <button className="btn-force-sync" style={{ background: '#4f46e5' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            <span>Add New Exam & Grading</span>
          </button>
        )}
      </div>

      <div className="activity-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>EXAM TITLE</th>
                <th>SUBJECT & CODE</th>
                <th>GRADE LEVEL</th>
                <th>DATE SCHEDULED</th>
                <th>GRADING SYSTEM</th>
                <th>SUBMISSION STATUS</th>
                <th>INSTRUCTOR</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((row) => (
                <tr key={row.id}>
                  <td className="user-name-bold">{row.title}</td>
                  <td>{row.subject}</td>
                  <td>
                    <span className="role-pill TEACHER">{row.grade}</span>
                  </td>
                  <td className="timestamp-col">{row.date}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#4f46e5', fontWeight: 600 }}>
                      <Award size={14} />
                      <span>{row.gradingScale}</span>
                    </div>
                  </td>
                  <td>
                    {row.status === 'Submitted' && (
                      <span className="stat-badge green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CheckCircle2 size={12} /> {row.status}
                      </span>
                    )}
                    {row.status === 'Scheduled' && (
                      <span className="stat-badge blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#dbeafe', color: '#1d4ed8' }}>
                        <Clock size={12} /> {row.status}
                      </span>
                    )}
                    {row.status === 'Pending Review' && (
                      <span className="stat-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#fef3c7', color: '#b45309' }}>
                        <AlertCircle size={12} /> {row.status}
                      </span>
                    )}
                  </td>
                  <td>{row.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Exam & Grading Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCheck size={20} color="#4f46e5" />
                <h3 className="modal-title">Schedule New Exam & Grading Criteria</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddExam}>
              <div className="form-group">
                <label className="form-label">Exam Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Midterm Organic Chemistry Test"
                  value={newExam.title}
                  onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="form-label">Subject & Code</label>
                  <select
                    className="form-input"
                    value={newExam.subject}
                    onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                  >
                    <option value="Mathematics (MATH-201)">Mathematics (MATH-201)</option>
                    <option value="Biology (BIO-104)">Biology (BIO-104)</option>
                    <option value="History (HIST-301)">History (HIST-301)</option>
                    <option value="Physics (PHYS-202)">Physics (PHYS-202)</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Instructor</label>
                  <select
                    className="form-input"
                    value={newExam.teacher}
                    onChange={(e) => setNewExam({ ...newExam, teacher: e.target.value })}
                  >
                    <option value="Sajith">Sajith (Mathematics)</option>
                    <option value="Rehan">Rehan (Biology)</option>
                    <option value="Amal">Amal (History)</option>
                    <option value="Siriwardhane">Siriwardhane (Physics)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="form-label">Grade Level</label>
                  <select
                    className="form-input"
                    value={newExam.grade}
                    onChange={(e) => setNewExam({ ...newExam, grade: e.target.value })}
                  >
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Scheduled Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newExam.date}
                    onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Grading System / Criteria</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Letter Grade A-F, GPA Scale 4.0, or Percentage (0-100)"
                  value={newExam.gradingScale}
                  onChange={(e) => setNewExam({ ...newExam, gradingScale: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                Save Exam Schedule & Grading
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
