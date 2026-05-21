'use client';

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Supplier } from '@/types/suppliers/types';

interface SupplierModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onSave: (data: Omit<Supplier, 'id' | 'supplierNumber' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onUpdate: (id: string, data: Partial<Supplier>) => Promise<void>;
}

export default function SupplierModal({ isOpen, supplier, onClose, onSave, onUpdate }: SupplierModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    taxId: '',
    address: { street: '', city: '', postalCode: '', country: 'Deutschland' },
    bankAccount: { iban: '', bic: '', bankName: '' },
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        taxId: supplier.taxId || '',
        address: { ...supplier.address },
        bankAccount: supplier.bankAccount || { iban: '', bic: '', bankName: '' },
        notes: supplier.notes || '',
      });
    } else {
      setFormData({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        taxId: '',
        address: { street: '', city: '', postalCode: '', country: 'Deutschland' },
        bankAccount: { iban: '', bic: '', bankName: '' },
        notes: '',
      });
    }
  }, [supplier]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const key = field.split('.')[1];
      setFormData(prev => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (field.startsWith('bank.')) {
      const key = field.split('.')[1];
      setFormData(prev => ({ ...prev, bankAccount: { ...prev.bankAccount, [key]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (supplier) {
      await onUpdate(supplier.id, formData);
    } else {
      await onSave(formData);
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-white/10 bg-gray-900/95">
          <h2 className="text-xl font-semibold text-white">{supplier ? 'Lieferant bearbeiten' : 'Neuen Lieferanten anlegen'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Firmenname *</label>
              <input
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Ansprechpartner</label>
              <input
                value={formData.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">E-Mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Telefon</label>
              <input
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Steuernummer</label>
              <input
                value={formData.taxId}
                onChange={(e) => handleChange('taxId', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Straße + Nr.</label>
              <input
                value={formData.address.street}
                onChange={(e) => handleChange('address.street', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">PLZ</label>
              <input
                value={formData.address.postalCode}
                onChange={(e) => handleChange('address.postalCode', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Stadt</label>
              <input
                value={formData.address.city}
                onChange={(e) => handleChange('address.city', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Land</label>
              <input
                value={formData.address.country}
                onChange={(e) => handleChange('address.country', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-md font-semibold text-white mb-3">Bankverbindung (optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">IBAN</label>
                <input
                  value={formData.bankAccount?.iban || ''}
                  onChange={(e) => handleChange('bank.iban', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">BIC</label>
                <input
                  value={formData.bankAccount?.bic || ''}
                  onChange={(e) => handleChange('bank.bic', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Bankname</label>
                <input
                  value={formData.bankAccount?.bankName || ''}
                  onChange={(e) => handleChange('bank.bankName', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Notizen</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 glass rounded-lg text-gray-300">Abbrechen</button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2">
              {isLoading ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Speichern</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}