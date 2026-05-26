'use client';
import { Offer } from '@/types/offer';

export default function OfferPreview({ offer }: { offer: Offer }) {
  const totalSubsidy = offer.subsidies.reduce((sum, s) => sum + s.amount, 0);
  const finalTotal = offer.totalGross - totalSubsidy;

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="border-b pb-4 mb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Angebot</h1>
          <p className="text-gray-500">Nr. {offer.offerNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Datum: {new Date(offer.createdAt).toLocaleDateString('de-DE')}</p>
          <p className="text-sm text-gray-500">Gültig bis: {new Date(offer.validUntil).toLocaleDateString('de-DE')}</p>
        </div>
      </div>

      {/* Customer */}
      <div className="mb-6">
        <p className="font-semibold">{offer.customerName}</p>
        <p className="text-sm text-gray-600">{offer.customerAddress || 'Adresse nicht hinterlegt'}</p>
      </div>

      {/* Services Table */}
      <h2 className="font-semibold text-lg mb-2">Leistungen</h2>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2">Leistung</th>
            <th className="text-right py-2">Menge</th>
            <th className="text-right py-2">Preis</th>
            <th className="text-right py-2">Gesamt</th>
          </tr>
        </thead>
        <tbody>
          {offer.services.map((service) => (
            <tr key={service.id} className="border-b border-gray-200">
              <td className="py-2">
                {service.serviceName}
                {service.description && <div className="text-xs text-gray-500">{service.description}</div>}
              </td>
              <td className="text-right py-2">{service.quantity} {service.unit}</td>
              <td className="text-right py-2">€{service.unitPrice.toFixed(2)}</td>
              <td className="text-right py-2">€{service.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-300">
            <td colSpan={3} className="text-right py-2 font-semibold">Netto:</td>
            <td className="text-right py-2">€{offer.totalNet.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="text-right py-2">MwSt. ({offer.taxRate}%):</td>
            <td className="text-right py-2">€{(offer.totalNet * offer.taxRate / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="text-right py-2 font-bold">Brutto:</td>
            <td className="text-right py-2 font-bold">€{offer.totalGross.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      {/* Subsidies */}
      {offer.subsidies.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Förderungen / Abzüge</h3>
          {offer.subsidies.map((sub, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{sub.name}</span>
              <span className="text-green-700">- €{sub.amount.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2 pt-2 border-t border-blue-200">
            <span>Endbetrag (nach Förderung)</span>
            <span>€{finalTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Notes */}
      {offer.notes && (
        <div className="text-sm text-gray-600 mt-4 border-t pt-4">
          <p className="font-semibold">Anmerkungen:</p>
          <p>{offer.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t">
        <p>Vielen Dank für Ihr Interesse!</p>
        <p>Dieses Angebot wurde automatisch erstellt und ist rechtsverbindlich.</p>
      </div>
    </div>
  );
}