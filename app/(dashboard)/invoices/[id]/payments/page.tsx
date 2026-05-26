'use client';

import { use, useEffect, useState } from 'react';

import {
  addPayment,
  fetchInvoice,
} from '@/lib/mock/invoices';

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference: string;
}

interface Invoice {
  id: string;
  payments: Payment[];
}

interface PaymentsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PaymentsPage({
  params,
}: PaymentsPageProps) {
  // Fix: React.use() → use()
  const { id } = use(params);

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const data = await fetchInvoice(id);
        setInvoice(data || null);
      } catch (error) {
        console.error('Failed to fetch invoice:', error);
      }
    };

    loadInvoice();
  }, [id]);

  const handleAdd = async () => {
    try {
      if (amount <= 0) {
        alert('Bitte gültigen Betrag eingeben');
        return;
      }

      await addPayment(id, {
        date: new Date().toISOString().split('T')[0],
        amount,
        method: 'bank_transfer',
        reference: 'Demo',
      });

      const updatedInvoice = await fetchInvoice(id);

      setInvoice(updatedInvoice || null);

      setAmount(0);

      alert('Zahlung hinzugefügt');
    } catch (error) {
      console.error('Failed to add payment:', error);
      alert('Fehler beim Hinzufügen der Zahlung');
    }
  };

  if (!invoice) {
    return (
      <div className="p-6 text-center text-gray-400">
        Rechnung wird geladen...
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Zahlungen
      </h2>

      {/* Payments List */}
      <div className="space-y-2">
        {invoice.payments.length > 0 ? (
          invoice.payments.map((payment) => (
            <div
              key={payment.id} 
              className="flex justify-between rounded-lg bg-white/5 p-3 text-white"
            >
              <span>{payment.date}</span>

              <span>€{payment.amount}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">
            Keine Zahlungen vorhanden
          </p>
        )}
      </div>

      {/* Add Payment */}
      <div className="mt-6">
        <input
          type="number"
          placeholder="Betrag"
          value={amount}
          onChange={(e) =>
            setAmount(parseFloat(e.target.value) || 0)
          }
          className="w-full rounded border border-white/10 bg-white/5 p-2 text-white outline-none"
        />

        <button
          onClick={handleAdd}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Zahlung erfassen
        </button>
      </div>
    </div>
  );
}