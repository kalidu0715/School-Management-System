import React, { useState } from 'react';
import { Award, ShieldCheck, Mail, KeyRound, Download, CheckCircle2, AlertCircle, RefreshCw, BookOpen } from 'lucide-react';

export const ExamMarks = () => {
  const [step, setStep] = useState(1); // 1: Student Lookup Form, 2: OTP Verification, 3: Unlocked Marks Report
  const [studentName, setStudentName] = useState('Ruwin');
  const [regNumber, setRegNumber] = useState('REG-2026-001');
  const [email, setEmail] = useState('student@school.edu');
  
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Mock Student Marks Database
  const studentDatabase = {
    'REG-2026-001': {
      name: 'Ruwin',
      regNumber: 'REG-2026-001',
      grade: 'Grade 10-A',
      gpa: '3.85',
      percentage: '90.2%',
      status: 'Passed (Honors List)',
      subjects: [
        { code: 'MATH-201', name: 'Calculus & Advanced Algebra', score: 94, grade: 'A+', teacher: 'Sajith' },
        { code: 'BIO-104', name: 'Cell Division & Molecular Biology', score: 88, grade: 'A', teacher: 'Rehan' },
        { code: 'HIST-301', name: 'Historical Context of Ancient Rome', score: 91, grade: 'A', teacher: 'Amal' },
        { code: 'PHYS-202', name: 'Classical Mechanics & Wave Dynamics', score: 84, grade: 'B+', teacher: 'Siriwardhane' },
      ],
    },
    'REG-2026-002': {
      name: 'Tharin',
      regNumber: 'REG-2026-002',
      grade: 'Grade 11-B',
      gpa: '3.92',
      percentage: '92.5%',
      status: 'Passed (Dean List)',
      subjects: [
        { code: 'MATH-201', name: 'Calculus & Advanced Algebra', score: 96, grade: 'A+', teacher: 'Sajith' },
        { code: 'BIO-104', name: 'Cell Division & Molecular Biology', score: 92, grade: 'A+', teacher: 'Rehan' },
        { code: 'PHYS-202', name: 'Classical Mechanics & Wave Dynamics', score: 90, grade: 'A', teacher: 'Siriwardhane' },
      ],
    },
    'REG-2026-003': {
      name: 'Amoda',
      regNumber: 'REG-2026-003',
      grade: 'Grade 10-B',
      gpa: '3.50',
      percentage: '83.0%',
      status: 'Passed',
      subjects: [
        { code: 'MATH-201', name: 'Calculus & Advanced Algebra', score: 80, grade: 'B', teacher: 'Sajith' },
        { code: 'BIO-104', name: 'Cell Division & Molecular Biology', score: 86, grade: 'A', teacher: 'Rehan' },
        { code: 'HIST-301', name: 'Historical Context of Ancient Rome', score: 83, grade: 'B+', teacher: 'Amal' },
      ],
    },
  };

  const [activeStudentRecord, setActiveStudentRecord] = useState(null);

  const handleInitiateLookup = (e) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim() || !regNumber.trim() || !email.includes('@')) {
      setError('Please fill in Student Name, Registration Number, and Notification Email.');
      return;
    }

    // Match student record or use fallback
    const record = studentDatabase[regNumber.trim().toUpperCase()] || {
      name: studentName.trim(),
      regNumber: regNumber.trim().toUpperCase(),
      grade: 'Grade 10',
      gpa: '3.75',
      percentage: '88.0%',
      status: 'Passed',
      subjects: [
        { code: 'MATH-201', name: 'Calculus & Advanced Algebra', score: 90, grade: 'A', teacher: 'Sajith' },
        { code: 'BIO-104', name: 'Cell Division & Molecular Biology', score: 85, grade: 'A', teacher: 'Rehan' },
        { code: 'HIST-301', name: 'Historical Context of Ancient Rome', score: 89, grade: 'A', teacher: 'Amal' },
      ],
    };

    setActiveStudentRecord(record);

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setStep(2);
    setInfoMsg(`📧 Verification code dispatched to ${email}. (Demo OTP Code: ${otp})`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    if (inputOtp.trim() !== generatedOtp) {
      setError('Invalid 6-digit verification code. Please check your email and try again.');
      return;
    }

    // Unlocked!
    setStep(3);
  };

  const downloadTranscript = () => {
    if (!activeStudentRecord) return;
    const text = `SCHOOL MANAGEMENT SYSTEM - OFFICIAL EXAM TRANSCRIPT REPORT
-------------------------------------------------------------
Student Name: ${activeStudentRecord.name}
Registration No: ${activeStudentRecord.regNumber}
Grade Level: ${activeStudentRecord.grade}
Overall GPA: ${activeStudentRecord.gpa} / 4.0 (${activeStudentRecord.percentage})
Academic Standing: ${activeStudentRecord.status}

SUBJECT BREAKDOWN:
${activeStudentRecord.subjects.map((s) => `- ${s.code} ${s.name}: ${s.score}% (Grade ${s.grade}) | Instructor: ${s.teacher}`).join('\n')}

Issued by: Office of the Academic Registrar
Verification Status: SIGNED & VERIFIED VIA EMAIL OTP`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Transcript_${activeStudentRecord.name}_${activeStudentRecord.regNumber}.txt`;
    a.click();
  };

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Student Exam Marks & Transcripts</h1>
          <p className="page-sub">Secure verification portal to inspect term scores, GPA, and transcript reports.</p>
        </div>
      </div>

      {/* Security Info Card */}
      <div className="activity-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', borderColor: '#c7d2fe' }}>
        <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldCheck size={24} color="#4f46e5" />
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#3730a3' }}>Two-Factor Identity Verification Required</h4>
            <p style={{ fontSize: '0.8125rem', color: '#4338ca' }}>
              Student academic marks are strictly protected. Enter Student Name and School Registration Number to receive a 6-digit Email OTP verification code.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '0.75rem 1rem',
            background: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '8px',
            fontSize: '0.8125rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Verification Form */}
      {step === 1 && (
        <div className="activity-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card-header-action">
            <h2 className="card-title-h2">Step 1: Enter Student Credentials</h2>
          </div>

          <form onSubmit={handleInitiateLookup} style={{ padding: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Student Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Ruwin / Tharin / Amoda"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">School Registration Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. REG-2026-001"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notification Email Address for OTP</label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g. student@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Mail size={16} />
              <span>Send OTP Verification Code</span>
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Input 6-Digit Email OTP */}
      {step === 2 && (
        <div className="activity-card" style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="card-header-action">
            <h2 className="card-title-h2">Step 2: Enter Email Verification Code</h2>
          </div>

          <form onSubmit={handleVerifyOtp} style={{ padding: '1.25rem' }}>
            {infoMsg && (
              <div style={{ padding: '0.75rem 0.85rem', background: '#e0e7ff', color: '#3730a3', borderRadius: '8px', fontSize: '0.8125rem', marginBottom: '1.25rem', fontWeight: 600 }}>
                {infoMsg}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">6-Digit Verification Code</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 938210"
                maxLength={6}
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value)}
                style={{ letterSpacing: '6px', fontSize: '1.3rem', fontWeight: 700, textAlign: 'center' }}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <KeyRound size={18} />
              <span>Verify & Unlock Exam Marks</span>
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Unlocked Student Marks Report */}
      {step === 3 && activeStudentRecord && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '48px', height: '48px', background: '#dcfce7', color: '#15803d', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
                {activeStudentRecord.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{activeStudentRecord.name}</h2>
                <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  Reg No: <strong>{activeStudentRecord.regNumber}</strong> • {activeStudentRecord.grade}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={() => setStep(1)}>
                <RefreshCw size={14} />
                <span>Check Another Student</span>
              </button>

              <button className="btn-primary" onClick={downloadTranscript}>
                <Download size={16} />
                <span>Download Transcript PDF</span>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">CUMULATIVE GPA</span>
                <Award className="stat-icon" color="#4f46e5" />
              </div>
              <div className="stat-num" style={{ fontSize: '1.8rem' }}>{activeStudentRecord.gpa} / 4.0</div>
              <div className="stat-subtext" style={{ color: '#10b981' }}>Academic Rank: Top 5%</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">OVERALL PERCENTAGE</span>
                <BookOpen className="stat-icon" color="#10b981" />
              </div>
              <div className="stat-num" style={{ fontSize: '1.8rem' }}>{activeStudentRecord.percentage}</div>
              <div className="stat-subtext">Spring 2026 Term Evaluation</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">ACADEMIC STANDING</span>
                <CheckCircle2 className="stat-icon" color="#8b5cf6" />
              </div>
              <div className="stat-num" style={{ fontSize: '1.3rem', marginTop: '0.5rem', color: '#15803d' }}>{activeStudentRecord.status}</div>
              <div className="stat-subtext">Verified by Registrar</div>
            </div>
          </div>

          {/* Subject Breakdown Table */}
          <div className="activity-card">
            <div className="card-header-action">
              <h2 className="card-title-h2">Subject Marks & Grade Breakdown</h2>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>COURSE CODE</th>
                    <th>SUBJECT NAME</th>
                    <th>ASSIGNED INSTRUCTOR</th>
                    <th>SCORE (%)</th>
                    <th>LETTER GRADE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {activeStudentRecord.subjects.map((sub, idx) => (
                    <tr key={idx}>
                      <td className="timestamp-col"><strong style={{ color: '#4f46e5' }}>{sub.code}</strong></td>
                      <td className="user-name-bold">{sub.name}</td>
                      <td>{sub.teacher}</td>
                      <td className="user-name-bold" style={{ fontSize: '1rem' }}>{sub.score}%</td>
                      <td>
                        <span className="role-pill STUDENT" style={{ fontWeight: 700 }}>{sub.grade}</span>
                      </td>
                      <td>
                        <span className="stat-badge green">Passed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
