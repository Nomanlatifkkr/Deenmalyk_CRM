'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, Edit, Trash2, Package } from 'lucide-react';
import { Material } from '@/types/materials/types';
import { fetchMaterials, deleteMaterial } from '@/lib/materials/mockData';

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    const data = await fetchMaterials();
    setMaterials(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Material wirklich löschen?')) return;
    await deleteMaterial(id);
    await loadMaterials();
  };

  const filtered = materials.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.materialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Material</h1>
          <p className="text-gray-400 mt-1">Verwalten Sie Ihre Materialien und Lieferantenpreise</p>
        </div>
        <Link href="/materials/create">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90">
            <Plus className="h-4 w-4" /> Neues Material
          </button>
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Suchen nach Name, Nr. oder Kategorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Nr.</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Kategorie</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Einheit</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Bestand</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Preise</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Aktionen</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 text-sm font-mono text-white">{m.materialNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{m.category || '—'}</td>
                  <td className="px-6 py-4 text-gray-300">{m.unit}</td>
                  <td className="px-6 py-4">
                    <span className={m.stockQuantity !== undefined && m.minimumStock !== undefined && m.stockQuantity < m.minimumStock ? 'text-red-400' : 'text-gray-300'}>
                      {m.stockQuantity ?? '—'}
                    </span>
                    {m.minimumStock && <span className="text-xs text-gray-500 ml-1">/ Min. {m.minimumStock}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{m.supplierPrices.length} Lieferant{ m.supplierPrices.length !== 1 ? 'en' : ''}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/materials/${m.id}`}>
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg" title="Details">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        title="Löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">Keine Materialien gefunden</div>}
        </div>
        <div className="px-6 py-3 border-t border-white/10 text-xs text-gray-400">
          {filtered.length} von {materials.length} Materialien
        </div>
      </div>
    </div>
  );
}