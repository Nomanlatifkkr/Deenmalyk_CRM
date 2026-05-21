'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Shield, AlertCircle, CheckCircle } from 'lucide-react';

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

export default function CustomerVatSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    vatExempt: false,
    vatExemptReason: '§13b',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, [id]);

  const loadCustomer = () => {
    const stored = localStorage.getItem('customers');
    const allCustomers: Customer[] = stored ? JSON.parse(stored) : [];
    const found = allCustomers.find(c => c.id === id);
    if (found) {
      setCustomer(found);
      setFormData({
        vatExempt: found.vatExempt,
        vatExemptReason: found.vatExemptReason || '§13b',
      });
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    setIsSaving(true);
    
    // Update customer in localStorage
    const stored = localStorage.getItem('customers');
    let allCustomers: Customer[] = stored ? JSON.parse(stored) : [];
    const updatedCustomer: Customer = {
      ...customer,
      vatExempt: formData.vatExempt,
      vatExemptReason: formData.vatExemptReason,
    };
    allCustomers = allCustomers.map(c => c.id === id ? updatedCustomer : c);
    localStorage.setItem('customers', JSON.stringify(allCustomers));

    setCustomer(updatedCustomer);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    setIsSaving(false);
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
      <div className="flex items-center gap-4">
        <Link href={`/customers/${id}`}>
          <button className="p-2 glass rounded-lg hover:bg-white/10 transition">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Umsatzsteuer‑Einstellungen</h1>
          <p className="text-gray-400 mt-1">
            {customer.name} <span className="text-gray-500">• #{customer.customerNumber}</span>
          </p>
        </div>
      </div>

      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div className="bg-emerald-500/90 backdrop-blur rounded-lg px-4 py-3 shadow-lg border border-emerald-400/30 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-white" />
            <span className="text-white font-medium">Einstellungen gespeichert</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Card */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">§13b Reverse‑Charge Verfahren</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Gemäß §13b UStG geht die Steuerschuldnerschaft bei Bauleistungen auf den Leistungsempfänger über. 
                  Aktivieren Sie diese Option, wenn der Kunde die Umsatzsteuer selbst an das Finanzamt abführen muss.
                </p>
                <label className="flex items-center gap-3 cursor-pointer p-4 glass rounded-xl hover:bg-white/5 transition">
                  <input
                    type="checkbox"
                    checked={formData.vatExempt}
                    onChange={(e) => setFormData({ ...formData, vatExempt: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-white font-medium">Umsatzsteuerbefreiung nach §13b aktivieren</span>
                    <p className="text-xs text-gray-500 mt-0.5">Der Kunde ist leistungsempfänger und schuldet die Steuer.</p>
                  </div>
                </label>
              </div>

              {formData.vatExempt && (
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Begründung der Steuerbefreiung</label>
                  <select
                    value={formData.vatExemptReason}
                    onChange={(e) => setFormData({ ...formData, vatExemptReason: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="§13b">§13b - Reverse Charge (Bauleistungen)</option>
                    <option value="smallBusiness">Kleinunternehmerregelung §19 UStG</option>
                    <option value="export">Ausfuhrlieferung / innergemeinschaftliche Lieferung</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Bei §13b wird auf Rechnungen der Hinweis „Steuerschuldnerschaft des Leistungsempfängers“ automatisch eingefügt.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Link href={`/customers/${id}`}>
                  <button type="button" className="px-4 py-2 glass rounded-lg text-gray-300 hover:text-white transition">
                    Abbrechen
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
                >
                  {isSaving ? 'Wird gespeichert...' : <><Save className="h-4 w-4" /> Einstellungen speichern</>}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-400" />
              <h3 className="text-white font-semibold">Wichtiger Hinweis</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Die Aktivierung von §13b führt dazu, dass auf allen Rechnungen an diesen Kunden <strong className="text-white">keine Umsatzsteuer ausgewiesen</strong> wird.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Der Rechnungsvermerk muss lauten: <span className="text-white font-mono text-xs block mt-1 bg-white/5 p-1 rounded">„Steuerschuldnerschaft des Leistungsempfängers (§13b UStG)“</span>
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500">
                Aktueller Status: {customer.vatExempt ? (
                  <span className="text-amber-300 font-medium">§13b befreit</span>
                ) : (
                  <span className="text-emerald-300 font-medium">Umsatzsteuerpflichtig</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}