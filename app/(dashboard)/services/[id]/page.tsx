'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Wrench, Euro, Hash, Tag, FileText } from 'lucide-react';
import { Service } from '@/types/service';
import { fetchService, deleteService } from '@/lib/mock/services';

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
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

  const handleDelete = async () => {
    if (!confirm('Diese Leistung wirklich löschen?')) return;
    await deleteService(id);
    router.push('/services');
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
        <Link href="/services" className="text-blue-400 hover:underline mt-2 inline-block">Zurück zur Liste</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/services">
            <button className="p-2 glass rounded-lg hover:bg-white/10">
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{service.name}</h1>
            <p className="text-gray-400 text-sm">#{service.serviceNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/services/${service.id}/edit`}>
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white">
              <Edit className="h-4 w-4" /> Bearbeiten
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-red-400 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" /> Löschen
          </button>
        </div>
      </div>

      {/* Details Card */}
      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Hash className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Leistungsnummer</p>
                <p className="text-white font-mono">{service.serviceNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Kategorie</p>
                <p className="text-white">{service.category || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wrench className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Einheit</p>
                <p className="text-white">{service.unit || '—'}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Euro className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Standardpreis (netto)</p>
                <p className="text-white">{service.defaultPrice.toLocaleString('de-DE')} {service.currency}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Steuersatz</p>
                <p className="text-white">{service.taxRate}%</p>
              </div>
            </div>
          </div>
          {service.description && (
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 mb-1">Beschreibung</p>
              <p className="text-white">{service.description}</p>
            </div>
          )}
          {service.notes && (
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 mb-1">Notizen</p>
              <p className="text-white">{service.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional info */}
      <div className="text-xs text-gray-500 text-center">
        Erstellt: {new Date(service.createdAt).toLocaleDateString('de-DE')} | 
        Letzte Änderung: {new Date(service.updatedAt).toLocaleDateString('de-DE')}
      </div>
    </div>
  );
}