'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { fetchOrder, updateOrder } from '@/lib/mock/orders';
export default function SchedulingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [order, setOrder] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  useEffect(() => { fetchOrder(id).then(o => { setOrder(o); setStartDate(o?.scheduledStart?.slice(0,16) || ''); setEndDate(o?.scheduledEnd?.slice(0,16) || ''); }); }, [id]);
  const handleSave = async () => {
    await updateOrder(id, { scheduledStart: new Date(startDate).toISOString(), scheduledEnd: new Date(endDate).toISOString() });
    alert('Termin gespeichert');
  };
  if (!order) return <div>Laden...</div>;
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/orders/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Terminplanung</h1></div></div>
    <div className="glass-card p-5 space-y-4"><div><label>Start</label><input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 bg-white/5 border rounded" /></div><div><label>Ende</label><input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 bg-white/5 border rounded" /></div><button onClick={handleSave} className="px-4 py-2 bg-blue-600 rounded-lg">Speichern</button></div></div>
  );
}