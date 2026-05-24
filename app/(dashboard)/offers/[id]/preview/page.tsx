'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { fetchOffer } from '@/lib/mock/offers';
import OfferPreview from '@/components/offers/OfferPreview';

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [offer, setOffer] = useState<any>(null);
  useEffect(() => { fetchOffer(id).then(setOffer); }, [id]);
  if (!offer) return <div>Laden...</div>;
  const handlePrint = () => window.print();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/offers/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Vorschau</h1></div><button onClick={handlePrint} className="ml-auto flex items-center gap-2 px-3 py-1.5 glass rounded-lg"><Download className="h-4 w-4" /> PDF / Drucken</button></div>
      <OfferPreview offer={offer} />
    </div>
  );
}