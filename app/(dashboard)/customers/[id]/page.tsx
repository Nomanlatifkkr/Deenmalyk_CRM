'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Save, X, Trash2, Mail, Phone, MapPin, Building, CreditCard, Shield } from 'lucide-react';

interface Customer {
  id: string;
  customerNumber: string;
  name: string;
  email: string;
  phone: string;
  vatExempt: boolean;
  vatExemptReason?: string;
  taxId?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = React.use(params);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    vatExempt: false,
    vatExemptReason: '§13b',
    taxId: '',
  });

  useEffect(() => {
    if (id) loadCustomer();
  }, [id]);

  const loadCustomer = () => {
    const stored = localStorage.getItem('customers');
    const allCustomers: Customer[] = stored ? JSON.parse(stored) : [];
    const found = allCustomers.find(c => c.id === id);
    if (found) {
      setCustomer(found);
      setFormData({
        name: found.name,
        email: found.email,
        phone: found.phone,
        street: found.address?.street || '',
        city: found.address?.city || '',
        postalCode: found.address?.postalCode || '',
        country: found.address?.country || 'Deutschland',
        vatExempt: found.vatExempt,
        vatExemptReason: found.vatExemptReason || '§13b',
        taxId: found.taxId || '',
      });
    }
    setIsLoading(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    const updatedCustomer: Customer = {
      ...customer,
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

    const stored = localStorage.getItem('customers');
    let allCustomers: Customer[] = stored ? JSON.parse(stored) : [];
    allCustomers = allCustomers.map(c => c.id === id ? updatedCustomer : c);
    localStorage.setItem('customers', JSON.stringify(allCustomers));

    setCustomer(updatedCustomer);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!confirm('Möchten Sie diesen Kunden endgültig löschen?')) return;
    const stored = localStorage.getItem('customers');
    let allCustomers: Customer[] = stored ? JSON.parse(stored) : [];
    allCustomers = allCustomers.filter(c => c.id !== id);
    localStorage.setItem('customers', JSON.stringify(allCustomers));
    router.push('/customers');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Kunde nicht gefunden</p>
        <Link href="/customers" className="text-blue-400 hover:underline mt-2 inline-block">Zurück zur Liste</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/customers">
            <button className="p-2 glass rounded-lg hover:bg-white/10 transition">
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{isEditing ? 'Kunde bearbeiten' : customer.name}</h1>
            <p className="text-gray-400 text-sm">#{customer.customerNumber}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {!isEditing ? (
            <>
              <Link href={`/customers/${customer.id}/vat`}>
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-amber-400 hover:text-amber-300 transition">
                  <Shield className="h-4 w-4" /> §13b Einstellungen
                </button>
              </Link>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white transition"
              >
                <Edit className="h-4 w-4" /> Bearbeiten
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-red-400 hover:text-red-300 transition"
              >
                <Trash2 className="h-4 w-4" /> Löschen
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white transition"
              >
                <X className="h-4 w-4" /> Abbrechen
              </button>
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition"
              >
                <Save className="h-4 w-4" /> Speichern
              </button>
            </>
          )}
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="glass-card p-6">
        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-500">Firmenname</p>
                  <p className="text-white">{customer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-500">E-Mail</p>
                  <p className="text-white">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-500">Telefon</p>
                  <p className="text-white">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-500">Steuernummer</p>
                  <p className="text-white">{customer.taxId || '—'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Adresse</p>
                  <p className="text-white">
                    {customer.address?.street}<br />
                    {customer.address?.postalCode} {customer.address?.city}<br />
                    {customer.address?.country}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Umsatzsteuer-Status</p>
                {customer.vatExempt ? (
                  <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    §13b befreit (Reverse Charge)
                  </span>
                ) : (
                  <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Umsatzsteuerpflichtig (+19%)
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Firmenname *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">E-Mail *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Telefon *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Steuernummer</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">Straße + Hausnummer</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">PLZ</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Stadt</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Land</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.vatExempt}
                  onChange={(e) => setFormData({ ...formData, vatExempt: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600"
                />
                <span className="text-sm text-gray-300">Umsatzsteuerbefreit nach §13b</span>
              </label>
              {formData.vatExempt && (
                <select
                  value={formData.vatExemptReason}
                  onChange={(e) => setFormData({ ...formData, vatExemptReason: e.target.value })}
                  className="mt-2 ml-6 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                >
                  <option value="§13b">§13b - Reverse Charge</option>
                  <option value="smallBusiness">Kleinunternehmerregelung</option>
                </select>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}