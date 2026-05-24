'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { fetchOrder, updateOrder } from '@/lib/mock/orders';
export default function MaterialsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [order, setOrder] = useState<any>(null);
  const [materialOrders, setMaterialOrders] = useState([]);
  useEffect(() => { fetchOrder(id).then(o => { setOrder(o); setMaterialOrders(o?.materialOrders || []); }); }, [id]);
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/orders/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Materialbestellung</h1></div></div>
    <div className="glass-card p-5"><button className="mb-4 px-3 py-1.5 glass rounded-lg text-sm"><Plus className="h-4 w-4 inline" /> Material hinzufügen</button><table className="w-full text-sm"><thead><tr><th>Material</th><th>Menge</th><th>Preis</th><th>Gesamt</th><th>Status</th></tr></thead><tbody>{materialOrders.map(m => <tr key={m.id}><td>{m.materialName}</td><td>{m.quantity} {m.unit}</td><td>€{m.unitPrice}</td><td>€{m.total}</td><td>{m.ordered ? 'Bestellt' : 'Nicht bestellt'}</td></tr>)}</tbody></table></div></div>
  );
}