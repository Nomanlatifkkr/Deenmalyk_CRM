'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, Edit, Trash2, Wrench } from 'lucide-react';
import { Service } from '@/types/service';
import { fetchServices, deleteService } from '@/lib/mock/services';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchServices();
    setServices(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Diese Leistung wirklich löschen?')) return;
    await deleteService(id);
    await load();
  };

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.serviceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Leistungen</h1>
          <p className="text-gray-400 mt-1">Verwalten Sie Ihre Serviceleistungen für Angebote, Aufträge und Rechnungen</p>
        </div>
        <Link href="/services/new">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90">
            <Plus className="h-4 w-4" /> Neue Leistung
          </button>
        </Link>
      </div>

      {/* Main Card */}
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
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Leistung</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Kategorie</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Einheit</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Preis (netto)</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Steuer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((service) => (
                <tr key={service.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-sm font-mono text-white">{service.serviceNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{service.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{service.category}</td>
                  <td className="px-6 py-4 text-gray-300">{service.unit}</td>
                  <td className="px-6 py-4 text-white">
                    {service.defaultPrice.toLocaleString('de-DE')} {service.currency}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 glass rounded-full text-xs">
                      {service.taxRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/services/${service.id}`}>
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg" title="Details">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <Link href={`/services/${service.id}/edit`}>
                        <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg" title="Bearbeiten">
                          <Edit className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
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
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Keine Leistungen gefunden</p>
            </div>
          )}
        </div>
        <div className="px-6 py-3 border-t border-white/10 text-xs text-gray-400">
          {filtered.length} von {services.length} Leistungen
        </div>
      </div>
    </div>
  );
}