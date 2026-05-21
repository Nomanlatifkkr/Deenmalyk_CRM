'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Save, X, Trash2, Package, TrendingUp } from 'lucide-react';
import { Material } from '@/types/materials/types';
import { fetchMaterial, updateMaterial, deleteMaterial } from '@/lib/materials/mockData';
import SupplierPriceTable from '@/components/materials/SupplierPriceTable';
import { fetchSuppliersForPricing } from '@/lib/materials/mockData';
import { Supplier } from '@/types/materials/types';

export default function MaterialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [material, setMaterial] = useState<Material | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit: '',
    category: '',
    stockQuantity: 0,
    minimumStock: 0,
  });

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const data = await fetchMaterial(id);
    const supps = await fetchSuppliersForPricing();
    setSuppliers(supps);
    if (data) {
      setMaterial(data);
      setFormData({
        name: data.name,
        description: data.description || '',
        unit: data.unit,
        category: data.category || '',
        stockQuantity: data.stockQuantity || 0,
        minimumStock: data.minimumStock || 0,
      });
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    if (!material) return;
    await updateMaterial(material.id, formData);
    await load();
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm('Material wirklich löschen?')) return;
    await deleteMaterial(material!.id);
    router.push('/materials');
  };

  const handlePriceUpdate = async (newPrices: any[]) => {
    if (!material) return;
    await updateMaterial(material.id, { supplierPrices: newPrices });
    await load();
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!material) return <div className="text-center py-12">Material nicht gefunden</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/materials">
            <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{isEditing ? 'Material bearbeiten' : material.name}</h1>
            <p className="text-gray-400 text-sm">#{material.materialNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white"><Edit className="h-4 w-4" /> Bearbeiten</button>
              <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /> Löschen</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300"><X className="h-4 w-4" /> Abbrechen</button>
              <button onClick={handleUpdate} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold"><Save className="h-4 w-4" /> Speichern</button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Material Details */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Materialdaten</h2>
          {!isEditing ? (
            <div className="space-y-3">
              <div><span className="text-gray-400 text-sm">Beschreibung:</span> <span className="text-white">{material.description || '—'}</span></div>
              <div><span className="text-gray-400 text-sm">Einheit:</span> <span className="text-white">{material.unit}</span></div>
              <div><span className="text-gray-400 text-sm">Kategorie:</span> <span className="text-white">{material.category || '—'}</span></div>
              <div><span className="text-gray-400 text-sm">Bestand:</span> <span className={`${material.stockQuantity !== undefined && material.minimumStock !== undefined && material.stockQuantity < material.minimumStock ? 'text-red-400' : 'text-white'}`}>{material.stockQuantity ?? '—'}</span></div>
              <div><span className="text-gray-400 text-sm">Mindestbestand:</span> <span className="text-white">{material.minimumStock ?? '—'}</span></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div><label className="block text-sm text-gray-300">Name</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
              <div><label className="block text-sm text-gray-300">Beschreibung</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm text-gray-300">Einheit</label><input value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
                <div><label className="block text-sm text-gray-300">Kategorie</label><input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm text-gray-300">Bestand</label><input type="number" value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: parseInt(e.target.value)||0})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
                <div><label className="block text-sm text-gray-300">Mindestbestand</label><input type="number" value={formData.minimumStock} onChange={e => setFormData({...formData, minimumStock: parseInt(e.target.value)||0})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" /></div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick link to price management */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" /> Preisverwaltung
          </h2>
          <p className="text-gray-400 text-sm mb-4">Verwalten Sie Lieferantenpreise für dieses Material.</p>
          <Link href={`/materials/${material.id}/prices`}>
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold">
              Zu den Lieferantenpreisen
            </button>
          </Link>
        </div>
      </div>

      {/* Optional: Show prices inline (read-only) */}
      <SupplierPriceTable
        prices={material.supplierPrices}
        suppliers={suppliers}
        onUpdate={handlePriceUpdate}
        readOnly={true}
      />
    </div>
  );
}