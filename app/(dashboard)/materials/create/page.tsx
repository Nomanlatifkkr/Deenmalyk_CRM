'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createMaterial } from '@/lib/materials/mockData';
import MaterialForm from '@/components/materials/MaterialForm';

export default function CreateMaterialPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createMaterial(data);
    router.push('/materials');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/materials">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Neues Material anlegen</h1>
          <p className="text-gray-400 mt-1">Erfassen Sie die Materialstammdaten</p>
        </div>
      </div>
      <MaterialForm
        material={null}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/materials')}
      />
    </div>
  );
}