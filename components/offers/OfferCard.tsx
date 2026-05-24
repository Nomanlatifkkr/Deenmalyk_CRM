'use client';
import Link from 'next/link';
import { FileText, Euro, Calendar, TrendingUp } from 'lucide-react';
import { Offer } from '@/types/offer';

export default function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className="glass-card p-5 hover:scale-[1.02] transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2"><FileText className="h-5 w-5 text-blue-400" /><span className="text-sm font-mono">{offer.offerNumber}</span></div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5">{offer.status}</span>
      </div>
      <Link href={`/offers/${offer.id}`}><h3 className="text-lg font-semibold text-white hover:text-blue-400 mt-2">{offer.title}</h3></Link>
      <p className="text-sm text-gray-400">{offer.customerName}</p>
      <div className="mt-3 flex justify-between text-sm">
        <span>€{offer.totalNet.toLocaleString()} netto</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> gültig bis {new Date(offer.validUntil).toLocaleDateString()}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/offers/${offer.id}`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm">Details</Link>
        {offer.status === 'draft' && <Link href={`/offers/${offer.id}/edit`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm">Bearbeiten</Link>}
        {offer.status === 'accepted' && <Link href={`/offers/${offer.id}/convert-to-order`} className="flex-1 text-center px-3 py-1.5 glass rounded-lg text-sm">Auftrag</Link>}
      </div>
    </div>
  );
}