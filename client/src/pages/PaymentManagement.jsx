import React, { useState } from 'react';
import { CreditCard, Calendar, CheckCircle2, Download, Plus, Clock, ShieldCheck, Banknote, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PaymentManagement = () => {
  const { user, activeRoleView } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('TERM'); // 'MONTHLY', 'TERM', 'ANNUAL'
  const [selectedTerm, setSelectedTerm] = useState('Term 1 (Spring 2026)');
  const [selectedMonth, setSelectedMonth] = useState('March 2026');
  const [paymentMethod, setPaymentMethod] = useState('Credit / Debit Card');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState('');

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 'inv-8821',
      date: '2026-03-10',
      studentName: 'Ruwin (Grade 10)',
      payer: 'Amitha (Parent)',
      planType: 'Term 1 (Spring 2026)',
      frequency: 'Term-Wise',
      amount: 'LKR 95,000',
      method: 'Credit Card',
      status: 'Cleared & Verified',
    },
    {
      id: 'inv-7704',
      date: '2026-01-15',
      studentName: 'Ruwin (Grade 10)',
      payer: 'Amitha (Parent)',
      planType: 'Term 3 (Winter 2025)',
      frequency: 'Term-Wise',
      amount: 'LKR 95,000',
      method: 'Online Banking',
      status: 'Cleared & Verified',
    },
    {
      id: 'inv-6412',
      date: '2025-09-05',
      studentName: 'Tharin (Grade 11)',
      payer: 'Supuni (Parent)',
      planType: 'Annual 2025-2026',
      frequency: 'Annual (10% Disc)',
      amount: 'LKR 270,000',
      method: 'Direct Bank Wire',
      status: 'Cleared & Verified',
    },
  ]);

  const handleProcessPayment = (e) => {
    e.preventDefault();

    let amountStr = 'LKR 95,000';
    let planTitle = selectedTerm;

    if (selectedPlan === 'MONTHLY') {
      amountStr = 'LKR 25,000';
      planTitle = `Monthly Fee (${selectedMonth})`;
    } else if (selectedPlan === 'ANNUAL') {
      amountStr = 'LKR 270,000';
      planTitle = 'Full Academic Year 2026-2027';
    }

    const newPayment = {
      id: 'inv-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      studentName: user ? `${user.name} (${user.department || 'Student'})` : 'Ruwin (Grade 10)',
      payer: user ? user.name : 'Parent / Guardian',
      planType: planTitle,
      frequency: selectedPlan === 'MONTHLY' ? 'Monthly' : selectedPlan === 'TERM' ? 'Term-Wise' : 'Annual (10% Disc)',
      amount: amountStr,
      method: paymentMethod,
      status: 'Cleared & Verified',
    };

    setPaymentHistory([newPayment, ...paymentHistory]);
    setIsModalOpen(false);

    setSuccessAlert(`Payment of ${amountStr} for ${planTitle} successfully processed! Receipt generated.`);
    setTimeout(() => setSuccessAlert(''), 4000);
  };

  const downloadReceipt = (item) => {
    const text = `SCHOOL MANAGEMENT SYSTEM - OFFICIAL TUITION PAYMENT RECEIPT
-----------------------------------------------------------------
Receipt Invoice ID: ${item.id}
Payment Date: ${item.date}
Student Name: ${item.studentName}
Payer / Guardian: ${item.payer}
Payment Frequency: ${item.frequency}
Covered Term / Period: ${item.planType}
Total Amount Paid: ${item.amount} (Sri Lankan Rupees)
Payment Method: ${item.method}
Clearance Status: ${item.status}

Authorized by: Office of the School Registrar
Verification Code: SYS-PAY-${Math.floor(100000 + Math.random() * 900000)}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tuition_Receipt_${item.id}.txt`;
    a.click();
  };

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Tuition Fee Payment Management (LKR)</h1>
          <p className="page-sub">Pay student tuition fees in Sri Lankan Rupees (LKR) by Monthly, Term-Wise (3 Terms/Year), or Annual plans & access payment history.</p>
        </div>

        <button className="btn-force-sync" style={{ background: 'var(--primary-gradient)' }} onClick={() => setIsModalOpen(true)}>
          <CreditCard size={16} />
          <span>Pay Tuition Fee Now</span>
        </button>
      </div>

      {successAlert && (
        <div
          style={{
            padding: '0.85rem 1rem',
            background: '#dcfce7',
            color: '#15803d',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{successAlert}</span>
        </div>
      )}

      {/* Tuition Plan Cards (Monthly, Term-Wise, Annual in LKR) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
        {/* Monthly Plan */}
        <div className="stat-card" style={{ border: selectedPlan === 'MONTHLY' ? '2px solid #6366f1' : '1px solid var(--border-light)' }}>
          <div className="stat-header">
            <span className="stat-title">MONTHLY PLAN</span>
            <Calendar className="stat-icon" color="#6366f1" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.5rem' }}>LKR 25,000 / mo</div>
          <div className="stat-subtext">Flexible month-by-month payment</div>
          <button
            className="btn-secondary"
            style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
            onClick={() => {
              setSelectedPlan('MONTHLY');
              setIsModalOpen(true);
            }}
          >
            Select Monthly
          </button>
        </div>

        {/* Term-Wise Plan (3 Terms per year) */}
        <div className="stat-card" style={{ border: selectedPlan === 'TERM' ? '2px solid #6366f1' : '1px solid var(--border-light)', background: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)' }}>
          <div className="stat-header">
            <span className="stat-title" style={{ color: '#4c1d95', fontWeight: 700 }}>TERM-WISE PLAN (3 TERMS / YR)</span>
            <CreditCard className="stat-icon" color="#8b5cf6" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.5rem', color: '#5b21b6' }}>LKR 95,000 / term</div>
          <div className="stat-subtext" style={{ color: '#6d28d9' }}>Term 1 (Spring), Term 2 (Summer), Term 3 (Winter)</div>
          <button
            className="btn-primary"
            style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
            onClick={() => {
              setSelectedPlan('TERM');
              setIsModalOpen(true);
            }}
          >
            Select Term-Wise
          </button>
        </div>

        {/* Annual Plan */}
        <div className="stat-card" style={{ border: selectedPlan === 'ANNUAL' ? '2px solid #6366f1' : '1px solid var(--border-light)' }}>
          <div className="stat-header">
            <span className="stat-title">ANNUAL PLAN (10% OFF)</span>
            <Banknote className="stat-icon" color="#10b981" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.5rem', color: '#15803d' }}>LKR 270,000 / yr</div>
          <div className="stat-subtext">Covers all 3 terms with LKR 15,000 savings</div>
          <button
            className="btn-secondary"
            style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
            onClick={() => {
              setSelectedPlan('ANNUAL');
              setIsModalOpen(true);
            }}
          >
            Select Annual
          </button>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="activity-card">
        <div className="card-header-action">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Clock size={18} color="#6366f1" />
            <h2 className="card-title-h2">Student Payment History Ledger (LKR)</h2>
          </div>
          <span className="stat-badge green">Verified Clearances</span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>INVOICE #</th>
                <th>PAYMENT DATE</th>
                <th>STUDENT / PAYER</th>
                <th>PLAN FREQUENCY</th>
                <th>COVERED TERM / PERIOD</th>
                <th>AMOUNT PAID (LKR)</th>
                <th>PAYMENT METHOD</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item) => (
                <tr key={item.id}>
                  <td className="timestamp-col"><strong style={{ color: '#6366f1' }}>{item.id}</strong></td>
                  <td>{item.date}</td>
                  <td>
                    <div className="user-name-bold">{item.studentName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Payer: {item.payer}</div>
                  </td>
                  <td>
                    <span className="role-pill STUDENT">{item.frequency}</span>
                  </td>
                  <td><strong>{item.planType}</strong></td>
                  <td className="user-name-bold" style={{ color: '#0f172a' }}>{item.amount}</td>
                  <td>{item.method}</td>
                  <td>
                    <span className="stat-badge green">
                      <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '3px' }} /> {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      onClick={() => downloadReceipt(item)}
                    >
                      <Download size={12} />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Tuition Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="#6366f1" />
                <h3 className="modal-title">Pay Student Tuition Fee (LKR)</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProcessPayment}>
              <div className="form-group">
                <label className="form-label">Payment Plan Frequency</label>
                <select
                  className="form-input"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  <option value="TERM">Term-Wise Plan (LKR 95,000 / term)</option>
                  <option value="MONTHLY">Monthly Plan (LKR 25,000 / month)</option>
                  <option value="ANNUAL">Annual Plan (LKR 270,000 / year - 10% OFF)</option>
                </select>
              </div>

              {selectedPlan === 'TERM' && (
                <div className="form-group">
                  <label className="form-label">Select Academic Term (3 Terms / Year)</label>
                  <select
                    className="form-input"
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                  >
                    <option value="Term 1 (Spring 2026)">Term 1 (Spring Term: Jan - Apr) - LKR 95,000</option>
                    <option value="Term 2 (Summer 2026)">Term 2 (Summer Term: May - Aug) - LKR 95,000</option>
                    <option value="Term 3 (Winter 2026)">Term 3 (Winter Term: Sep - Dec) - LKR 95,000</option>
                  </select>
                </div>
              )}

              {selectedPlan === 'MONTHLY' && (
                <div className="form-group">
                  <label className="form-label">Select Month</label>
                  <select
                    className="form-input"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="January 2026">January 2026 (LKR 25,000)</option>
                    <option value="February 2026">February 2026 (LKR 25,000)</option>
                    <option value="March 2026">March 2026 (LKR 25,000)</option>
                    <option value="April 2026">April 2026 (LKR 25,000)</option>
                    <option value="May 2026">May 2026 (LKR 25,000)</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select
                  className="form-input"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Credit / Debit Card">Credit / Debit Card (Visa/Mastercard)</option>
                  <option value="Online Banking">Online Banking Transfer</option>
                  <option value="Direct Bank Wire">Direct Bank Wire Transfer</option>
                </select>
              </div>

              <div style={{ padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                  <span>Total Amount Due (LKR):</span>
                  <span style={{ color: '#6366f1' }}>
                    {selectedPlan === 'MONTHLY' ? 'LKR 25,000' : selectedPlan === 'ANNUAL' ? 'LKR 270,000' : 'LKR 95,000'}
                  </span>
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Confirm & Pay Tuition Fee (LKR)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
