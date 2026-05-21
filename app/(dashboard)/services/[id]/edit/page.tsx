'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Service } from '@/types/service';
import { fetchService, updateService } from '@/lib/mock/services';
import ServiceForm from '@/components/services/ServiceForm';

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const data = await fetchService(id);
    setService(data || null);
    setIsLoading(false);
  };

  const handleSubmit = async (formData: any) => {
    if (service) {
      await updateService(service.id, formData);
      router.push(`/services/${service.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Leistung nicht gefunden</p>
        <Link href="/services" className="text-blue-400 hover:underline">Zurück zur Liste</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/services/${service.id}`}>
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Leistung bearbeiten</h1>
          <p className="text-gray-400 text-sm">{service.name} (#{service.serviceNumber})</p>
        </div>
      </div>
      <ServiceForm
        service={service}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/services/${service.id}`)}
      />
    </div>
  );
}