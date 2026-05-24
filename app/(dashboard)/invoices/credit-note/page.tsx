'use client';
import { useState } from 'react';
import { createInvoice } from '@/lib/mock/invoices';
import { useRouter } from 'next/navigation';
export default function CreditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const handleCreate = async () => {
    await createInvoice({ /* data from original invoice with negative amounts */ } as any);
    alert('Gutschrift erstellt');
    router.push('/invoices');
  };
  return (<div className="glass-card p-6"><h2>Gutschrift erstellen</h2><input type="number" placeholder="Betrag" value={amount} onChange={e => setAmount(parseFloat(e.target.value)||0)} /><button onClick={handleCreate}>Erstellen</button></div>);
}