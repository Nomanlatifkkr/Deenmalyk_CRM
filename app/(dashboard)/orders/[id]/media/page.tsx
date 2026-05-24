'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { fetchOrder, updateOrder } from '@/lib/mock/orders';
export default function MediaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { load(); }, [id]);
  const load = async () => { setOrder(await fetchOrder(id) || null); setLoading(false); };
  const handleUpload = () => { alert('Demo: Datei hochladen'); };
  if (loading) return <div>Laden...</div>;
  if (!order) return <div>Nicht gefunden</div>;
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/orders/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Medien</h1></div></div>
    <div className="glass-card p-6 text-center"><button onClick={handleUpload} className="px-4 py-2 bg-blue-600 rounded-lg"><Upload className="h-4 w-4 inline mr-1" /> Datei hochladen</button><div className="mt-4 grid grid-cols-3 gap-2">{order.mediaFiles.map((f, i) => <div key={i} className="p-2 glass rounded-lg flex justify-between"><span>{f}</span><X className="h-4 w-4 text-red-400" /></div>)}</div></div></div>
  );
}