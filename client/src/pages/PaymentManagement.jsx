import React, { useState, useEffect } from 'react';
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
  AlertTriangle,
  FileText,
  UserCheck,
  UserX,
  Filter,
  Search,
  BellRing,
  Lock,
  ArrowUpDown,
  Archive,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Helper to determine if a date is within 365 days (1 year) from now
const isWithinOneYear = (dateStr) => {
  if (!dateStr) return false;
  const itemTime = new Date(dateStr).getTime();
  const nowTime = new Date().getTime();
  const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
  return nowTime - itemTime <= ONE_YEAR_MS;
};

// Initial master payment & compliance dataset
const INITIAL_RECORDS = [
  {
    id: 'inv-8821',
    date: '2026-03-10',
    dueDate: '2026-03-15',
    category: 'Tuition Fee',
    studentName: 'Ruwin (Grade 10)',
    studentId: 'std-1',
    payer: 'Ruwin (Student)',
    itemTitle: 'Term 1 Academic Tuition (Spring 2026)',
    frequency: 'Term-Wise',
    amount: 'LKR 95,000',
    amountNum: 95000,
    method: 'Credit Card (Visa)',
    status: 'Cleared & Verified',
    complianceState: 'PAID', // 'PAID', 'UNPAID', 'OVERDUE'
    daysOverdue: 0,
    receiptCode: 'REG-VERIFIED-8821-LK',
  },
  {
    id: 'inv-8815',
    date: '2026-03-08',
    dueDate: '2026-03-10',
    category: 'Sports Fee',
    studentName: 'Ruwin (Grade 10)',
    studentId: 'std-1',
    payer: 'Ruwin (Student)',
    itemTitle: 'Cricket Academy & Kit (Term 1)',
    frequency: 'Term-Wise',
    amount: 'LKR 18,000',
    amountNum: 18000,
    method: 'Online Banking',
    status: 'Cleared & Verified',
    complianceState: 'PAID',
    daysOverdue: 0,
    receiptCode: 'REG-VERIFIED-8815-LK',
  },
  {
    id: 'inv-7704',
    date: '2026-02-15',
    dueDate: '2026-02-20',
    category: 'Sports Fee',
    studentName: 'Tharin (Grade 11)',
    studentId: 'std-2',
    payer: 'Tharin (Student)',
    itemTitle: 'Swimming Squad & Pool Membership (Term 1)',
    frequency: 'Term-Wise',
    amount: 'LKR 15,000',
    amountNum: 15000,
    method: 'Online Banking',
    status: 'Cleared & Verified',
    complianceState: 'PAID',
    daysOverdue: 0,
    receiptCode: 'REG-VERIFIED-7704-LK',
  },
  {
    id: 'inv-7701',
    date: '2026-02-10',
    dueDate: '2026-02-15',
    category: 'Tuition Fee',
    studentName: 'Tharin (Grade 11)',
    studentId: 'std-2',
    payer: 'Tharin (Student)',
    itemTitle: 'Term 1 Academic Tuition (Spring 2026)',
    frequency: 'Term-Wise',
    amount: 'LKR 95,000',
    amountNum: 95000,
    method: 'Direct Bank Wire',
    status: 'Cleared & Verified',
    complianceState: 'PAID',
    daysOverdue: 0,
    receiptCode: 'REG-VERIFIED-7701-LK',
  },
  {
    id: 'inv-6412',
    date: '2026-01-20',
    dueDate: '2026-01-25',
    category: 'Sports Fee',
    studentName: 'Amoda (Grade 10)',
    studentId: 'std-3',
    payer: 'Amoda (Student)',
    itemTitle: 'Badminton Coaching & Court Pass (Term 1)',
    frequency: 'Term-Wise',
    amount: 'LKR 12,000',
    amountNum: 12000,
    method: 'Direct Bank Wire',
    status: 'Cleared & Verified',
    complianceState: 'PAID',
    daysOverdue: 0,
    receiptCode: 'REG-VERIFIED-6412-LK',
  },
  {
    id: 'inv-6405',
    date: '',
    dueDate: '2026-11-05',
    category: 'Tuition Fee',
    studentName: 'Amoda (Grade 10)',
    studentId: 'std-3',
    payer: 'Amoda (Student)',
    itemTitle: 'Term 2 Academic Tuition (Summer 2026)',
    frequency: 'Term-Wise',
    amount: 'LKR 95,000',
    amountNum: 95000,
    method: 'Pending Gateway / Cash',
    status: 'Unpaid / Pending Review',
    complianceState: 'UNPAID',
    daysOverdue: 0,
    receiptCode: 'PENDING-REGISTRAR-CLEARANCE',
  },
  {
    id: 'inv-6399',
    date: '',
    dueDate: '2026-09-15',
    category: 'Sports Fee',
    studentName: 'Amoda (Grade 10)',
    studentId: 'std-3',
    payer: 'Amoda (Student)',
    itemTitle: 'Badminton Court Pass (Term 2 Renewal)',
    frequency: 'Term-Wise',
    amount: 'LKR 12,000',
    amountNum: 12000,
    method: 'Awaiting Remittance',
    status: '⚠️ Overdue (Action Required)',
    complianceState: 'OVERDUE',
    daysOverdue: 41,
    receiptCode: 'OVERDUE-PENALTY-ACCRUED',
  },
  {
    id: 'inv-5911',
    date: '2026-03-01',
    dueDate: '2026-03-05',
    category: 'Sports Fee',
    studentName: 'Hasini (Grade 12)',
    studentId: 'std-4',
    payer: 'Hasini (Student)',
    itemTitle: 'Track & Athletics Training (Term 1)',
    frequency: 'Term-Wise',
    amount: 'LKR 8,000',
    amountNum: 8000,
    method: 'Credit Card',
    status: 'Cleared & Verified',
    complianceState: 'PAID',
    daysOverdue: 0,
    receiptCode: 'REG-VERIFIED-5911-LK',
  },
  {
    id: 'inv-5902',
    date: '2026-01-15',
    dueDate: '2026-01-20',
    category: 'Tuition Fee',
    studentName: 'Hasini (Grade 12)',
    studentId: 'std-4',
    payer: 'Hasini (Student)',
    itemTitle: 'Term 1 Academic Tuition (Spring 2026)',
    frequency: 'Term-Wise',
    amount: 'LKR 95,000',
    amountNum: 95000,
    method: 'Online Banking',
    status: 'Cleared & Verified',
    complianceState: 'PAID',
    daysOverdue: 0,
    receiptCode: 'REG-VERIFIED-5902-LK',
  },
  {
    id: 'inv-4210',
    date: '',
    dueDate: '2026-11-10',
    category: 'Sports Fee',
    studentName: 'Kaveen (Grade 9)',
    studentId: 'std-5',
    payer: 'Kaveen (Student)',
    itemTitle: 'Basketball League & Team Kit (Term 2)',
    frequency: 'Term-Wise',
    amount: 'LKR 10,000',
    amountNum: 10000,
    method: 'Invoice Issued',
    status: 'Unpaid / Pending Review',
    complianceState: 'UNPAID',
    daysOverdue: 0,
    receiptCode: 'PENDING-REGISTRAR-CLEARANCE',
  },
  {
    id: 'inv-3118',
    date: '',
    dueDate: '2026-10-01',
    category: 'Sports Fee',
    studentName: 'Dinuka (Grade 11)',
    studentId: 'std-6',
    payer: 'Dinuka (Student)',
    itemTitle: 'Football Squad & Match Fees (Term 2)',
    frequency: 'Term-Wise',
    amount: 'LKR 12,000',
    amountNum: 12000,
    method: 'Awaiting Remittance',
    status: '⚠️ Overdue (Action Required)',
    complianceState: 'OVERDUE',
    daysOverdue: 25,
    receiptCode: 'OVERDUE-PENALTY-ACCRUED',
  },
  // Legacy record older than 1 year (will be auto-purged by retention engine)
  {
    id: 'inv-1002-OLD',
    date: '2025-05-10',
    dueDate: '2025-05-15',
    category: 'Tuition Fee',
    studentName: 'Ruwin (Grade 10)',
    studentId: 'std-1',
    payer: 'Ruwin (Student)',
    itemTitle: 'Term 1 Academic Tuition (2025 Archive)',
    frequency: 'Term-Wise',
    amount: 'LKR 85,000',
    amountNum: 85000,
    method: 'Cash',
    status: 'Cleared & Verified',
    complianceState: 'PAID',
    daysOverdue: 0,
    receiptCode: 'ARCHIVE-OLD-RECORD',
  },
];

