'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, FileText, Euro, Calendar, ShoppingCart, Receipt } from 'lucide-react';
import { fetchOffer } from '@/lib/mock/offers';
import { Offer } from '@/types/offer';

export default function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [offer, setOffer] = useState<Offer | null>(null);
  useEffect(() => { fetchOffer(id).then(setOffer); }, [id]);
  if (!offer) return <div className="flex justify-center h-64"><div className="animate-spin h-8 w-8" /></div>;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4"><Link href="/offers"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">{offer.title}</h1><p className="text-gray-400">#{offer.offerNumber}</p></div></div>
        <div className="flex gap-2"><Link href={`/offers/${offer.id}/edit`}><button className="px-4 py-2 glass rounded-lg"><Edit className="h-4 w-4 inline" /> Bearbeiten</button></Link>{offer.status !== 'converted' && <Link href={`/offers/${offer.id}/convert-to-order`}><button className="px-4 py-2 glass rounded-lg"><ShoppingCart className="h-4 w-4 inline" /> Auftrag</button></Link>}<Link href={`/offers/${offer.id}/convert-to-invoice`}><button className="px-4 py-2 glass rounded-lg"><Receipt className="h-4 w-4 inline" /> Rechnung</button></Link></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Kunde</p><p className="text-white">{offer.customerName}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Status</p><p className="text-white">{offer.status}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Netto</p><p className="text-white">€{offer.totalNet.toLocaleString()}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-gray-400">Gültig bis</p><p className="text-white">{new Date(offer.validUntil).toLocaleDateString()}</p></div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href={`/offers/${offer.id}/services`}><button className="px-3 py-1.5 glass rounded-lg text-sm">Leistungen ({offer.services.length})</button></Link>
        <Link href={`/offers/${offer.id}/subsidies`}><button className="px-3 py-1.5 glass rounded-lg text-sm">Förderungen ({offer.subsidies.length})</button></Link>
        <Link href={`/offers/${offer.id}/preview`}><button className="px-3 py-1.5 glass rounded-lg text-sm">Vorschau</button></Link>
      </div>
      <div className="glass-card p-5"><h3 className="text-white font-semibold mb-2">Leistungsübersicht</h3>{offer.services.map(s => <div key={s.id} className="flex justify-between py-1"><span>{s.serviceName} ({s.quantity} {s.unit})</span><span>€{s.totalPrice.toLocaleString()}</span></div>)}</div>
    </div>
  );
}