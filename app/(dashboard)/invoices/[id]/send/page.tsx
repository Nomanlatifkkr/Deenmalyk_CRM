'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendInvoice } from '@/lib/mock/invoices';
export default function SendPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const handleSend = async () => { await sendInvoice(id); alert(`Rechnung an ${email} gesendet`); router.push(`/invoices/${id}`); };
  return (<div className="glass-card p-6"><h2>Rechnung senden</h2><input type="email" placeholder="empfänger@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 bg-white/5 border rounded my-2" /><button onClick={handleSend} className="px-4 py-2 bg-blue-600 rounded">Senden</button></div>);
}