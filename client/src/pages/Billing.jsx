import React from 'react';
import { CreditCard, CheckCircle2, DollarSign, Download } from 'lucide-react';

export const Billing = () => {
  const transactions = [
    { id: '#8822', parent: 'Sarah W. (Leo T.)', term: 'Spring Q1 2026 Tuition', amount: '$2,450.00', method: 'Credit Card (•••• 4921)', status: 'Cleared', date: '2026-03-12 13:45:12' },
    { id: '#8821', parent: 'David R. (Emily R.)', term: 'Spring Q1 2026 Tuition', amount: '$2,450.00', method: 'Bank Transfer', status: 'Cleared', date: '2026-03-11 09:12:00' },
    { id: '#8820', parent: 'Jessica K. (Michael K.)', term: 'Spring Q1 2026 Tuition', amount: '$2,450.00', method: 'Pending Invoice', status: 'Pending', date: '2026-03-10 16:30:00' },
  ];

  return (
    <div className="content-body">
      <div className="page-title-row">
        <div>
          <h1 className="page-h1">Tuition Fees & Financial Billing</h1>
          <p className="page-sub">Track tuition billing invoices, payment gateways, and receipt generation.</p>
        </div>
      </div>

      <div className="activity-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>TRANSACTION ID</th>
                <th>PARENT & STUDENT</th>
                <th>BILLING TERM</th>
                <th>AMOUNT</th>
                <th>PAYMENT METHOD</th>
                <th>STATUS</th>
                <th>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="timestamp-col">
                    <strong style={{ color: '#4f46e5' }}>{tx.id}</strong>
                  </td>
                  <td className="user-name-bold">{tx.parent}</td>
                  <td>{tx.term}</td>
                  <td className="user-name-bold" style={{ color: '#0f172a' }}>{tx.amount}</td>
                  <td>{tx.method}</td>
                  <td>
                    <span className={`stat-badge ${tx.status === 'Cleared' ? 'green' : 'blue'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="timestamp-col">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
