'use client';
import { sendInvoice } from '@/lib/mock/invoices';
export default function RemindersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const handleRemind = async () => { await sendInvoice(id); alert('Zahlungserinnerung gesendet'); };
  return (<div className="glass-card p-6 text-center"><button onClick={handleRemind} className="px-4 py-2 bg-yellow-600 rounded">Erinnerung senden</button></div>);
}