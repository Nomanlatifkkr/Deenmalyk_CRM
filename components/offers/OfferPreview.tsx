'use client';

import { Offer } from '@/types/offer';

interface OfferPreviewProps {
  offer: Offer;
}

export default function OfferPreview({
  offer,
}: OfferPreviewProps) {
  // Safe fallback for subsidies
  const subsidies = offer.subsidies || [];

  // Calculate total subsidy
  const totalSubsidy = subsidies.reduce(
    (sum, subsidy) => sum + subsidy.amount,
    0
  );

  // Final total after subsidy
  const finalTotal =
    (offer.totalGross || 0) - totalSubsidy;

  return (
    <div
      className="mx-auto max-w-4xl rounded-lg bg-white p-8 text-gray-800 shadow-lg"
      style={{
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-end justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Angebot
          </h1>

          <p className="text-gray-500">
            Nr. {offer.offerNumber}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Datum:{' '}
            {new Date(
              offer.createdAt
            ).toLocaleDateString('de-DE')}
          </p>

          <p className="text-sm text-gray-500">
            Gültig bis:{' '}
            {new Date(
              offer.validUntil
            ).toLocaleDateString('de-DE')}
          </p>
        </div>
      </div>

      {/* Customer */}
      <div className="mb-8">
        <p className="font-semibold text-gray-800">
          {offer.customerName}
        </p>

        <p className="text-sm text-gray-600">
          {offer.customerAddress ||
            'Adresse nicht hinterlegt'}
        </p>
      </div>

      {/* Services */}
      <div className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">
          Leistungen
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 text-left">
                  Leistung
                </th>

                <th className="py-2 text-right">
                  Menge
                </th>

                <th className="py-2 text-right">
                  Preis
                </th>

                <th className="py-2 text-right">
                  Gesamt
                </th>
              </tr>
            </thead>

            <tbody>
              {offer.services?.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-gray-200"
                >
                  <td className="py-3">
                    <div className="font-medium">
                      {service.serviceName}
                    </div>

                    {service.description && (
                      <div className="text-xs text-gray-500">
                        {service.description}
                      </div>
                    )}
                  </td>

                  <td className="py-3 text-right">
                    {service.quantity}{' '}
                    {service.unit}
                  </td>

                  <td className="py-3 text-right">
                    €
                    {service.unitPrice.toFixed(2)}
                  </td>

                  <td className="py-3 text-right font-medium">
                    €
                    {service.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t border-gray-300">
                <td
                  colSpan={3}
                  className="py-2 text-right font-semibold"
                >
                  Netto:
                </td>

                <td className="py-2 text-right">
                  €
                  {offer.totalNet.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td
                  colSpan={3}
                  className="py-2 text-right"
                >
                  MwSt. ({offer.taxRate}%):
                </td>

                <td className="py-2 text-right">
                  €
                  {(
                    (offer.totalNet *
                      offer.taxRate) /
                    100
                  ).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td
                  colSpan={3}
                  className="py-2 text-right text-lg font-bold"
                >
                  Brutto:
                </td>

                <td className="py-2 text-right text-lg font-bold">
                  €
                  {offer.totalGross.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Subsidies */}
      {subsidies.length > 0 && (
        <div className="mb-8 rounded-lg bg-blue-50 p-4">
          <h3 className="mb-3 font-semibold text-blue-800">
            Förderungen / Abzüge
          </h3>

          <div className="space-y-2">
            {subsidies.map((subsidy, index) => (
              <div
                key={index}
                className="flex justify-between text-sm"
              >
                <span>{subsidy.name}</span>

                <span className="font-medium text-green-700">
                  - €
                  {subsidy.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between border-t border-blue-200 pt-3 font-bold">
            <span>
              Endbetrag (nach Förderung)
            </span>

            <span>
              €{finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Notes */}
      {offer.notes && (
        <div className="mt-6 border-t pt-4 text-sm text-gray-600">
          <p className="mb-1 font-semibold">
            Anmerkungen:
          </p>

          <p>{offer.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-10 border-t pt-5 text-center text-xs text-gray-500">
        <p>
          Vielen Dank für Ihr Interesse!
        </p>

        <p className="mt-1">
          Dieses Angebot wurde automatisch erstellt
          und ist rechtsverbindlich.
        </p>
      </div>
    </div>
  );
}