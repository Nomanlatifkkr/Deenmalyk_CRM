'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchInvoices } from '@/lib/mock/invoices';
export default function OverduePage() {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => { fetchInvoices().then(setInvoices); }, []);
  const overdue = invoices.filter(i => i.status === 'overdue' || (i.status === 'sent' && new Date(i.dueDate) < new Date()));
  return (<div className="space-y-6"><h1>Überfällige Rechnungen</h1>{overdue.map(i => <div key={i.id} className="glass-card p-4"><Link href={`/invoices/${i.id}`}><p>{i.invoiceNumber} – {i.customerName}</p><p>€{i.total}</p><p className="text-red-400">Fällig: {new Date(i.dueDate).toLocaleDateString()}</p></Link></div>)}</div>);
}