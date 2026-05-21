'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createService } from '@/lib/mock/services';
import ServiceForm from '@/components/services/ServiceForm';

export default function NewServicePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createService(data);
    router.push('/services');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/services">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Neue Leistung anlegen</h1>
          <p className="text-gray-400 mt-1">Erfassen Sie eine neue Serviceleistung</p>
        </div>
      </div>
      <ServiceForm
        service={null}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/services')}
      />
    </div>
  );
}