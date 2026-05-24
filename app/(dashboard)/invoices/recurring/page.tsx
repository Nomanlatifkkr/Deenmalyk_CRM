'use client';
import { useState, useEffect } from 'react';
import { fetchInvoices } from '@/lib/mock/invoices';
export default function RecurringPage() {
  // Mock recurring invoices – in real app, would have separate model
  const [recurring] = useState([{ id: 'rec1', customer: 'ABC Construction GmbH', interval: 'Monatlich', nextDate: '2024-06-01' }]);
  return (<div className="space-y-6"><h1>Wiederkehrende Rechnungen</h1>{recurring.map(r => <div key={r.id} className="glass-card p-4"><p>{r.customer} – {r.interval}</p><p>Nächste: {r.nextDate}</p></div>)}</div>);
}