'use client';

import { Building2, Mail, Phone, MapPin, CreditCard, Banknote, FileText, X } from 'lucide-react';
import { Supplier } from '@/types/suppliers/types';


interface SupplierViewModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  onClose: () => void;
}

export default function SupplierViewModal({ isOpen, supplier, onClose }: SupplierViewModalProps) {
  if (!isOpen || !supplier) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-gray-900 rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">{supplier.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Lieferantennummer</p>
                <p className="text-white font-mono">{supplier.supplierNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Steuernummer</p>
                <p className="text-white">{supplier.taxId || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">E-Mail</p>
                <p className="text-white">{supplier.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Telefon</p>
                <p className="text-white">{supplier.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:col-span-2">
              <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Adresse</p>
                <p className="text-white">
                  {supplier.address.street}<br />
                  {supplier.address.postalCode} {supplier.address.city}<br />
                  {supplier.address.country}
                </p>
              </div>
            </div>
            {supplier.bankAccount && (supplier.bankAccount.iban || supplier.bankAccount.bic) && (
              <div className="flex items-start gap-3 md:col-span-2">
                <Banknote className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Bankverbindung</p>
                  <p className="text-white text-sm font-mono">IBAN: {supplier.bankAccount.iban || '—'}</p>
                  <p className="text-white text-sm font-mono">BIC: {supplier.bankAccount.bic || '—'}</p>
                  <p className="text-white text-sm">{supplier.bankAccount.bankName}</p>
                </div>
              </div>
            )}
            {supplier.notes && (
              <div className="flex items-start gap-3 md:col-span-2">
                <FileText className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Notizen</p>
                  <p className="text-white text-sm">{supplier.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-white/10 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 glass rounded-lg text-gray-300 hover:text-white">Schließen</button>
        </div>
      </div>
    </div>
  );
}