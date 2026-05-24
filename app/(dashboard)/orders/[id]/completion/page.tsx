'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { fetchOrder, updateOrder } from '@/lib/mock/orders';
export default function CompletionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  useEffect(() => { fetchOrder(id).then(setOrder); }, [id]);
  const handleComplete = async () => {
    await updateOrder(id, { status: 'completed' });
    alert('Abschlussbestätigung versendet (Demo)');
    router.push(`/orders/${id}`);
  };
  if (!order) return <div>Laden...</div>;
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/orders/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Auftrag abschließen</h1></div></div>
    <div className="glass-card p-6 text-center"><p>Möchten Sie diesen Auftrag als abgeschlossen markieren?</p><p className="text-sm text-gray-400 mt-2">Eine E-Mail wird an den Kunden gesendet.</p><button onClick={handleComplete} className="mt-4 px-6 py-2 bg-green-600 rounded-lg flex items-center gap-2 mx-auto"><Send className="h-4 w-4" /> Abschließen & Benachrichtigen</button></div></div>
  );
}