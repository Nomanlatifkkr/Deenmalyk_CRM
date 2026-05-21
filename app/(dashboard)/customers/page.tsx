'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Eye, Filter, Building2, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

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

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    const stored = localStorage.getItem('customers');
    if (stored && JSON.parse(stored).length > 0) {
      setCustomers(JSON.parse(stored));
    } else {
      const mockCustomers: Customer[] = [
        {
          id: '1',
          customerNumber: 'C-1001',
          name: 'ABC Construction GmbH',
          email: 'info@abc-construction.de',
          phone: '+49 711 123456',
          vatExempt: true,
          vatExemptReason: '§13b',
          taxId: 'DE123456789',
          address: {
            street: 'Hauptstraße 1',
            city: 'Stuttgart',
            postalCode: '70173',
            country: 'Germany'
          }
        },
        {
          id: '2',
          customerNumber: 'C-1002',
          name: 'Bauwerk AG',
          email: 'kontakt@bauwerk.de',
          phone: '+49 89 987654',
          vatExempt: false,
          taxId: 'DE987654321',
          address: {
            street: 'Marienplatz 8',
            city: 'München',
            postalCode: '80331',
            country: 'Germany'
          }
        },
        {
          id: '3',
          customerNumber: 'C-1003',
          name: 'Hochtief Construction',
          email: 'info@hochtief.de',
          phone: '+49 40 456789',
          vatExempt: true,
          vatExemptReason: '§13b',
          taxId: 'DE456789123',
          address: {
            street: 'HafenCity 5',
            city: 'Hamburg',
            postalCode: '20457',
            country: 'Germany'
          }
        }
      ];
      setCustomers(mockCustomers);
      localStorage.setItem('customers', JSON.stringify(mockCustomers));
    }
    setIsLoading(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Möchten Sie diesen Kunden wirklich löschen?')) return;
    const updated = customers.filter(c => c.id !== id);
    setCustomers(updated);
    localStorage.setItem('customers', JSON.stringify(updated));
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.customerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Kunden</h1>
          <p className="text-gray-400 mt-1">
            Verwalten Sie Ihre Kundenstammdaten inkl. §13b USt‑Befreiung
          </p>
        </div>
        <Link href="/customers/create">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition">
            <Plus className="h-4 w-4" />
            Neuer Kunde
          </button>
        </Link>
      </div>

      {/* Main Card */}
      <div className="glass-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Suchen nach Name, Nr. oder E‑Mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 border border-white/10 rounded-lg hover:bg-white/5 transition">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Kunden-Nr.</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Kontakt</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">USt‑Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Aktionen</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((customer, idx) => (
                <tr key={customer.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-white">{customer.customerNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-white">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Mail className="h-3 w-3" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Phone className="h-3 w-3" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {customer.vatExempt ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        §13b befreit
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        USt pflichtig
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/customers/${customer.id}`}>
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Keine Kunden gefunden</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
          <span>{filteredCustomers.length} von {customers.length} Kunden</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 glass rounded-md hover:bg-white/5">Zurück</button>
            <button className="px-3 py-1 bg-blue-600 rounded-md text-white">1</button>
            <button className="px-3 py-1 glass rounded-md hover:bg-white/5">Weiter</button>
          </div>
        </div>
      </div>
    </div>
  );
}