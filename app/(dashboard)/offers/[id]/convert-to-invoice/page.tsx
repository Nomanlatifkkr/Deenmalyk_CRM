'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Receipt } from 'lucide-react';
import { fetchOffer, updateOffer } from '@/lib/mock/offers';
import { createInvoice } from '@/lib/mock/invoices'; // dummy function, adapt later

export default function ConvertToInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);
  useEffect(() => { fetchOffer(id).then(setOffer); }, [id]);
  const handleConvert = async () => {
    if (!offer) return;
    // Dummy: create invoice
    await new Promise(r => setTimeout(r, 500));
    console.log('Invoice created from offer', offer);
    await updateOffer(id, { status: 'converted' });
    router.push('/invoices'); // redirect to invoices list
  };
  if (!offer) return <div>Laden...</div>;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/offers/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">In Rechnung umwandeln</h1></div></div>
      <div className="glass-card p-6 text-center"><button onClick={handleConvert} className="px-6 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-2 mx-auto"><Receipt className="h-4 w-4" /> Rechnung erstellen</button></div>
    </div>
  );
}