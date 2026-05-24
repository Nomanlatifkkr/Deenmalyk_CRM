'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { fetchOrder, updateOrder } from '@/lib/mock/orders';

export default function SchedulingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [order, setOrder] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchOrder(id).then(o => {
      setOrder(o);
      if (o?.scheduledStart) setStartDate(o.scheduledStart.slice(0, 16));
      if (o?.scheduledEnd) setEndDate(o.scheduledEnd.slice(0, 16));
    });
  }, [id]);

  const handleSave = async () => {
    const updates: any = {};
    if (startDate && startDate.trim() !== '') {
      const start = new Date(startDate);
      if (!isNaN(start.getTime())) updates.scheduledStart = start.toISOString();
    }
    if (endDate && endDate.trim() !== '') {
      const end = new Date(endDate);
      if (!isNaN(end.getTime())) updates.scheduledEnd = end.toISOString();
    }
    if (Object.keys(updates).length > 0) {
      await updateOrder(id, updates);
      alert('Termin gespeichert');
    } else {
      alert('Bitte gültiges Datum eingeben');
    }
  };

  if (!order) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/orders/${id}`}>
          <button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div><h1 className="text-2xl font-bold text-white">Terminplanung</h1></div>
      </div>
      <div className="glass-card p-5 space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Start</label>
          <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ende</label>
          <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white" />
        </div>
        <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
          <Save className="h-4 w-4" /> Speichern
        </button>
      </div>
    </div>
  );
}