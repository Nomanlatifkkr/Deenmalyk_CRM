'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { fetchInvoices, updateInvoice } from '@/lib/mock/invoices';
export default function ApprovalPage() {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => { fetchInvoices().then(setInvoices); }, []);
  const pending = invoices.filter(i => i.status === 'pending_approval');
  const approve = async (id: string) => { await updateInvoice(id, { status: 'approved' }); fetchInvoices().then(setInvoices); };
  const reject = async (id: string) => { await updateInvoice(id, { status: 'draft' }); fetchInvoices().then(setInvoices); };
  return (
    <div className="space-y-6"><h1 className="text-2xl font-bold text-white">Genehmigung ausstehend</h1><div className="space-y-3">{pending.map(i => <div key={i.id} className="glass-card p-4 flex justify-between items-center"><div><p className="text-white font-semibold">{i.invoiceNumber}</p><p className="text-sm text-gray-400">{i.customerName} – €{i.total}</p></div><div className="flex gap-2"><button onClick={() => approve(i.id)} className="p-2 bg-green-600 rounded"><Check className="h-4 w-4" /></button><button onClick={() => reject(i.id)} className="p-2 bg-red-600 rounded"><X className="h-4 w-4" /></button></div></div>)}</div></div>
  );
}