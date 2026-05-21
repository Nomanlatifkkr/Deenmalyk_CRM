'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function CreateCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Deutschland',
    vatExempt: false,
    vatExemptReason: '§13b',
    taxId: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const existing = JSON.parse(localStorage.getItem('customers') || '[]');
    const newCustomer = {
      id: Date.now().toString(),
      customerNumber: `C-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      taxId: formData.taxId,
      vatExempt: formData.vatExempt,
      vatExemptReason: formData.vatExemptReason,
      address: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      }
    };
    existing.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(existing));
    
    setTimeout(() => {
      setIsLoading(false);
      router.push('/customers');
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/customers">
          <button className="p-2 glass rounded-lg hover:bg-white/10 transition">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Neuen Kunden anlegen</h1>
          <p className="text-gray-400 mt-1">Erfassen Sie alle relevanten Kundendaten</p>
        </div>
      </div>

      {/* Form */}
      <div className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Basisdaten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Firmenname *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="ABC GmbH"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">E-Mail *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="info@example.de"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Telefon *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="+49 123 456789"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Steuernummer / USt-IdNr.</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="DE123456789"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Adresse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">Straße + Hausnummer</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Hauptstraße 1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">PLZ</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="10115"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Stadt</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Berlin"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Land</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Deutschland"
                />
              </div>
            </div>
          </div>

          {/* Tax Settings */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Steuerliche Einstellungen</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.vatExempt}
                  onChange={(e) => setFormData({ ...formData, vatExempt: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Umsatzsteuerbefreit nach §13b (Reverse Charge)</span>
              </label>
              {formData.vatExempt && (
                <div className="ml-6">
                  <select
                    value={formData.vatExemptReason}
                    onChange={(e) => setFormData({ ...formData, vatExemptReason: e.target.value })}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="§13b">§13b - Reverse Charge</option>
                    <option value="smallBusiness">Kleinunternehmerregelung</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Link href="/customers">
              <button type="button" className="px-4 py-2 glass rounded-lg text-gray-300 hover:text-white transition">
                Abbrechen
              </button>
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Wird erstellt...' : <><Save className="h-4 w-4" /> Kunde anlegen</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}