export const PaymentManagement = () => {
  const { user, activeRoleView } = useAuth();
  const isRegistrar = activeRoleView === 'REGISTRAR' || user?.role === 'REGISTRAR';
  const isStudent = activeRoleView === 'STUDENT' || user?.role === 'STUDENT';

  // For testing student views, allow selecting which student portal is being simulated if user is in Student mode
  const [activeStudentFilter, setActiveStudentFilter] = useState(() => {
    if (user && user.role === 'STUDENT') return user.name;
    return 'Ruwin';
  });

  // Filter tabs for Registrar compliance
  const [registrarTab, setRegistrarTab] = useState('ALL'); // 'ALL', 'PAID', 'UNPAID', 'OVERDUE'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isAddSportModalOpen, setIsAddSportModalOpen] = useState(false);
  const [isRecordCounterModalOpen, setIsRecordCounterModalOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState('');
  const [purgedNotice, setPurgedNotice] = useState('');

  // Payment Form State (For Student Checkout)
  const [paymentCategory, setPaymentCategory] = useState('SPORTS'); // 'TUITION' or 'SPORTS'
  const [selectedSportId, setSelectedSportId] = useState('sp-1');
  const [selectedPlan, setSelectedPlan] = useState('TERM'); // 'MONTHLY', 'TERM', 'ANNUAL'
  const [selectedTerm, setSelectedTerm] = useState('Term 1 (Spring 2026)');
  const [selectedMonth, setSelectedMonth] = useState('March 2026');
  const [studentCheckoutName, setStudentCheckoutName] = useState(activeStudentFilter);
  const [paymentMethod, setPaymentMethod] = useState('Credit / Debit Card');

  // Registrar Counter Payment Form State
  const [counterStudent, setCounterStudent] = useState('Amoda (Grade 10)');
  const [counterCategory, setCounterCategory] = useState('Tuition Fee');
  const [counterItemTitle, setCounterItemTitle] = useState('Term 2 Academic Tuition (Summer 2026)');
  const [counterAmount, setCounterAmount] = useState('95000');
  const [counterMethod, setCounterMethod] = useState('Direct Cash (Registrar Counter)');

  // Sports Payment Options
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
      enrolledCount: 22,
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
      enrolledCount: 16,
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
      enrolledCount: 14,
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
      enrolledCount: 19,
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
      enrolledCount: 12,
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
      enrolledCount: 18,
    },
  ]);

  // New Sport Modal Form State (Registrar exclusive)
  const [newSportName, setNewSportName] = useState('');
  const [newSportTermFee, setNewSportTermFee] = useState('');
  const [newSportMonthlyFee, setNewSportMonthlyFee] = useState('');
  const [newSportSquad, setNewSportSquad] = useState('');
  const [newSportCoach, setNewSportCoach] = useState('');

  // 1-YEAR DATABASE RETENTION & PERSISTENCE ENGINE
  // Stored in localStorage and automatically pruned for records older than 365 days
  const [paymentRecords, setPaymentRecords] = useState(() => {
    try {
      const stored = localStorage.getItem('sms_payment_records_v3');
      const baseList = stored ? JSON.parse(stored) : INITIAL_RECORDS;
      // Auto-purge any receipts older than 365 days (1 year)
      const validRecords = baseList.filter((item) => {
        if (!item.date) return true; // keep pending records that have no payment date yet
        return isWithinOneYear(item.date);
      });
      return validRecords;
    } catch {
      return INITIAL_RECORDS.filter((item) => !item.date || isWithinOneYear(item.date));
    }
  });

  // Run auto-purge check on mount and show confirmation
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sms_payment_records_v3');
      const listToCheck = stored ? JSON.parse(stored) : INITIAL_RECORDS;
      const initialCount = listToCheck.length;
      const pruned = listToCheck.filter((item) => !item.date || isWithinOneYear(item.date));
      const purgedCount = initialCount - pruned.length;

      localStorage.setItem('sms_payment_records_v3', JSON.stringify(pruned));
      setPaymentRecords(pruned);

      if (purgedCount > 0) {
        setPurgedNotice(
          `🛡️ Database 1-Year Retention Policy: ${purgedCount} archived receipt older than 365 days was automatically purged from database storage.`
        );
        setTimeout(() => setPurgedNotice(''), 7000);
      }
    } catch (e) {
      console.error('Error verifying 1-year retention:', e);
    }
  }, []);

  // Save changes to localStorage
  const persistRecords = (updatedList) => {
    // Keep only records within 1 year
    const validOnly = updatedList.filter((item) => !item.date || isWithinOneYear(item.date));
    setPaymentRecords(validOnly);
    localStorage.setItem('sms_payment_records_v3', JSON.stringify(validOnly));
  };

  // Student Checkout Process
  const handleProcessStudentPayment = (e) => {
    e.preventDefault();

    let amountStr = 'LKR 95,000';
    let amountNum = 95000;
    let planTitle = selectedTerm;
    let categoryName = 'Tuition Fee';

    if (paymentCategory === 'TUITION') {
      if (selectedPlan === 'MONTHLY') {
        amountStr = 'LKR 25,000';
        amountNum = 25000;
        planTitle = `Monthly Tuition (${selectedMonth})`;
      } else if (selectedPlan === 'ANNUAL') {
        amountStr = 'LKR 270,000';
        amountNum = 270000;
        planTitle = 'Full Academic Year Tuition 2026-2027';
      } else {
        amountStr = 'LKR 95,000';
        amountNum = 95000;
        planTitle = `Tuition: ${selectedTerm}`;
      }
    } else {
      categoryName = 'Sports Fee';
      const targetSport = sportsOptions.find((s) => s.id === selectedSportId) || sportsOptions[0];
      if (selectedPlan === 'MONTHLY') {
        amountStr = `LKR ${targetSport.feeMonthly.toLocaleString()}`;
        amountNum = targetSport.feeMonthly;
        planTitle = `${targetSport.sport} - Monthly (${selectedMonth})`;
      } else {
        amountStr = `LKR ${targetSport.feeTerm.toLocaleString()}`;
        amountNum = targetSport.feeTerm;
        planTitle = `${targetSport.sport} - ${selectedTerm}`;
      }
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const newReceiptCode = `REG-VERIFIED-${Math.floor(1000 + Math.random() * 9000)}-LK`;

    const newPayment = {
      id: 'inv-' + Math.floor(1000 + Math.random() * 9000),
      date: todayStr,
      dueDate: todayStr,
      category: categoryName,
      studentName: `${studentCheckoutName} (Student)`,
      studentId: studentCheckoutName.toLowerCase() === 'tharin' ? 'std-2' : studentCheckoutName.toLowerCase() === 'amoda' ? 'std-3' : 'std-1',
      payer: `${studentCheckoutName} (Student)`,
      itemTitle: planTitle,
      frequency: selectedPlan === 'MONTHLY' ? 'Monthly' : selectedPlan === 'TERM' ? 'Term-Wise' : 'Annual (10% Disc)',
      amount: amountStr,
      amountNum,
      method: paymentMethod,
      status: 'Cleared & Verified',
      complianceState: 'PAID',
      daysOverdue: 0,
      receiptCode: newReceiptCode,
    };

    const updated = [newPayment, ...paymentRecords];
    persistRecords(updated);
    setIsPayModalOpen(false);

    setSuccessAlert(`Payment of ${amountStr} for "${planTitle}" successfully processed! Official receipt stored in database.`);
    setTimeout(() => setSuccessAlert(''), 5000);
  };

  // Registrar Option: Record Counter Cash / Bank Slip Payment
  const handleRecordCounterPayment = (e) => {
    e.preventDefault();
    if (!isRegistrar) return;

    const amountNum = parseInt(counterAmount, 10) || 10000;
    const amountStr = `LKR ${amountNum.toLocaleString()}`;
    const todayStr = new Date().toISOString().split('T')[0];
    const newReceiptCode = `REG-CASH-${Math.floor(10000 + Math.random() * 90000)}-LK`;

    // Check if this clears an existing unpaid or overdue record for this student
    const studentCleanName = counterStudent.split(' ')[0];
    let matchedExisting = false;

    const updated = paymentRecords.map((item) => {
      if (
        !matchedExisting &&
        item.studentName.toLowerCase().includes(studentCleanName.toLowerCase()) &&
        item.complianceState !== 'PAID'
      ) {
        matchedExisting = true;
        return {
          ...item,
          date: todayStr,
          status: 'Cleared & Verified',
          complianceState: 'PAID',
          daysOverdue: 0,
          method: counterMethod,
          receiptCode: newReceiptCode,
        };
      }
      return item;
    });

    if (!matchedExisting) {
      const newPayment = {
        id: 'inv-' + Math.floor(1000 + Math.random() * 9000),
        date: todayStr,
        dueDate: todayStr,
        category: counterCategory,
        studentName: counterStudent,
        studentId: studentCleanName.toLowerCase() === 'amoda' ? 'std-3' : 'std-1',
        payer: `${counterStudent} via Registrar Counter`,
        itemTitle: counterItemTitle,
        frequency: 'Term-Wise',
        amount: amountStr,
        amountNum,
        method: counterMethod,
        status: 'Cleared & Verified',
        complianceState: 'PAID',
        daysOverdue: 0,
        receiptCode: newReceiptCode,
      };
      updated.unshift(newPayment);
    }

    persistRecords(updated);
    setIsRecordCounterModalOpen(false);
    setSuccessAlert(`Registrar verified and issued Official Clearance Receipt for ${counterStudent} (${amountStr}).`);
    setTimeout(() => setSuccessAlert(''), 5000);
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
      enrolledCount: 0,
    };

    setSportsOptions([...sportsOptions, newSport]);
    setNewSportName('');
    setNewSportTermFee('');
    setNewSportMonthlyFee('');
    setNewSportSquad('');
    setNewSportCoach('');
    setIsAddSportModalOpen(false);

    setSuccessAlert(`New sports payment option "${newSport.sport}" configured and activated by Registrar.`);
    setTimeout(() => setSuccessAlert(''), 4500);
  };

  // Registrar Option: Cycle / Override Status
  const handleCycleStatus = (invId) => {
    if (!isRegistrar) return;
    const updated = paymentRecords.map((p) => {
      if (p.id === invId) {
        if (p.complianceState === 'PAID') {
          return {
            ...p,
            status: 'Unpaid / Pending Review',
            complianceState: 'UNPAID',
            receiptCode: 'PENDING-REGISTRAR-CLEARANCE',
          };
        }
        if (p.complianceState === 'UNPAID') {
          return {
            ...p,
            status: '⚠️ Overdue (Action Required)',
            complianceState: 'OVERDUE',
            daysOverdue: 15,
            receiptCode: 'OVERDUE-PENALTY-ACCRUED',
          };
        }
        if (p.complianceState === 'OVERDUE') {
          return {
            ...p,
            status: 'Sports Scholarship / Exempt',
            complianceState: 'PAID',
            daysOverdue: 0,
            receiptCode: 'REG-SCHOLARSHIP-EXEMPT',
          };
        }
        return {
          ...p,
          date: new Date().toISOString().split('T')[0],
          status: 'Cleared & Verified',
          complianceState: 'PAID',
          daysOverdue: 0,
          receiptCode: `REG-VERIFIED-${Math.floor(1000 + Math.random() * 9000)}-LK`,
        };
      }
      return p;
    });
    persistRecords(updated);
  };

  // Registrar Option: Send Overdue Reminder
  const handleSendReminder = (item) => {
    if (!isRegistrar) return;
    setSuccessAlert(`Urgent Payment Reminder dispatched to ${item.studentName} for overdue amount of ${item.amount}.`);
    setTimeout(() => setSuccessAlert(''), 5000);
  };

  // Single Official Receipt Download (Handled by Registrar or Student for own record)
  const downloadSingleReceipt = (item) => {
    const text = `========================================================================================
                      COLOMBO ACADEMY & INTERNATIONAL SCHOOL
                 OFFICIAL PAYMENT CLEARANCE CERTIFICATE & RECEIPT
               Issued Exclusively by the Office of the School Registrar
========================================================================================
Receipt Invoice ID   : ${item.id}
Verification Token   : ${item.receiptCode}
Issuance Date        : ${item.date || 'Pending Final Payment'}
Payment Due Date     : ${item.dueDate}
Fee Classification   : ${item.category}
Student Name         : ${item.studentName}
Remitter / Payer     : ${item.payer}
Billing Schedule     : ${item.frequency}
Package / Term       : ${item.itemTitle}
Total Amount Paid    : ${item.amount} (Sri Lankan Rupees)
Payment Gateway      : ${item.method}
Clearance Status     : ${item.status}
Statutory Retention  : Retained for 365 Days (1 Year) from Issuance Date

REGISTRAR OFFICE AUDIT & CERTIFICATION:
This document serves as an authentic institutional tax invoice and fee clearance receipt.
The fee specified above has been verified and accounted for in the school central treasury.

Registrar Authorization Code : REG-OFFICE-CERT-${item.id.replace('inv-', '')}-SRILANKA
Registrar Seal & Stamp       : [ SEALED & SIGNED BY REGISTRAR OFFICE ]
Timestamp of Download        : ${new Date().toLocaleString()}
========================================================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Official_Receipt_${item.id}_${item.studentName.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
  };

  // Student 1-Year Comprehensive Receipts Bundle Download
  const downloadStudentAnnualReceiptsBundle = () => {
    const studentOnly = paymentRecords.filter(
      (p) =>
        p.studentName.toLowerCase().includes(activeStudentFilter.toLowerCase()) &&
        p.complianceState === 'PAID' &&
        isWithinOneYear(p.date)
    );

    if (studentOnly.length === 0) {
      alert(`No verified cleared receipts found for ${activeStudentFilter} in the past 1 year.`);
      return;
    }

    const totalPaidNum = studentOnly.reduce((sum, item) => sum + (item.amountNum || 0), 0);
    const totalPaidLKR = `LKR ${totalPaidNum.toLocaleString()}`;

    const receiptRows = studentOnly
      .map(
        (r, idx) =>
          `[${idx + 1}] Invoice ID: ${r.id} | Date: ${r.date}
    Category : ${r.category}
    Package  : ${r.itemTitle} (${r.frequency})
    Amount   : ${r.amount} | Method: ${r.method}
    Token    : ${r.receiptCode}
----------------------------------------------------------------------------------------`
      )
      .join('\n');

    const bundleText = `========================================================================================
                      COLOMBO ACADEMY & INTERNATIONAL SCHOOL
             OFFICIAL 1-YEAR CONSOLIDATED PAYMENT RECEIPTS STATEMENT
         Authorized & Certified by the Directorate of the Registrar Office
========================================================================================
Student Name         : ${activeStudentFilter}
Academic Year        : 2025 - 2026 Academic & Sports Session
Retention Window     : Past 365 Days (1 Year Period)
Total Cleared Receipts: ${studentOnly.length} Official Verified Payments
Cumulative Amount Paid: ${totalPaidLKR} (Sri Lankan Rupees)
Date of Generation   : ${new Date().toLocaleDateString()} (${new Date().toLocaleTimeString()})

----------------------------------------------------------------------------------------
ITEMIZED ANNUAL PAYMENT RECORDS BREAKDOWN (PAST 365 DAYS):
----------------------------------------------------------------------------------------
${receiptRows}

INSTITUTIONAL REGISTRAR ATTESTATION:
This official certificate confirms that the student named above has made all documented payments
within the statutory 365-day retention period. All fee clearances have been duly verified in the
school central ledger. Receipts older than 365 days are automatically purged from active records.

Registrar Signatory  : Directorate of Student Records & Finance
Certification Stamp  : [ CERTIFIED OFFICIAL ANNUAL STATEMENT - REGISTRAR OFFICE ]
Verification Checksum: REG-ANNUAL-BUNDLE-${activeStudentFilter.toUpperCase()}-365D
========================================================================================`;

    const blob = new Blob([bundleText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Annual_Receipts_Bundle_${activeStudentFilter}_Past_1_Year.txt`;
    a.click();
  };

  // Registrar Compliance Metrics
  const totalPaidCount = paymentRecords.filter((p) => p.complianceState === 'PAID').length;
  const totalUnpaidCount = paymentRecords.filter((p) => p.complianceState === 'UNPAID').length;
  const totalOverdueCount = paymentRecords.filter((p) => p.complianceState === 'OVERDUE').length;

  const totalPaidSum = paymentRecords
    .filter((p) => p.complianceState === 'PAID')
    .reduce((sum, p) => sum + (p.amountNum || 0), 0);

  const totalOverdueSum = paymentRecords
    .filter((p) => p.complianceState === 'OVERDUE')
    .reduce((sum, p) => sum + (p.amountNum || 0), 0);

  // Student specific records (Strictly filtered so each student only sees their own)
  const studentPersonalRecords = paymentRecords.filter((p) =>
    p.studentName.toLowerCase().includes(activeStudentFilter.toLowerCase())
  );

  const studentPaidReceipts = studentPersonalRecords.filter(
    (p) => p.complianceState === 'PAID' && isWithinOneYear(p.date)
  );

  const studentTotalPaidSum = studentPaidReceipts.reduce(
    (sum, p) => sum + (p.amountNum || 0),
    0
  );

  // Filtered records for Registrar table
  const filteredRegistrarRecords = paymentRecords.filter((item) => {
    if (registrarTab === 'PAID' && item.complianceState !== 'PAID') return false;
    if (registrarTab === 'UNPAID' && item.complianceState !== 'UNPAID') return false;
    if (registrarTab === 'OVERDUE' && item.complianceState !== 'OVERDUE') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.studentName.toLowerCase().includes(q);
      const matchItem = item.itemTitle.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchId = item.id.toLowerCase().includes(q);
      return matchName || matchItem || matchCat || matchId;
    }
    return true;
  });

  return (
    <div className="content-body">
      {/* Top Title & Header Action Bar */}
      <div className="page-title-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.65rem',
                background: isRegistrar
                  ? 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)'
                  : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {isRegistrar ? <ShieldCheck size={14} /> : <CreditCard size={14} />}
              <span>{isRegistrar ? 'Registrar Financial Authority' : 'Student Payment Center'}</span>
            </span>
            <span className="stat-badge green">LKR Currency</span>
            <span className="stat-badge blue" style={{ background: '#e0e7ff', color: '#4338ca' }}>
              365-Day Retention
            </span>
          </div>
          <h1 className="page-h1">Fee & Sports Payment Management</h1>
          <p className="page-sub">
            {isRegistrar
              ? 'Registrar Office Master Ledger: Track who did payments, who did not, overdue balances, manage sports options, and certify official receipts.'
              : 'Pay for Academic Tuition and Sports Academy subscriptions in Sri Lankan Rupees & access your 1-year verified payment receipts.'}
          </p>
        </div>

        {/* Action Buttons: Strictly Role Differentiated */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {isRegistrar ? (
            <>
              {/* Registrar Actions: NO "Pay for sport" button here! */}
              <button
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid #4338ca',
                  color: '#4338ca',
                  fontWeight: 700,
                }}
                onClick={() => setIsRecordCounterModalOpen(true)}
              >
                <Banknote size={16} />
                <span>Record Counter Payment</span>
              </button>

              <button
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)',
                }}
                onClick={() => setIsAddSportModalOpen(true)}
              >
                <Plus size={16} />
                <span>Add Sport Option</span>
              </button>
            </>
          ) : (
            /* Student Actions: Pay Buttons are KEPT ONLY FOR STUDENTS */
            <>
              <button
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
                onClick={downloadStudentAnnualReceiptsBundle}
              >
                <FileText size={16} color="#059669" />
                <span>Get 1-Year Receipts Bundle</span>
              </button>

              <button
                className="btn-force-sync"
                style={{ background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)' }}
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
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
                onClick={() => {
                  setPaymentCategory('TUITION');
                  setIsPayModalOpen(true);
                }}
              >
                <CreditCard size={16} />
                <span>Pay Tuition Fee</span>
              </button>
            </>
          )}
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
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{successAlert}</span>
        </div>
      )}

      {/* Purged Notification Alert */}
      {purgedNotice && (
        <div
          style={{
            padding: '0.85rem 1rem',
            background: '#eff6ff',
            color: '#1e40af',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Archive size={18} />
          <span>{purgedNotice}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: REGISTRAR OFFICE CONSOLE & COMPLIANCE METRICS (IF REGISTRAR)   */}
      {/* ========================================================================= */}
      {isRegistrar && (
        <>
          {/* Registrar Banner */}
          <div
            style={{
              padding: '1.25rem',
              background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
              border: '1px solid #c7d2fe',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  background: '#4338ca',
                  color: 'white',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#312e81', marginBottom: '0.2rem' }}>
                  Registrar Office Master Payment & Compliance Dashboard
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#4338ca' }}>
                  Exclusive Authority: Only the Registrar Office can inspect payment history of every student, audit
                  unpaid/overdue balances, toggle sport fees, and issue authenticated clearance receipts.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  background: '#312e81',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                🔒 Full Institutional Access
              </span>
            </div>
          </div>

          {/* Compliance Metric Cards (Paid vs Unpaid vs Overdue) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '1.75rem',
            }}
          >
            {/* Card 1: Who did the payments */}
            <div
              className="stat-card"
              style={{
                borderLeft: '4px solid #10b981',
                cursor: 'pointer',
                background: registrarTab === 'PAID' ? 'var(--border-muted)' : 'var(--bg-card)',
              }}
              onClick={() => setRegistrarTab('PAID')}
            >
              <div className="stat-header">
                <span className="stat-title">PAID & CLEARED</span>
                <UserCheck className="stat-icon" color="#10b981" />
              </div>
              <div className="stat-num" style={{ fontSize: '1.6rem', color: '#059669' }}>
                {totalPaidCount} Students
              </div>
              <div className="stat-subtext">Total: LKR {totalPaidSum.toLocaleString()} collected</div>
            </div>

            {/* Card 2: Who did not do payments */}
            <div
              className="stat-card"
              style={{
                borderLeft: '4px solid #f59e0b',
                cursor: 'pointer',
                background: registrarTab === 'UNPAID' ? 'var(--border-muted)' : 'var(--bg-card)',
              }}
              onClick={() => setRegistrarTab('UNPAID')}
            >
              <div className="stat-header">
                <span className="stat-title">UNPAID / PENDING</span>
                <Clock className="stat-icon" color="#f59e0b" />
              </div>
              <div className="stat-num" style={{ fontSize: '1.6rem', color: '#d97706' }}>
                {totalUnpaidCount} Invoices
              </div>
              <div className="stat-subtext">Awaiting student remittance</div>
            </div>

            {/* Card 3: Whose payments are overdue */}
            <div
              className="stat-card"
              style={{
                borderLeft: '4px solid #ef4444',
                cursor: 'pointer',
                background: registrarTab === 'OVERDUE' ? 'var(--border-muted)' : 'var(--bg-card)',
              }}
              onClick={() => setRegistrarTab('OVERDUE')}
            >
              <div className="stat-header">
                <span className="stat-title">OVERDUE PAYMENTS</span>
                <AlertTriangle className="stat-icon" color="#ef4444" />
              </div>
              <div className="stat-num" style={{ fontSize: '1.6rem', color: '#dc2626' }}>
                {totalOverdueCount} Overdue
              </div>
              <div className="stat-subtext" style={{ color: '#b91c1c', fontWeight: 600 }}>
                LKR {totalOverdueSum.toLocaleString()} past deadline
              </div>
            </div>

            {/* Card 4: Active Sports Programs */}
            <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
              <div className="stat-header">
                <span className="stat-title">SPORTS PROGRAMS</span>
                <Trophy className="stat-icon" color="#8b5cf6" />
              </div>
              <div className="stat-num" style={{ fontSize: '1.6rem', color: '#7c3aed' }}>
                {sportsOptions.filter((s) => s.active).length} Active
              </div>
              <div className="stat-subtext">Controlled by Registrar Office</div>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: STUDENT PORTAL VIEW (IF LOGGED IN AS STUDENT)                  */}
      {/* ========================================================================= */}
      {isStudent && (
        <div
          style={{
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            border: '1px solid #a7f3d0',
            borderRadius: '12px',
            marginBottom: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#065f46', marginBottom: '0.15rem' }}>
                  Student Personal Account: {activeStudentFilter}
                </h3>
                <p style={{ fontSize: '0.825rem', color: '#047857' }}>
                  You have access strictly to your own payment history and official clearance receipts. Receipts older
                  than 1 year are automatically purged.
                </p>
              </div>
            </div>

            {/* If simulating students, switcher dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#065f46' }}>Simulate Student:</span>
              <select
                className="form-input"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', width: 'auto', background: 'white' }}
                value={activeStudentFilter}
                onChange={(e) => {
                  setActiveStudentFilter(e.target.value);
                  setStudentCheckoutName(e.target.value);
                }}
              >
                <option value="Ruwin">Ruwin (Grade 10)</option>
                <option value="Tharin">Tharin (Grade 11)</option>
                <option value="Amoda">Amoda (Grade 10)</option>
                <option value="Hasini">Hasini (Grade 12)</option>
              </select>

              <button
                className="btn-primary"
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  background: '#047857',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
                onClick={downloadStudentAnnualReceiptsBundle}
              >
                <Download size={14} />
                <span>Download All My Receipts (1 Year Bundle)</span>
              </button>
            </div>
          </div>

          {/* Student quick metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginTop: '1.25rem',
            }}
          >
            <div style={{ background: 'white', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
                Total Paid (Past 1 Year)
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#065f46' }}>
                LKR {studentTotalPaidSum.toLocaleString()}
              </div>
            </div>

            <div style={{ background: 'white', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
                Verified Official Receipts
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#065f46' }}>
                {studentPaidReceipts.length} Receipts
              </div>
            </div>

            <div style={{ background: 'white', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
                Database Retention Window
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#047857' }}>
                365 Days Active
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: OTHER ROLES WARNING (TEACHER / PRINCIPAL / OWNER)              */}
      {/* ========================================================================= */}
      {!isRegistrar && !isStudent && (
        <div
          style={{
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lock size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.2rem' }}>
              Student Payment History Restricted
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#b91c1c' }}>
              In accordance with institutional financial privacy policies, the master payment records of every student
              are visible exclusively to the Registrar Office. Individual students have access only to their own receipts.
              Please switch to the <strong>Registrar Office</strong> role in the navigation sidebar to review schoolwide ledgers.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: SPORTS & ATHLETICS PAYMENT OPTIONS                             */}
      {/* ========================================================================= */}
      <div className="activity-card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-header-action">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Trophy size={18} color="#eab308" />
            <h2 className="card-title-h2">Sports & Athletics Programs (LKR)</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="stat-badge blue" style={{ background: '#ede9fe', color: '#6d28d9' }}>
              Registrar Controlled Pricing
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
            padding: '1.25rem',
          }}
        >
          {sportsOptions.map((sp) => (
            <div
              key={sp.id}
              style={{
                border: sp.active ? '1px solid var(--border-light)' : '1px dashed #cbd5e1',
                borderRadius: '10px',
                padding: '1.1rem',
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
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: sp.active ? '#dcfce7' : '#fee2e2',
                        color: sp.active ? '#15803d' : '#b91c1c',
                      }}
                      title="Registrar Authority: Toggle Sport Activation"
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
                      {sp.active ? 'Available for Enrollment' : 'Closed by Registrar'}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {sp.sport}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  Squad: <strong>{sp.squad}</strong> • Coach: {sp.coach}
                </div>

                <div
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: 'var(--border-muted)',
                    borderRadius: '8px',
                    marginBottom: '0.85rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                    }}
                  >
                    <span>Term-Wise Fee:</span>
                    <span style={{ color: '#4f46e5' }}>LKR {sp.feeTerm.toLocaleString()}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                    }}
                  >
                    <span>Monthly Subscription:</span>
                    <span>LKR {sp.feeMonthly.toLocaleString()} / mo</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON: STRICTLY REMOVED FOR REGISTRAR; KEPT ONLY FOR STUDENTS */}
              {isRegistrar ? (
                <div
                  style={{
                    padding: '0.45rem',
                    borderRadius: '6px',
                    background: 'var(--border-muted)',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    border: '1px solid var(--border-light)',
                  }}
                >
                  ⚙️ Registrar Authority: Fee & Squad Managed
                </div>
              ) : isStudent ? (
                sp.active ? (
                  <button
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
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
                )
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5: PAYMENT HISTORY & COMPLIANCE LEDGER                            */}
      {/* VISIBILITY:                                                               */}
      {/* - REGISTRAR: Sees Every Student (Paid, Unpaid, Overdue) + Handles Receipts*/}
      {/* - STUDENT: Sees ONLY their Own Records + 1-Year Retention                   */}
      {/* ========================================================================= */}
      {isRegistrar && (
        <div className="activity-card">
          <div className="card-header-action" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Clock size={18} color="#4338ca" />
              <h2 className="card-title-h2">Registrar Master Student Payment & Clearance Ledger</h2>
            </div>

            {/* Compliance Filter Tabs (Paid vs Unpaid vs Overdue) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className={`calendar-filter-btn ${registrarTab === 'ALL' ? 'active' : ''}`}
                onClick={() => setRegistrarTab('ALL')}
              >
                All Records ({paymentRecords.length})
              </button>
              <button
                className={`calendar-filter-btn ${registrarTab === 'PAID' ? 'active' : ''}`}
                onClick={() => setRegistrarTab('PAID')}
                style={{ color: registrarTab === 'PAID' ? 'white' : '#059669' }}
              >
                🟢 Paid ({totalPaidCount})
              </button>
              <button
                className={`calendar-filter-btn ${registrarTab === 'UNPAID' ? 'active' : ''}`}
                onClick={() => setRegistrarTab('UNPAID')}
                style={{ color: registrarTab === 'UNPAID' ? 'white' : '#d97706' }}
              >
                🟡 Unpaid ({totalUnpaidCount})
              </button>
              <button
                className={`calendar-filter-btn ${registrarTab === 'OVERDUE' ? 'active' : ''}`}
                onClick={() => setRegistrarTab('OVERDUE')}
                style={{ color: registrarTab === 'OVERDUE' ? 'white' : '#dc2626' }}
              >
                🔴 Overdue ({totalOverdueCount})
              </button>
            </div>
          </div>

          {/* Search bar inside registrar ledger */}
          <div style={{ padding: '0.75rem 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '32px', height: '34px', fontSize: '0.8rem' }}
                placeholder="Search student name, item, or invoice #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Showing {filteredRegistrarRecords.length} records • Auto-purged if &gt; 365 days
            </div>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>INVOICE / REF #</th>
                  <th>STUDENT NAME</th>
                  <th>CATEGORY</th>
                  <th>PACKAGE / COVERED TERM</th>
                  <th>AMOUNT (LKR)</th>
                  <th>DUE DATE / PAID DATE</th>
                  <th>COMPLIANCE STATUS</th>
                  <th>REGISTRAR ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrarRecords.map((item) => (
                  <tr key={item.id}>
                    <td className="timestamp-col">
                      <strong style={{ color: '#4338ca' }}>{item.id}</strong>
                    </td>
                    <td>
                      <div className="user-name-bold">{item.studentName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Payer: {item.payer}
                      </div>
                    </td>
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
                      <strong>{item.itemTitle}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Plan: {item.frequency}
                      </div>
                    </td>
                    <td className="user-name-bold" style={{ color: 'var(--text-main)' }}>
                      {item.amount}
                    </td>
                    <td>
                      {item.complianceState === 'PAID' ? (
                        <div>
                          <span style={{ color: '#059669', fontWeight: 600 }}>Paid: {item.date}</span>
                        </div>
                      ) : (
                        <div>
                          <span style={{ color: item.complianceState === 'OVERDUE' ? '#dc2626' : '#d97706', fontWeight: 600 }}>
                            Due: {item.dueDate}
                          </span>
                          {item.daysOverdue > 0 && (
                            <div style={{ fontSize: '0.7rem', color: '#b91c1c', fontWeight: 700 }}>
                              ⚠️ {item.daysOverdue} Days Overdue
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td>
                      {/* Clickable Cycle Status for Registrar Authority */}
                      <button
                        onClick={() => handleCycleStatus(item.id)}
                        className={`stat-badge ${
                          item.complianceState === 'PAID'
                            ? 'green'
                            : item.complianceState === 'OVERDUE'
                            ? 'red'
                            : 'blue'
                        }`}
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background:
                            item.complianceState === 'PAID'
                              ? '#dcfce7'
                              : item.complianceState === 'OVERDUE'
                              ? '#fee2e2'
                              : '#fef3c7',
                          color:
                            item.complianceState === 'PAID'
                              ? '#15803d'
                              : item.complianceState === 'OVERDUE'
                              ? '#b91c1c'
                              : '#b45309',
                        }}
                        title="Click to cycle status: Paid -> Unpaid -> Overdue -> Cleared"
                      >
                        {item.complianceState === 'PAID' ? (
                          <CheckCircle2 size={12} />
                        ) : item.complianceState === 'OVERDUE' ? (
                          <AlertTriangle size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        <span>{item.status}</span>
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {/* Only Registrar handles receipts for every student */}
                        {item.complianceState === 'PAID' ? (
                          <button
                            className="btn-secondary"
                            style={{
                              padding: '0.25rem 0.65rem',
                              fontSize: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              color: '#4338ca',
                              borderColor: '#c7d2fe',
                            }}
                            onClick={() => downloadSingleReceipt(item)}
                            title="Registrar: Issue / Download Official Sealed Receipt"
                          >
                            <Download size={12} />
                            <span>Receipt</span>
                          </button>
                        ) : (
                          <button
                            className="btn-secondary"
                            style={{
                              padding: '0.25rem 0.65rem',
                              fontSize: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              color: item.complianceState === 'OVERDUE' ? '#b91c1c' : '#b45309',
                              borderColor: item.complianceState === 'OVERDUE' ? '#fca5a5' : '#fde68a',
                            }}
                            onClick={() => handleSendReminder(item)}
                            title="Send payment reminder notification to student"
                          >
                            <BellRing size={12} />
                            <span>Remind</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STUDENT PERSONAL HISTORY LEDGER: Each student ONLY sees their own records */}
      {isStudent && (
        <div className="activity-card">
          <div className="card-header-action" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <FileText size={18} color="#059669" />
              <h2 className="card-title-h2">
                My Payment Records & Verified Receipts ({activeStudentFilter})
              </h2>
            </div>

            <button
              className="btn-primary"
              style={{
                background: '#059669',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
              onClick={downloadStudentAnnualReceiptsBundle}
            >
              <Download size={14} />
              <span>Get All My Receipts (Past 1 Year)</span>
            </button>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>RECEIPT / INVOICE #</th>
                  <th>PAYMENT DATE</th>
                  <th>CATEGORY</th>
                  <th>ITEM / COVERED PERIOD</th>
                  <th>FREQUENCY</th>
                  <th>AMOUNT PAID</th>
                  <th>STATUS</th>
                  <th>OFFICIAL RECEIPT</th>
                </tr>
              </thead>
              <tbody>
                {studentPersonalRecords.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No payment records found for {activeStudentFilter}. Use the payment options above to enroll in sports or pay tuition.
                    </td>
                  </tr>
                ) : (
                  studentPersonalRecords.map((item) => (
                    <tr key={item.id}>
                      <td className="timestamp-col">
                        <strong style={{ color: '#059669' }}>{item.id}</strong>
                      </td>
                      <td>{item.date || 'Pending Payment'}</td>
                      <td>
                        <span
                          style={{
                            padding: '0.2rem 0.55rem',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            background: item.category === 'Sports Fee' ? '#fef3c7' : '#ecfdf5',
                            color: item.category === 'Sports Fee' ? '#b45309' : '#047857',
                          }}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td>
                        <strong>{item.itemTitle}</strong>
                      </td>
                      <td>
                        <span className="role-pill STUDENT">{item.frequency}</span>
                      </td>
                      <td className="user-name-bold">{item.amount}</td>
                      <td>
                        <span
                          className={`stat-badge ${
                            item.complianceState === 'PAID'
                              ? 'green'
                              : item.complianceState === 'OVERDUE'
                              ? 'red'
                              : 'blue'
                          }`}
                        >
                          {item.complianceState === 'PAID' ? (
                            <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '3px' }} />
                          ) : (
                            <Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.complianceState === 'PAID' ? (
                          <button
                            className="btn-secondary"
                            style={{
                              padding: '0.25rem 0.65rem',
                              fontSize: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                            }}
                            onClick={() => downloadSingleReceipt(item)}
                          >
                            <Download size={12} />
                            <span>Download</span>
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Awaiting Clearance</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: STUDENT PAYMENT CHECKOUT (KEPT EXCLUSIVELY FOR STUDENTS)         */}
      {/* ========================================================================= */}
      {isPayModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsPayModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="#059669" />
                <h3 className="modal-title">Student Fee & Sports Checkout (LKR)</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsPayModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProcessStudentPayment}>
              {/* Category Choice */}
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
                  value={studentCheckoutName}
                  onChange={(e) => setStudentCheckoutName(e.target.value)}
                  placeholder="e.g. Ruwin or Tharin"
                  required
                />
              </div>

              {/* Specific Sport selection */}
              {paymentCategory === 'SPORTS' && (
                <div className="form-group">
                  <label className="form-label">Select Active Sport Option</label>
                  <select
                    className="form-input"
                    value={selectedSportId}
                    onChange={(e) => setSelectedSportId(e.target.value)}
                  >
                    {sportsOptions
                      .filter((s) => s.active)
                      .map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {sp.sport} (Term: LKR {sp.feeTerm.toLocaleString()} | Monthly: LKR {sp.feeMonthly.toLocaleString()})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Frequency */}
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
                  <label className="form-label">Select Academic / Sports Term</label>
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
                </select>
              </div>

              {/* Total Due Banner */}
              <div
                style={{
                  padding: '0.85rem 1rem',
                  background: 'var(--border-muted)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                  }}
                >
                  <span>Total Amount Due (LKR):</span>
                  <span style={{ color: '#059669' }}>
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

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', background: '#059669' }}
              >
                Confirm & Pay Now (LKR)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REGISTRAR RECORD COUNTER PAYMENT / CASH SLIP                     */}
      {/* ========================================================================= */}
      {isRecordCounterModalOpen && isRegistrar && (
        <div className="modal-backdrop" onClick={() => setIsRecordCounterModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Banknote size={20} color="#4338ca" />
                <h3 className="modal-title">Registrar: Record Offline Payment Slip</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsRecordCounterModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRecordCounterPayment}>
              <div className="form-group">
                <label className="form-label">Student Name & Grade</label>
                <select
                  className="form-input"
                  value={counterStudent}
                  onChange={(e) => setCounterStudent(e.target.value)}
                >
                  <option value="Amoda (Grade 10)">Amoda (Grade 10) - Has Overdue/Unpaid</option>
                  <option value="Dinuka (Grade 11)">Dinuka (Grade 11) - Has Overdue</option>
                  <option value="Kaveen (Grade 9)">Kaveen (Grade 9) - Has Unpaid</option>
                  <option value="Ruwin (Grade 10)">Ruwin (Grade 10)</option>
                  <option value="Tharin (Grade 11)">Tharin (Grade 11)</option>
                  <option value="Hasini (Grade 12)">Hasini (Grade 12)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Fee Classification</label>
                <select
                  className="form-input"
                  value={counterCategory}
                  onChange={(e) => setCounterCategory(e.target.value)}
                >
                  <option value="Tuition Fee">Academic Tuition Fee</option>
                  <option value="Sports Fee">Sports & Athletics Fee</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Fee Item / Package Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={counterItemTitle}
                  onChange={(e) => setCounterItemTitle(e.target.value)}
                  placeholder="e.g. Term 2 Academic Tuition or Cricket Kit"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Amount Cleared (LKR)</label>
                <input
                  type="number"
                  className="form-input"
                  value={counterAmount}
                  onChange={(e) => setCounterAmount(e.target.value)}
                  placeholder="e.g. 95000"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Verification Payment Method</label>
                <select
                  className="form-input"
                  value={counterMethod}
                  onChange={(e) => setCounterMethod(e.target.value)}
                >
                  <option value="Direct Cash (Registrar Counter)">Direct Cash (Registrar Counter)</option>
                  <option value="Bank Deposit Slip Verified">Bank Deposit Slip Verified</option>
                  <option value="Cheque / Draft Clearance">Cheque / Draft Clearance</option>
                  <option value="Online Banking Direct">Online Banking Direct</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', background: '#4338ca' }}
              >
                Certify & Issue Verified Receipt
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: REGISTRAR ADD NEW SPORT PAYMENT OPTION                           */}
      {/* ========================================================================= */}
      {isAddSportModalOpen && isRegistrar && (
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
