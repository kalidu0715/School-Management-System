import React from 'react';
import { DollarSign, CheckCircle2, Download, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SalaryManagement = () => {
  const { activeRoleView } = useAuth();
  const isAuthorized = activeRoleView === 'OWNER' || activeRoleView === 'REGISTRAR';

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
          Access Restricted
        </h2>
        <p style={{ color: '#64748b', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
          Salary Management is strictly restricted to the <strong>School Owner (Admin)</strong> and <strong>Registrar Office</strong> roles.
        </p>
      </div>
    );
  }

  const salaries = [
    { id: 'sal-1', name: 'Sajith', role: 'Teacher (Mathematics)', base: '$4,200.00', bonus: '$300.00', net: '$4,500.00', status: 'Paid', date: '2026-03-01' },
    { id: 'sal-2', name: 'Rehan', role: 'Teacher (Biology)', base: '$4,100.00', bonus: '$250.00', net: '$4,350.00', status: 'Paid', date: '2026-03-01' },
    { id: 'sal-3', name: 'Principal', role: 'Executive Operations', base: '$6,500.00', bonus: '$500.00', net: '$7,000.00', status: 'Paid', date: '2026-03-01' },
    { id: 'sal-4', name: 'Amal', role: 'Teacher (History)', base: '$3,900.00', bonus: '$200.00', net: '$4,100.00', status: 'Processing', date: '2026-03-01' },
    { id: 'sal-5', name: 'Siriwardhane', role: 'Teacher (Physics)', base: '$4,200.00', bonus: '$300.00', net: '$4,500.00', status: 'Processing', date: '2026-03-01' },
  ];

  const downloadSlip = (name) => {
    const text = `SCHOOL MANAGEMENT SYSTEM - OFFICIAL SALARY PAYSLIP\nStaff Member: ${name}\nPay Period: March 2026\nStatus: DISBURSED VIA DIRECT DEPOSIT\nAuthorized by: Administration & Principal Office`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payslip_${name.replace(/\s+/g, '_')}_March2026.txt`;
    a.click();
  };

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Staff Salary & Payroll Management</h1>
          <p className="page-sub">
            Confidential administrative ledger for faculty compensation, monthly disbursements, and pay slips.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">TOTAL MONTHLY PAYROLL</span>
            <DollarSign className="stat-icon" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.6rem' }}>$48,500.00</div>
          <div className="stat-subtext">March 2026 Term</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">DISBURSED SALARIES</span>
            <CheckCircle2 className="stat-icon" color="#10b981" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.6rem' }}>14 Staff</div>
          <div className="stat-subtext" style={{ color: '#10b981' }}>Cleared via Bank Wire</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">PENDING PROCESSING</span>
            <Clock className="stat-icon" color="#4f46e5" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.6rem' }}>2 Pending</div>
          <div className="stat-subtext">Scheduled for Friday</div>
        </div>
      </div>

      <div className="activity-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>EMPLOYEE NAME</th>
                <th>ROLE & DEPARTMENT</th>
                <th>BASE SALARY</th>
                <th>ALLOWANCE / BONUS</th>
                <th>NET PAYOUT</th>
                <th>PAYMENT STATUS</th>
                <th>PAYSLIP ACTION</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((row) => (
                <tr key={row.id}>
                  <td className="user-name-bold">{row.name}</td>
                  <td>
                    <span className="role-pill TEACHER">{row.role}</span>
                  </td>
                  <td>{row.base}</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>+{row.bonus}</td>
                  <td className="user-name-bold" style={{ color: '#0f172a' }}>{row.net}</td>
                  <td>
                    <span className={`stat-badge ${row.status === 'Paid' ? 'green' : 'blue'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => downloadSlip(row.name)}
                    >
                      <Download size={12} />
                      <span>Download Slip</span>
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
