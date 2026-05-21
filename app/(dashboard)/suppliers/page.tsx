'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Building2 } from 'lucide-react';
import Link from 'next/link';
import { Supplier } from '@/types/suppliers/types';
import { fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } from '@/lib/suppliers/mockData'
import SupplierModal from '@/components/suppliers/SupplierModal';
import SupplierViewModal from '@/components/suppliers/SupplierViewModal';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const data = await fetchSuppliers();
    setSuppliers(data);
    setIsLoading(false);
  };

  const handleAdd = async (data: any) => {
    const newSupplier = await addSupplier(data);
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const handleUpdate = async (id: string, data: Partial<Supplier>) => {
    const updated = await updateSupplier(id, data);
    setSuppliers(prev => prev.map(s => s.id === id ? updated : s));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Lieferanten wirklich löschen?')) return;
    await deleteSupplier(id);
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.supplierNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.contactPerson && s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()))
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Lieferanten</h1>
          <p className="text-gray-400 mt-1">Verwalten Sie Ihre Lieferantenstammdaten</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" />
          Neuer Lieferant
        </button>
      </div>

      {/* Main Card */}
      <div className="glass-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Suchen nach Name, Nr. oder Ansprechpartner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Nr.</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ansprechpartner</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Kontakt</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Aktionen</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-mono text-sm text-white">{supplier.supplierNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{supplier.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{supplier.contactPerson || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{supplier.email}</div>
                    <div className="text-xs text-gray-500">{supplier.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setSelectedSupplier(supplier); setViewModalOpen(true); }}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                        title="Ansehen"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedSupplier(supplier); setEditModalOpen(true); }}
                        className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition"
                        title="Bearbeiten"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
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
          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Keine Lieferanten gefunden</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
          <span>{filteredSuppliers.length} von {suppliers.length} Lieferanten</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 glass rounded-md hover:bg-white/5">Zurück</button>
            <button className="px-3 py-1 bg-blue-600 rounded-md text-white">1</button>
            <button className="px-3 py-1 glass rounded-md hover:bg-white/5">Weiter</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SupplierModal
        isOpen={addModalOpen}
        supplier={null}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAdd}
        onUpdate={handleUpdate}
      />
      <SupplierModal
        isOpen={editModalOpen}
        supplier={selectedSupplier}
        onClose={() => setEditModalOpen(false)}
        onSave={handleAdd}
        onUpdate={handleUpdate}
      />
      <SupplierViewModal
        isOpen={viewModalOpen}
        supplier={selectedSupplier}
        onClose={() => setViewModalOpen(false)}
      />
    </div>
  );
}