'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  ArrowLeft,
  ShoppingCart,
} from 'lucide-react';

import {
  fetchOffer,
  updateOffer,
} from '@/lib/mock/offers';

import { createOrder } from '@/lib/mock/orders';

interface Service {
  id: string;
  serviceName: string;
  description?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

interface Offer {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description?: string;
  totalNet: number;
  services: Service[];
}

interface ConvertToOrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ConvertToOrderPage({
  params,
}: ConvertToOrderPageProps) {
  // ✅ Next.js async params fix
  const { id } = use(params);

  const router = useRouter();

  const [offer, setOffer] =
    useState<Offer | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [creating, setCreating] =
    useState<boolean>(false);

  // Load offer
  useEffect(() => {
    const loadOffer = async () => {
      try {
        const data = await fetchOffer(id);

        if (data) {
          setOffer(data as Offer);
        }
      } catch (error) {
        console.error(
          'Failed to fetch offer:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadOffer();
  }, [id]);

  // Convert offer to order
  const handleConvert = async () => {
    try {
      if (!offer) return;

      setCreating(true);

      const plannedCosts =
        offer.totalNet * 0.7;

      const plannedMargin =
        offer.totalNet - plannedCosts;

      const orderData = {
        customerId: offer.customerId,

        customerName: offer.customerName,

        title: offer.title,

        description:
          offer.description || '',

        orderValue: offer.totalNet,

        plannedCosts,

        // ✅ REQUIRED FIELD
        plannedMargin,

        status: 'draft',

        location: '',

        subServices: offer.services.map(
          (service) => ({
            ...service,
            status: 'pending',
          })
        ),

        materialOrders: [],

        mediaFiles: [],

        actualCostsList: [],
      };

      const newOrder =
        await createOrder(orderData);

      // Update offer status
      await updateOffer(id, {
        status: 'converted',
      });

      // Redirect
      router.push(
        `/orders/${newOrder.id}`
      );
    } catch (error) {
      console.error(
        'Failed to convert offer:',
        error
      );
    } finally {
      setCreating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Laden...
      </div>
    );
  }

  // Not found state
  if (!offer) {
    return (
      <div className="p-6 text-center text-red-400">
        Angebot nicht gefunden
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/offers/${id}`}>
          <button className="glass rounded-lg p-2 transition hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-white">
            In Auftrag umwandeln
          </h1>

          <p className="text-gray-400">
            Aus diesem Angebot wird ein
            Arbeitsauftrag erstellt
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="glass-card p-6 text-center">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            {offer.title}
          </h2>

          <p className="mt-2 text-gray-400">
            Kunde:{' '}
            {offer.customerName}
          </p>

          <p className="mt-4 text-2xl font-bold text-green-400">
            €
            {offer.totalNet.toLocaleString(
              'de-DE'
            )}
          </p>
        </div>

        <button
          onClick={handleConvert}
          disabled={creating}
          className="mx-auto flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />

          {creating
            ? 'Wird erstellt...'
            : 'Auftrag erstellen'}
        </button>
      </div>
    </div>
  );
}