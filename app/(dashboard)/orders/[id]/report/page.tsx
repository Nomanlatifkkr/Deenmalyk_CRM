'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { fetchOrder } from '@/lib/mock/orders';
export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [order, setOrder] = useState<any>(null);
  useEffect(() => { fetchOrder(id).then(o => setOrder(o)); }, [id]);
  const handleExport = () => alert('Export als PDF (Demo)');
  if (!order) return <div>Laden...</div>;
  return (
    <div className="space-y-6"><div className="flex items-center gap-4"><Link href={`/orders/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Bericht</h1></div><button onClick={handleExport} className="ml-auto flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Download className="h-4 w-4" /> Export</button></div>
    <div className="glass-card p-6"><h2 className="text-xl font-bold">{order.title}</h2><p>Auftragsnummer: {order.orderNumber}</p><p>Kunde: {order.customerName}</p><p>Wert: €{order.orderValue}</p><p>Deckungsbeitrag: €{order.actualMargin}</p><p>Status: {order.status}</p></div></div>
  );
}