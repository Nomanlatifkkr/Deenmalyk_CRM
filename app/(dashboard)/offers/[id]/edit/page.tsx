'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchOffer, updateOffer } from '@/lib/mock/offers';
import OfferForm from '@/components/offers/OfferForm';

export default function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);
  useEffect(() => { fetchOffer(id).then(setOffer); }, [id]);
  const handleSubmit = async (data: any) => {
    await updateOffer(id, data);
    router.push(`/offers/${id}`);
  };
  if (!offer) return <div>Laden...</div>;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/offers/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Angebot bearbeiten</h1></div></div>
      <OfferForm offer={offer} onSubmit={handleSubmit} onCancel={() => router.push(`/offers/${id}`)} />
    </div>
  );
}