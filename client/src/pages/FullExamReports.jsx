import React, { useState } from 'react';
import { Award, ShieldCheck, Download, Filter, BookOpen, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const FullExamReports = () => {
  const { activeRoleView } = useAuth();

  // Academic Staff Guard: Teacher, Principal, Admin (Owner) ONLY!
  const isAuthorized = activeRoleView === 'OWNER' || activeRoleView === 'PRINCIPAL' || activeRoleView === 'TEACHER';

  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');

  const gradeOptions = Array.from({ length: 13 }, (_, i) => `Grade ${i + 1}`);

  const mockGradeReports = {
    'Grade 10': [
      { id: '1001', name: 'Ruwin', regNo: 'REG-2026-001', term1: '94%', term2: '92%', term3: '95%', gpa: '3.92', rank: '1st', status: 'Passed' },
      { id: '1002', name: 'Amoda', regNo: 'REG-2026-003', term1: '86%', term2: '88%', term3: '85%', gpa: '3.55', rank: '4th', status: 'Passed' },
      { id: '1003', name: 'Kavindi Perera', regNo: 'REG-2026-008', term1: '90%', term2: '89%', term3: '91%', gpa: '3.75', rank: '2nd', status: 'Passed' },
      { id: '1004', name: 'Nisal Silva', regNo: 'REG-2026-012', term1: '82%', term2: '85%', term3: '84%', gpa: '3.40', rank: '6th', status: 'Passed' },
    ],
    'Grade 11': [
      { id: '1101', name: 'Tharin', regNo: 'REG-2026-002', term1: '96%', term2: '94%', term3: '97%', gpa: '3.98', rank: '1st', status: 'Passed' },
      { id: '1102', name: 'Dinesh Wickramasinghe', regNo: 'REG-2026-005', term1: '88%', term2: '90%', term3: '89%', gpa: '3.65', rank: '3rd', status: 'Passed' },
    ],
    'Grade 12': [
      { id: '1201', name: 'Hasini', regNo: 'REG-2026-004', term1: '98%', term2: '97%', term3: '99%', gpa: '4.00', rank: '1st', status: 'Passed (Valedictorian)' },
      { id: '1202', name: 'Pathum Fernando', regNo: 'REG-2026-009', term1: '91%', term2: '93%', term3: '90%', gpa: '3.80', rank: '2nd', status: 'Passed' },
    ],
  };

  const currentReports = mockGradeReports[selectedGrade] || [
    { id: 'g-1', name: `Student A (${selectedGrade})`, regNo: 'REG-2026-101', term1: '88%', term2: '90%', term3: '89%', gpa: '3.65', rank: '1st', status: 'Passed' },
    { id: 'g-2', name: `Student B (${selectedGrade})`, regNo: 'REG-2026-102', term1: '82%', term2: '84%', term3: '83%', gpa: '3.30', rank: '2nd', status: 'Passed' },
  ];

  if (!isAuthorized) {
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
          Academic Access Restricted
        </h2>
        <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
          Full Grades 1-13 Exam Reports are strictly confidential and accessible only to <strong>Academic Staff</strong> (Teachers, Principal, and School Owner / Admin).
        </p>
      </div>
    );
  }

  const exportGradeReport = (student) => {
    const text = `SCHOOL MANAGEMENT SYSTEM - FULL ACADEMIC EXAM REPORT (GRADES 1-13)
-------------------------------------------------------------------------
Student Name: ${student.name}
Registration No: ${student.regNo}
Grade Level: ${selectedGrade}
Academic Evaluation: ${selectedTerm}

TERM SCORES BREAKDOWN:
- Term 1 Score: ${student.term1}
- Term 2 Score: ${student.term2}
- Term 3 Score: ${student.term3}

CUMULATIVE GPA: ${student.gpa} / 4.0
CLASS RANK: ${student.rank}
ACADEMIC STANDING: ${student.status}

Certified by: Academic Operations Board & Faculty Dean`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Academic_Report_${selectedGrade}_${student.name.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Full Academic Exam Reports (Grades 1 - 13)</h1>
          <p className="page-sub">Confidential academic evaluation matrix, class rankings, and term scores across Grades 1 to 13.</p>
        </div>

        <span className="stat-badge blue" style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.5rem 0.85rem' }}>
          Academic Staff Confidential
        </span>
      </div>

      {/* Grade Selector & Term Filter Bar */}
      <div className="activity-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', alignItems: 'center' }}>
          <div>
            <label className="form-label">Select Grade Level (Grades 1 - 13)</label>
            <select
              className="form-input"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              {gradeOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Academic Term</label>
            <select
              className="form-input"
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
            >
              <option value="Term 1">Term 1 (Spring Evaluation)</option>
              <option value="Term 2">Term 2 (Summer Evaluation)</option>
              <option value="Term 3">Term 3 (Winter Evaluation)</option>
              <option value="All Terms">All Terms Combined</option>
            </select>
          </div>

          <div>
            <label className="form-label">Subject Domain</label>
            <select
              className="form-input"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="All Subjects">All Subjects Overview</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology & Science">Biology & Science</option>
              <option value="History & Social">History & Social</option>
              <option value="Physics & Chem">Physics & Chemistry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Class Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">{selectedGrade.toUpperCase()} EVALUATED STUDENTS</span>
            <BookOpen className="stat-icon" color="#6366f1" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.6rem' }}>{currentReports.length} Enrolled</div>
          <div className="stat-subtext">Active Class Cohort</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">CLASS AVERAGE GPA</span>
            <Award className="stat-icon" color="#10b981" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.6rem', color: '#15803d' }}>3.72 / 4.0</div>
          <div className="stat-subtext">{selectedTerm} Performance Mean</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">CLASS PASS RATE</span>
            <CheckCircle2 className="stat-icon" color="#8b5cf6" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.6rem', color: '#6b21a8' }}>98.5%</div>
          <div className="stat-subtext">0 Failures Recorded</div>
        </div>
      </div>

      {/* Full Grade Report Table */}
      <div className="activity-card">
        <div className="card-header-action">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={18} color="#6366f1" />
            <h2 className="card-title-h2">{selectedGrade} Student Examination Report Ledger</h2>
          </div>
          <span className="role-pill TEACHER">{selectedTerm}</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>REGISTRATION #</th>
                <th>STUDENT NAME</th>
                <th>TERM 1 SCORE</th>
                <th>TERM 2 SCORE</th>
                <th>TERM 3 SCORE</th>
                <th>CUMULATIVE GPA</th>
                <th>CLASS RANK</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((row) => (
                <tr key={row.id}>
                  <td className="timestamp-col"><strong style={{ color: '#6366f1' }}>{row.regNo}</strong></td>
                  <td className="user-name-bold">{row.name}</td>
                  <td>{row.term1}</td>
                  <td>{row.term2}</td>
                  <td>{row.term3}</td>
                  <td className="user-name-bold" style={{ color: '#0f172a' }}>{row.gpa} / 4.0</td>
                  <td>
                    <span className="role-pill STUDENT">{row.rank}</span>
                  </td>
                  <td>
                    <span className="stat-badge green">{row.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      onClick={() => exportGradeReport(row)}
                    >
                      <Download size={12} />
                      <span>Export Report</span>
                    </button>
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
