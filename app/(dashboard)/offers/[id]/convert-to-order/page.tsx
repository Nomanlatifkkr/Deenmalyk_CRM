'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { fetchOffer, updateOffer } from '@/lib/mock/offers';
import { createOrder } from '@/lib/mock/orders';

export default function ConvertToOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);
  useEffect(() => { fetchOffer(id).then(setOffer); }, [id]);
  const handleConvert = async () => {
    if (!offer) return;
    // Create order from offer data
    const orderData = {
      customerId: offer.customerId,
      customerName: offer.customerName,
      title: offer.title,
      description: offer.description,
      orderValue: offer.totalNet,   // net value
      plannedCosts: offer.totalNet * 0.7, // placeholder
      status: 'draft',
      location: '',
      subServices: offer.services.map(s => ({ ...s, status: 'pending' })),
      materialOrders: [],
      mediaFiles: [],
      actualCostsList: [],
    };
    const newOrder = await createOrder(orderData);
    await updateOffer(id, { status: 'converted' });
    router.push(`/orders/${newOrder.id}`);
  };
  if (!offer) return <div>Laden...</div>;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href={`/offers/${id}`}><button className="p-2 glass rounded-lg"><ArrowLeft className="h-5 w-5" /></button></Link><div><h1 className="text-2xl font-bold text-white">In Auftrag umwandeln</h1><p className="text-gray-400">Aus diesem Angebot wird ein Arbeitsauftrag erstellt</p></div></div>
      <div className="glass-card p-6 text-center"><button onClick={handleConvert} className="px-6 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-2 mx-auto"><ShoppingCart className="h-4 w-4" /> Auftrag erstellen</button></div>
    </div>
  );
}