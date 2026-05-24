'use client';
import { useState, useEffect } from 'react';
import { addPayment, fetchInvoice } from '@/lib/mock/invoices';
export default function PaymentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [invoice, setInvoice] = useState<any>(null);
  const [amount, setAmount] = useState(0);
  useEffect(() => { fetchInvoice(id).then(setInvoice); }, [id]);
  const handleAdd = async () => {
    await addPayment(id, { date: new Date().toISOString().split('T')[0], amount, method: 'bank_transfer', reference: 'Demo' });
    const updated = await fetchInvoice(id);
    setInvoice(updated);
    alert('Zahlung hinzugefügt');
  };
  if (!invoice) return null;
  return (<div className="glass-card p-6"><h2>Zahlungen</h2><div className="space-y-2">{invoice.payments.map((p: any) => <div key={p.id}>{p.date} – €{p.amount}</div>)}</div><div className="mt-4"><input type="number" placeholder="Betrag" value={amount} onChange={e => setAmount(parseFloat(e.target.value)||0)} className="w-full p-2 bg-white/5 border rounded" /><button onClick={handleAdd} className="mt-2 px-4 py-2 bg-blue-600 rounded">Zahlung erfassen</button></div></div>);
}