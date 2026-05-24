'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, Calendar, Users, Package, Receipt, FileText, AlertTriangle } from 'lucide-react';
import { fetchOrder } from '@/lib/mock/orders';
import { Order } from '@/types/order';
export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { load(); }, [id]);
  const load = async () => { setOrder(await fetchOrder(id) || null); setLoading(false); };
  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8" /></div>;
  if (!order) return <div>Nicht gefunden</div>;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div className="flex items-center gap-4"><Link href="/orders"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">{order.title}</h1><p className="text-gray-400">#{order.orderNumber}</p></div></div><Link href={`/orders/${order.id}/edit`}><button className="px-4 py-2 glass rounded-lg"><Edit className="h-4 w-4 inline mr-1" /> Bearbeiten</button></Link></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Kunde</p><p className="text-white">{order.customerName}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Status</p><p className="text-white">{order.status}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Auftragswert</p><p className="text-white">€{order.orderValue.toLocaleString()}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Deckungsbeitrag</p><p className="text-green-400">€{order.actualMargin.toLocaleString()}</p></div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href={`/orders/${order.id}/crews`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><Users className="h-4 w-4" /> Teams</button></Link>
        <Link href={`/orders/${order.id}/materials`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><Package className="h-4 w-4" /> Material</button></Link>
        <Link href={`/orders/${order.id}/scheduling`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><Calendar className="h-4 w-4" /> Planung</button></Link>
        <Link href={`/orders/${order.id}/costs`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><Receipt className="h-4 w-4" /> Ist-Kosten</button></Link>
        <Link href={`/orders/${order.id}/post-calculation`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><FileText className="h-4 w-4" /> Nachkalkulation</button></Link>
        {order.status !== 'completed' && <Link href={`/orders/${order.id}/completion`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm text-green-400">Abschließen</button></Link>}
        <Link href={`/orders/${order.id}/complaint`}><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm text-red-400"><AlertTriangle className="h-4 w-4" /> Reklamation</button></Link>
      </div>
      <div className="glass-card p-5"><h3 className="text-white font-semibold mb-2">Sub-Leistungen</h3>{order.subServices.length === 0 ? <p className="text-gray-400">Keine Sub-Leistungen</p> : order.subServices.map(s => <div key={s.id} className="flex justify-between py-1"><span>{s.name} ({s.quantity} {s.unit})</span><span>€{s.total.toLocaleString()}</span></div>)}</div>
    </div>
  );
}