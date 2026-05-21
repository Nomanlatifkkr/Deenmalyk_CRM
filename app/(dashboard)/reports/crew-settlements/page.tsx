'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Users, Euro, Calculator, FileText, Clock } from 'lucide-react';

const settlements = [
  {
    id: 'SET-001',
    crew: 'Estrich Team A',
    period: 'KW 21 (20.05 - 26.05)',
    hours: 185,
    rate: 45,
    amount: 8325,
    area: 1240,
    ratePerSqm: 6.71,
    status: 'pending',
  },
  {
    id: 'SET-002',
    crew: 'Estrich Team B',
    period: 'KW 21 (20.05 - 26.05)',
    hours: 158,
    rate: 42,
    amount: 6636,
    area: 980,
    ratePerSqm: 6.77,
    status: 'approved',
  },
  {
    id: 'SET-003',
    crew: 'Heizung Team',
    period: 'KW 21 (20.05 - 26.05)',
    hours: 210,
    rate: 55,
    amount: 11550,
    area: null,
    ratePerSqm: null,
    status: 'pending',
  },
];

const summary = {
  totalAmount: 26511,
  totalHours: 553,
  totalArea: 2220,
  avgHourlyRate: 47.94,
  pendingAmount: 19875,
  approvedAmount: 6636,
};

export default function CrewSettlementsPage() {
  const [period, setPeriod] = useState('week');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/reports">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Team-Abrechnungen</h1>
          <p className="text-gray-400 mt-1">Vorbereitung für Lohnabrechnung und Subunternehmer</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-sm">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-4">
          <Euro className="h-5 w-5 text-green-400 mb-1" />
          <p className="text-xs text-gray-400">Gesamtbetrag</p>
          <p className="text-xl font-bold text-white">€{summary.totalAmount.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <Clock className="h-5 w-5 text-blue-400 mb-1" />
          <p className="text-xs text-gray-400">Gesamtstunden</p>
          <p className="text-xl font-bold text-white">{summary.totalHours}</p>
        </div>
        <div className="glass-card p-4">
          <Calculator className="h-5 w-5 text-purple-400 mb-1" />
          <p className="text-xs text-gray-400">Ø Stundensatz</p>
          <p className="text-xl font-bold text-white">€{summary.avgHourlyRate.toFixed(2)}</p>
        </div>
        <div className="glass-card p-4">
          <FileText className="h-5 w-5 text-yellow-400 mb-1" />
          <p className="text-xs text-gray-400">Offene Abrechnungen</p>
          <p className="text-xl font-bold text-white">€{summary.pendingAmount.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <Users className="h-5 w-5 text-cyan-400 mb-1" />
          <p className="text-xs text-gray-400">Fläche (Estrich)</p>
          <p className="text-xl font-bold text-white">{summary.totalArea} m²</p>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="glass-card overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Abrechnungen KW 21</h3>
          <button className="text-xs text-blue-400 hover:text-blue-300">Vorperiode anzeigen</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Team</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Zeitraum</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Stunden</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Stundensatz</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Fläche (m²)</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Betrag</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Status</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Aktionen</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {settlements.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="px-6 py-3 text-white">{item.crew}</td>
                  <td className="px-6 py-3 text-gray-300 text-sm">{item.period}</td>
                  <td className="px-6 py-3 text-gray-300">{item.hours}</td>
                  <td className="px-6 py-3 text-gray-300">€{item.rate}/h</td>
                  <td className="px-6 py-3 text-gray-300">{item.area ? `${item.area} m²` : '—'}</td>
                  <td className="px-6 py-3 text-white font-medium">€{item.amount.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.status === 'approved' ? 'Freigegeben' : 'In Prüfung'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button className="text-blue-400 text-xs hover:underline">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
        <div className="p-4 border-t border-white/10 text-xs text-gray-400 text-right">
          Summe: €{summary.totalAmount.toLocaleString()} | Abrechnungen: {settlements.length}
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex justify-end gap-3">
        <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm">
          <FileText className="h-4 w-4" /> Lohnliste exportieren
        </button>
        <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm">
          <Download className="h-4 w-4" /> CSV Export
        </button>
      </div>
    </div>
  );
}