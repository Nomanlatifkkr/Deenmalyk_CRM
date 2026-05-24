'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createOffer } from '@/lib/mock/offers';
import OfferForm from '@/components/offers/OfferForm';

export default function NewOfferPage() {
  const router = useRouter();
  const handleSubmit = async (data: any) => {
    const newOfferData = {
      ...data,
      status: 'draft',
      totalNet: 0,
      totalGross: 0,
      subsidies: [],
      services: [],
    };
    const created = await createOffer(newOfferData);
    router.push(`/offers/${created.id}/services`);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href="/offers"><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Neues Angebot (manuell)</h1></div></div>
      <OfferForm offer={null} onSubmit={handleSubmit} onCancel={() => router.push('/offers')} />
    </div>
  );
}