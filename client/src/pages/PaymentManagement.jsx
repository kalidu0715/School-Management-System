import React, { useState } from 'react';
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  Download,
  Plus,
  Clock,
  ShieldCheck,
  Banknote,
  X,
  Trophy,
  Sliders,
  Edit,
  Trash2,
  Check,
  AlertCircle,
  Tag,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PaymentManagement = () => {
  const { user, activeRoleView } = useAuth();
  const isRegistrar = activeRoleView === 'REGISTRAR';

  // Active view tab: 'tuition' or 'sports' or 'history'
  const [activePaymentTab, setActivePaymentTab] = useState('all');

  // Modals state
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isAddSportModalOpen, setIsAddSportModalOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState('');

  // Payment Form State
  const [paymentCategory, setPaymentCategory] = useState('SPORTS'); // 'TUITION' or 'SPORTS'
  const [selectedSportId, setSelectedSportId] = useState('sp-1');
  const [selectedPlan, setSelectedPlan] = useState('TERM'); // 'MONTHLY', 'TERM', 'ANNUAL'
  const [selectedTerm, setSelectedTerm] = useState('Term 1 (Spring 2026)');
  const [selectedMonth, setSelectedMonth] = useState('March 2026');
  const [studentName, setStudentName] = useState(user && user.role === 'STUDENT' ? user.name : 'Ruwin');
  const [paymentMethod, setPaymentMethod] = useState('Credit / Debit Card');

  // Sports Payment Options (Exclusively Controlled by Registrar)
  const [sportsOptions, setSportsOptions] = useState([
    {
      id: 'sp-1',
      sport: 'Cricket Academy & Kit',
      category: 'Cricket',
      feeTerm: 18000,
      feeMonthly: 6000,
      squad: '1st XI & Junior Squads',
      coach: 'Coach Bandara',
      active: true,
    },
    {
      id: 'sp-2',
      sport: 'Swimming Squad & Pool Membership',
      category: 'Swimming',
      feeTerm: 15000,
      feeMonthly: 5000,
      squad: 'Sugathadasa Aquatics Squad',
      coach: 'Coach Manoj',
      active: true,
    },
    {
      id: 'sp-3',
      sport: 'Badminton Coaching & Court Pass',
      category: 'Badminton',
      feeTerm: 12000,
      feeMonthly: 4000,
      squad: 'Junior & Senior Singles/Doubles',
      coach: 'Coach Pradeep',
      active: true,
    },
    {
      id: 'sp-4',
      sport: 'Track & Athletics Training',
      category: 'Athletics',
      feeTerm: 8000,
      feeMonthly: 3000,
      squad: '400m Track & Sprint Squad',
      coach: 'Coach Dissanayake',
      active: true,
    },
    {
      id: 'sp-5',
      sport: 'Basketball League & Team Kit',
      category: 'Basketball',
      feeTerm: 10000,
      feeMonthly: 3500,
      squad: 'U-17 & Senior Basketball Team',
      coach: 'Coach Fernando',
      active: true,
    },
    {
      id: 'sp-6',
      sport: 'Football Squad & Match Fees',
      category: 'Football',
      feeTerm: 12000,
      feeMonthly: 4000,
      squad: '1st XI Football Team',
      coach: 'Coach Perera',
      active: true,
    },
  ]);

  // New Sport Modal Form State (Registrar exclusive)
  const [newSportName, setNewSportName] = useState('');
  const [newSportTermFee, setNewSportTermFee] = useState('');
  const [newSportMonthlyFee, setNewSportMonthlyFee] = useState('');
  const [newSportSquad, setNewSportSquad] = useState('');
  const [newSportCoach, setNewSportCoach] = useState('');

  // Payment History Ledger
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 'inv-8821',
      date: '2026-03-10',
      category: 'Tuition Fee',
      studentName: 'Ruwin (Grade 10)',
      payer: 'Ruwin (Student)',
      itemTitle: 'Term 1 (Spring 2026)',
      frequency: 'Term-Wise',
      amount: 'LKR 95,000',
      method: 'Credit Card',
      status: 'Cleared & Verified',
    },
    {
      id: 'inv-8815',
      date: '2026-03-08',
      category: 'Sports Fee',
      studentName: 'Ruwin (Grade 10)',
      payer: 'Ruwin (Student)',
      itemTitle: 'Cricket Academy & Kit (Term 1)',
      frequency: 'Term-Wise',
      amount: 'LKR 18,000',
      method: 'Online Banking',
      status: 'Cleared & Verified',
    },
    {
      id: 'inv-7704',
      date: '2026-02-15',
      category: 'Sports Fee',
      studentName: 'Tharin (Grade 11)',
      payer: 'Tharin (Student)',
      itemTitle: 'Swimming Squad & Pool Membership (Term 1)',
      frequency: 'Term-Wise',
      amount: 'LKR 15,000',
      method: 'Online Banking',
      status: 'Cleared & Verified',
    },
    {
      id: 'inv-6412',
      date: '2026-01-20',
      category: 'Sports Fee',
      studentName: 'Amoda (Grade 10)',
      payer: 'Amoda (Student)',
      itemTitle: 'Badminton Coaching & Court Pass (Term 1)',
      frequency: 'Term-Wise',
      amount: 'LKR 12,000',
      method: 'Direct Bank Wire',
      status: 'Cleared & Verified',
    },
    {
      id: 'inv-5201',
      date: '2025-09-05',
      category: 'Tuition Fee',
      studentName: 'Hasini (Grade 12)',
      payer: 'Hasini (Student)',
      itemTitle: 'Annual 2025-2026',
      frequency: 'Annual (10% Disc)',
      amount: 'LKR 270,000',
      method: 'Direct Bank Wire',
      status: 'Cleared & Verified',
    },
  ]);

  // Process Student / Registrar Payment
  const handleProcessPayment = (e) => {
    e.preventDefault();

    let amountStr = 'LKR 95,000';
    let planTitle = selectedTerm;
    let categoryName = 'Tuition Fee';

    if (paymentCategory === 'TUITION') {
      if (selectedPlan === 'MONTHLY') {
        amountStr = 'LKR 25,000';
        planTitle = `Monthly Tuition (${selectedMonth})`;
      } else if (selectedPlan === 'ANNUAL') {
        amountStr = 'LKR 270,000';
        planTitle = 'Full Academic Year Tuition 2026-2027';
      } else {
        amountStr = 'LKR 95,000';
        planTitle = `Tuition: ${selectedTerm}`;
      }
    } else {
      // Sports Payment
      categoryName = 'Sports Fee';
      const targetSport = sportsOptions.find((s) => s.id === selectedSportId) || sportsOptions[0];
      if (selectedPlan === 'MONTHLY') {
        amountStr = `LKR ${targetSport.feeMonthly.toLocaleString()}`;
        planTitle = `${targetSport.sport} - Monthly (${selectedMonth})`;
      } else {
        amountStr = `LKR ${targetSport.feeTerm.toLocaleString()}`;
        planTitle = `${targetSport.sport} - ${selectedTerm}`;
      }
    }

    const newPayment = {
      id: 'inv-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      category: categoryName,
      studentName: `${studentName} (Student)`,
      payer: user ? `${user.name} (${user.role})` : `${studentName} (Student)`,
      itemTitle: planTitle,
      frequency: selectedPlan === 'MONTHLY' ? 'Monthly' : selectedPlan === 'TERM' ? 'Term-Wise' : 'Annual (10% Disc)',
      amount: amountStr,
      method: paymentMethod,
      status: 'Cleared & Verified',
    };

    setPaymentHistory([newPayment, ...paymentHistory]);
    setIsPayModalOpen(false);

    setSuccessAlert(`Payment of ${amountStr} for "${planTitle}" successfully processed! Receipt generated.`);
    setTimeout(() => setSuccessAlert(''), 4500);
  };

  // Registrar Option: Toggle Sport Option Active/Inactive
  const handleToggleSportActive = (sportId) => {
    if (!isRegistrar) return;
    setSportsOptions(
      sportsOptions.map((s) => (s.id === sportId ? { ...s, active: !s.active } : s))
    );
  };

  // Registrar Option: Add New Sport Payment Option
  const handleAddSportOption = (e) => {
    e.preventDefault();
    if (!newSportName || !newSportTermFee) return;

    const newSport = {
      id: 'sp-' + Date.now(),
      sport: newSportName,
      category: newSportName.split(' ')[0],
      feeTerm: parseInt(newSportTermFee, 10) || 10000,
      feeMonthly: parseInt(newSportMonthlyFee, 10) || 3500,
      squad: newSportSquad || 'General Squad',
      coach: newSportCoach || 'Athletic Director',
      active: true,
    };

    setSportsOptions([...sportsOptions, newSport]);
    setNewSportName('');
    setNewSportTermFee('');
    setNewSportMonthlyFee('');
    setNewSportSquad('');
    setNewSportCoach('');
    setIsAddSportModalOpen(false);

    setSuccessAlert(`New sports payment option "${newSport.sport}" successfully added by Registrar!`);
    setTimeout(() => setSuccessAlert(''), 4000);
  };

  // Registrar Option: Change Ledger Status
  const handleCycleStatus = (invId) => {
    if (!isRegistrar) return;
    setPaymentHistory(
      paymentHistory.map((p) => {
        if (p.id === invId) {
          const nextStatus =
            p.status === 'Cleared & Verified'
              ? 'Pending Review'
              : p.status === 'Pending Review'
              ? 'Sports Scholarship / Exempt'
              : 'Cleared & Verified';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  // Download Official Receipt
  const downloadReceipt = (item) => {
    const text = `=================================================================
SCHOOL MANAGEMENT SYSTEM - OFFICIAL PAYMENT CLEARANCE RECEIPT
=================================================================
Receipt Invoice ID: ${item.id}
Payment Date: ${item.date}
Payment Category: ${item.category}
Student Name: ${item.studentName}
Payer / Remitter: ${item.payer}
Payment Frequency: ${item.frequency}
Covered Package / Period: ${item.itemTitle}
Total Amount Paid: ${item.amount} (Sri Lankan Rupees)
Payment Method: ${item.method}
Clearance Status: ${item.status}

INSTITUTIONAL CERTIFICATION:
This official receipt confirms that the fee amount indicated above has been
duly received, accounted for, and authorized into school accounts.

Authorized by: Office of the School Registrar
Governing Office: Directorate of Finance & Physical Education
Official Verification Code: SYS-PAY-REGISTRAR-${Math.floor(100000 + Math.random() * 900000)}
=================================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt_${item.id}_${item.category.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  // Filter history
  const filteredHistory = paymentHistory.filter((item) => {
    if (activePaymentTab === 'tuition') return item.category === 'Tuition Fee';
    if (activePaymentTab === 'sports') return item.category === 'Sports Fee';
    return true;
  });

  return (
    <div className="content-body">
      {/* Title & Actions Row */}
      <div className="page-title-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.65rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              <CreditCard size={14} />
              <span>Institutional Payment Gateway</span>
            </span>
            <span className="stat-badge green">LKR Currency</span>
          </div>
          <h1 className="page-h1">Fee & Sports Payment Management</h1>
          <p className="page-sub">
            Pay for Academic Tuition Fees and Sports Subscriptions (Cricket, Swimming, Badminton, Athletics) in Sri Lankan Rupees.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {isRegistrar && (
            <button
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid #6366f1', color: '#4f46e5', fontWeight: 700 }}
              onClick={() => setIsAddSportModalOpen(true)}
            >
              <Plus size={16} />
              <span>Add Sport Option (Registrar)</span>
            </button>
          )}

          <button
            className="btn-force-sync"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            onClick={() => {
              setPaymentCategory('SPORTS');
              setIsPayModalOpen(true);
            }}
          >
            <Trophy size={16} />
            <span>Pay for Sports</span>
          </button>

          <button
            className="btn-force-sync"
            style={{ background: '#0f172a' }}
            onClick={() => {
              setPaymentCategory('TUITION');
              setIsPayModalOpen(true);
            }}
          >
            <CreditCard size={16} />
            <span>Pay Tuition Fee</span>
          </button>
        </div>
      </div>

      {/* Success Alert */}
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

      {/* Registrar Control Banner vs. Student Notice */}
      {isRegistrar ? (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
            border: '1px solid #c7d2fe',
            borderRadius: '12px',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '42px', height: '42px', background: '#6366f1', color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#312e81', marginBottom: '0.15rem' }}>
                Registrar Payment & Sports Options Control Console
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#4338ca' }}>
                As Registrar, you have full authority to activate/deactivate sports fee options, configure prices, and certify payment clearance statuses.
              </p>
            </div>
          </div>
          <span
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              background: '#4338ca',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Authorized: Registrar Office
          </span>
        </div>
      ) : (
        <div
          style={{
            padding: '0.75rem 1rem',
            background: '#f8fafc',
            border: '1px solid var(--border-light)',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
          }}
        >
          <ShieldCheck size={16} color="#6366f1" />
          <span>
            <strong>Official Payment Policy:</strong> All tuition & sports payment options, fee structures, and receipt verifications are governed exclusively by the <strong>Office of the School Registrar</strong>.
          </span>
        </div>
      )}

      {/* Top Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div className="stat-card" style={{ borderLeft: '4px solid #6366f1' }}>
          <div className="stat-header">
            <span className="stat-title">TERM TUITION FEE</span>
            <Calendar className="stat-icon" color="#6366f1" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.5rem', color: '#4f46e5' }}>LKR 95,000</div>
          <div className="stat-subtext">3 Terms / Academic Year</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div className="stat-header">
            <span className="stat-title">ANNUAL DISCOUNTED</span>
            <Banknote className="stat-icon" color="#10b981" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.5rem', color: '#15803d' }}>LKR 270,000</div>
          <div className="stat-subtext">Save LKR 15,000 (10% Off)</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #eab308' }}>
          <div className="stat-header">
            <span className="stat-title">ACTIVE SPORTS SQUADS</span>
            <Trophy className="stat-icon" color="#eab308" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.5rem', color: '#ca8a04' }}>
            {sportsOptions.filter((s) => s.active).length} Sports Options
          </div>
          <div className="stat-subtext">Controlled by Registrar</div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
          <div className="stat-header">
            <span className="stat-title">VERIFIED RECEIPTS</span>
            <CheckCircle2 className="stat-icon" color="#8b5cf6" />
          </div>
          <div className="stat-num" style={{ fontSize: '1.5rem', color: '#7c3aed' }}>
            {paymentHistory.length} Receipts
          </div>
          <div className="stat-subtext">All Clearances Verified</div>
        </div>
      </div>

      {/* SPORTS PAYMENT OPTIONS SECTION */}
      <div className="activity-card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-header-action">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Trophy size={18} color="#eab308" />
            <h2 className="card-title-h2">Sports & Athletics Payment Options (LKR)</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="stat-badge blue" style={{ background: '#ede9fe', color: '#6d28d9' }}>
              Registrar Controlled
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', padding: '1.25rem' }}>
          {sportsOptions.map((sp) => (
            <div
              key={sp.id}
              style={{
                border: sp.active ? '1px solid var(--border-light)' : '1px dashed #cbd5e1',
                borderRadius: '10px',
                padding: '1rem',
                background: sp.active ? 'var(--bg-card)' : 'var(--border-muted)',
                opacity: sp.active ? 1 : 0.65,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: sp.active ? '#fef3c7' : '#e2e8f0',
                      color: sp.active ? '#b45309' : '#64748b',
                    }}
                  >
                    {sp.category}
                  </span>

                  {/* Registrar Toggle Badge */}
                  {isRegistrar ? (
                    <button
                      onClick={() => handleToggleSportActive(sp.id)}
                      style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: sp.active ? '#dcfce7' : '#fee2e2',
                        color: sp.active ? '#15803d' : '#b91c1c',
                      }}
                      title="Registrar Toggle: Click to Activate/Deactivate"
                    >
                      {sp.active ? '● Active (Click to Pause)' : '○ Paused (Click to Activate)'}
                    </button>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: sp.active ? '#15803d' : '#94a3b8',
                      }}
                    >
                      {sp.active ? 'Available' : 'Closed by Registrar'}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {sp.sport}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  Squad: <strong>{sp.squad}</strong> • Coach: {sp.coach}
                </div>

                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--border-muted)', borderRadius: '8px', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    <span>Term-Wise Fee:</span>
                    <span style={{ color: '#4f46e5' }}>LKR {sp.feeTerm.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    <span>Monthly Subscription:</span>
                    <span>LKR {sp.feeMonthly.toLocaleString()} / mo</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {sp.active ? (
                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  onClick={() => {
                    setPaymentCategory('SPORTS');
                    setSelectedSportId(sp.id);
                    setIsPayModalOpen(true);
                  }}
                >
                  <CreditCard size={14} style={{ marginRight: '4px' }} />
                  <span>Pay for this Sport</span>
                </button>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', padding: '0.35rem' }}>
                  Option Paused by Registrar
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT HISTORY LEDGER TABLE */}
      <div className="activity-card">
        <div className="card-header-action" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Clock size={18} color="#6366f1" />
            <h2 className="card-title-h2">Payment History & Clearance Ledger (LKR)</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['all', 'tuition', 'sports'].map((tab) => (
              <button
                key={tab}
                className={`calendar-filter-btn ${activePaymentTab === tab ? 'active' : ''}`}
                onClick={() => setActivePaymentTab(tab)}
                style={{ textTransform: 'capitalize' }}
              >
                {tab === 'all' ? 'All Payments' : `${tab} Fees`}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>INVOICE #</th>
                <th>DATE</th>
                <th>CATEGORY</th>
                <th>STUDENT / REMITTER</th>
                <th>PACKAGE / COVERED TERM</th>
                <th>FREQUENCY</th>
                <th>AMOUNT PAID</th>
                <th>PAYMENT METHOD</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr key={item.id}>
                  <td className="timestamp-col">
                    <strong style={{ color: '#6366f1' }}>{item.id}</strong>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: item.category === 'Sports Fee' ? '#fef3c7' : '#e0e7ff',
                        color: item.category === 'Sports Fee' ? '#b45309' : '#4338ca',
                      }}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td>
                    <div className="user-name-bold">{item.studentName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payer: {item.payer}</div>
                  </td>
                  <td>
                    <strong>{item.itemTitle}</strong>
                  </td>
                  <td>
                    <span className="role-pill STUDENT">{item.frequency}</span>
                  </td>
                  <td className="user-name-bold" style={{ color: 'var(--text-main)' }}>
                    {item.amount}
                  </td>
                  <td>{item.method}</td>
                  <td>
                    {isRegistrar ? (
                      <button
                        onClick={() => handleCycleStatus(item.id)}
                        className={`stat-badge ${
                          item.status === 'Cleared & Verified'
                            ? 'green'
                            : item.status === 'Pending Review'
                            ? 'blue'
                            : 'stat-badge'
                        }`}
                        style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        title="Registrar Authority: Click to toggle Clearance Status"
                      >
                        <CheckCircle2 size={12} /> {item.status} (Edit)
                      </button>
                    ) : (
                      <span
                        className={`stat-badge ${
                          item.status === 'Cleared & Verified'
                            ? 'green'
                            : item.status === 'Pending Review'
                            ? 'blue'
                            : 'stat-badge'
                        }`}
                      >
                        <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '3px' }} /> {item.status}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      onClick={() => downloadReceipt(item)}
                      title="Download Official Sealed Receipt"
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

      {/* MODAL 1: PAY FOR TUITION OR SPORTS */}
      {isPayModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsPayModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="#6366f1" />
                <h3 className="modal-title">Process Institutional Payment (LKR)</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsPayModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProcessPayment}>
              {/* Select Category: Tuition vs Sports */}
              <div className="form-group">
                <label className="form-label">Payment Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className={`calendar-filter-btn ${paymentCategory === 'TUITION' ? 'active' : ''}`}
                    onClick={() => setPaymentCategory('TUITION')}
                    style={{ padding: '0.65rem', textAlign: 'center', borderRadius: '8px' }}
                  >
                    📚 Academic Tuition
                  </button>
                  <button
                    type="button"
                    className={`calendar-filter-btn ${paymentCategory === 'SPORTS' ? 'active' : ''}`}
                    onClick={() => setPaymentCategory('SPORTS')}
                    style={{ padding: '0.65rem', textAlign: 'center', borderRadius: '8px' }}
                  >
                    🏆 Sports & Athletics
                  </button>
                </div>
              </div>

              {/* Student Name */}
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Ruwin or Tharin"
                  required
                />
              </div>

              {/* If Sports Payment, select specific Sport */}
              {paymentCategory === 'SPORTS' && (
                <div className="form-group">
                  <label className="form-label">Select Sport Option (Controlled by Registrar)</label>
                  <select
                    className="form-input"
                    value={selectedSportId}
                    onChange={(e) => setSelectedSportId(e.target.value)}
                  >
                    {sportsOptions
                      .filter((s) => s.active || isRegistrar)
                      .map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {sp.sport} (Term: LKR {sp.feeTerm.toLocaleString()} | Monthly: LKR {sp.feeMonthly.toLocaleString()})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Payment Frequency */}
              <div className="form-group">
                <label className="form-label">Payment Frequency</label>
                <select
                  className="form-input"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  <option value="TERM">Term-Wise Plan (3 Terms / Year)</option>
                  <option value="MONTHLY">Monthly Plan</option>
                  {paymentCategory === 'TUITION' && (
                    <option value="ANNUAL">Annual Plan (10% Discount - LKR 270,000)</option>
                  )}
                </select>
              </div>

              {/* Term selection */}
              {selectedPlan === 'TERM' && (
                <div className="form-group">
                  <label className="form-label">Select Academic Term (3 Terms / Year)</label>
                  <select
                    className="form-input"
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                  >
                    <option value="Term 1 (Spring 2026)">Term 1 (Spring Term: Jan - Apr)</option>
                    <option value="Term 2 (Summer 2026)">Term 2 (Summer Term: May - Aug)</option>
                    <option value="Term 3 (Winter 2026)">Term 3 (Winter Term: Sep - Dec)</option>
                  </select>
                </div>
              )}

              {/* Month selection */}
              {selectedPlan === 'MONTHLY' && (
                <div className="form-group">
                  <label className="form-label">Select Month</label>
                  <select
                    className="form-input"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="January 2026">January 2026</option>
                    <option value="February 2026">February 2026</option>
                    <option value="March 2026">March 2026</option>
                    <option value="April 2026">April 2026</option>
                    <option value="May 2026">May 2026</option>
                  </select>
                </div>
              )}

              {/* Payment Method */}
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select
                  className="form-input"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Credit / Debit Card">Credit / Debit Card (Visa / Mastercard)</option>
                  <option value="Online Banking">Online Banking Transfer</option>
                  <option value="Direct Bank Wire">Direct Bank Wire Transfer</option>
                  {isRegistrar && <option value="Direct Cash Clearance (Registrar Counter)">Direct Cash Clearance (Registrar Counter)</option>}
                </select>
              </div>

              {/* Total Due Banner */}
              <div style={{ padding: '0.85rem 1rem', background: 'var(--border-muted)', border: '1px solid var(--border-light)', borderRadius: '8px', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  <span>Total Amount Due (LKR):</span>
                  <span style={{ color: '#4f46e5' }}>
                    {paymentCategory === 'TUITION'
                      ? selectedPlan === 'MONTHLY'
                        ? 'LKR 25,000'
                        : selectedPlan === 'ANNUAL'
                        ? 'LKR 270,000'
                        : 'LKR 95,000'
                      : (() => {
                          const s = sportsOptions.find((sp) => sp.id === selectedSportId) || sportsOptions[0];
                          return selectedPlan === 'MONTHLY'
                            ? `LKR ${s.feeMonthly.toLocaleString()}`
                            : `LKR ${s.feeTerm.toLocaleString()}`;
                        })()}
                  </span>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Confirm & Pay Now (LKR)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: REGISTRAR ADD NEW SPORT PAYMENT OPTION */}
      {isAddSportModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddSportModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={20} color="#eab308" />
                <h3 className="modal-title">Registrar: Add Sports Payment Option</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsAddSportModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSportOption}>
              <div className="form-group">
                <label className="form-label">Sport / Activity Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Table Tennis Academy & Kit"
                  value={newSportName}
                  onChange={(e) => setNewSportName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Term-Wise Fee (LKR)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 12000"
                    value={newSportTermFee}
                    onChange={(e) => setNewSportTermFee(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Monthly Fee (LKR)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 4000"
                    value={newSportMonthlyFee}
                    onChange={(e) => setNewSportMonthlyFee(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Squad Level & Training Division</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Senior Team & Development Pool"
                  value={newSportSquad}
                  onChange={(e) => setNewSportSquad(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Head Coach / Instructor</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Coach Wickramasinghe"
                  value={newSportCoach}
                  onChange={(e) => setNewSportCoach(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Create Sports Payment Option
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
