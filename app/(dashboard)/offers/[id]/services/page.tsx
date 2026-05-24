'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { fetchOffer, updateOffer } from '@/lib/mock/offers';
import ServiceDragDrop from '@/components/offers/ServiceDragDrop';
import { OfferService } from '@/types/offer';

export default function ServicesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);
  const [services, setServices] = useState<OfferService[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchOffer(id).then(o => { setOffer(o); setServices(o?.services || []); setLoading(false); }); }, [id]);
  const handleUpdate = async (newServices: OfferService[]) => {
    setServices(newServices);
    const totalNet = newServices.reduce((sum, s) => sum + s.totalPrice, 0);
    const taxRate = offer?.taxRate || 19;
    const totalGross = totalNet * (1 + taxRate / 100);
    await updateOffer(id, { services: newServices, totalNet, totalGross });
  };
  if (loading) return <div>Laden...</div>;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/offers/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">Leistungen konfigurieren</h1><p className="text-gray-400">Drag & Drop zum Sortieren</p></div><button onClick={() => router.push(`/offers/${id}`)} className="ml-auto px-4 py-2 bg-green-600 rounded-lg"><Save className="h-4 w-4 inline" /> Fertig</button></div>
      <ServiceDragDrop services={services} onUpdate={handleUpdate} />
    </div>
  );
}