'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Material, Supplier } from '@/types/materials/types';
import { fetchMaterial, fetchSuppliersForPricing, updateSupplierPrices } from '@/lib/materials/mockData';
import SupplierPriceTable from '@/components/materials/SupplierPriceTable';

export default function MaterialPricesPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [material, setMaterial] = useState<Material | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const mat = await fetchMaterial(id);
    const supp = await fetchSuppliersForPricing();
    setSuppliers(supp);
    setMaterial(mat || null);
    setIsLoading(false);
  };

  const handlePriceUpdate = async (newPrices: any[]) => {
    if (material) {
      await updateSupplierPrices(material.id, newPrices);
      await load();
    }
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!material) return <div className="text-center py-12">Material nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/materials/${material.id}`}>
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Lieferantenpreise für {material.name}</h1>
          <p className="text-gray-400 text-sm">#{material.materialNumber}</p>
        </div>
      </div>

      <SupplierPriceTable
        prices={material.supplierPrices}
        suppliers={suppliers}
        onUpdate={handlePriceUpdate}
        readOnly={false}
      />

      <div className="flex justify-end">
        <Link href={`/materials/${material.id}`}>
          <button className="px-4 py-2 glass rounded-lg text-gray-300 hover:text-white">Zurück zum Material</button>
        </Link>
      </div>
    </div>
  );
}