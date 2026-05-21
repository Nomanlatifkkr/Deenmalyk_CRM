'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Calendar, Users, Clock } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const weeklyCapacity = [
  { week: 'KW 19', planned: 380, actual: 365, utilization: 96 },
  { week: 'KW 20', planned: 400, actual: 388, utilization: 97 },
  { week: 'KW 21', planned: 420, actual: 402, utilization: 95.7 },
  { week: 'KW 22', planned: 410, actual: 395, utilization: 96.3 },
  { week: 'KW 23', planned: 430, actual: 412, utilization: 95.8 },
];

const crewCapacity = [
  { crew: 'Estrich Team A', capacity: 200, utilized: 185, available: 15 },
  { crew: 'Estrich Team B', capacity: 160, utilized: 158, available: 2 },
  { crew: 'Heizung Team', capacity: 240, utilized: 210, available: 30 },
  { crew: 'Elektro Team', capacity: 120, utilized: 98, available: 22 },
];

const currentCapacity = {
  totalHours: 1680,
  utilizedHours: 1560,
  availableHours: 120,
  utilizationRate: 92.9,
  openOrders: 42,
  estimatedRequired: 380,
};

export default function CapacityReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/reports">
          <button className="p-2 glass rounded-lg hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Kapazitätsplanung</h1>
          <p className="text-gray-400 mt-1">Auslastung und freie Kapazitäten</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-sm">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <Clock className="h-5 w-5 text-blue-400 mb-2" />
          <p className="text-xs text-gray-400">Kapazität (Std)</p>
          <p className="text-xl font-bold text-white">{currentCapacity.totalHours}</p>
        </div>
        <div className="glass-card p-4">
          <Users className="h-5 w-5 text-green-400 mb-2" />
          <p className="text-xs text-gray-400">Ausgelastet</p>
          <p className="text-xl font-bold text-white">{currentCapacity.utilizedHours}</p>
        </div>
        <div className="glass-card p-4">
          <Calendar className="h-5 w-5 text-yellow-400 mb-2" />
          <p className="text-xs text-gray-400">Frei</p>
          <p className="text-xl font-bold text-white">{currentCapacity.availableHours}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-gray-400">Auslastung</p>
          <p className="text-xl font-bold text-white">{currentCapacity.utilizationRate}%</p>
        </div>
      </div>

      {/* Weekly Capacity Chart */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Wöchentliche Kapazität (Stunden)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyCapacity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="week" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Bar dataKey="planned" fill="#3b82f6" name="Geplant" />
            <Bar dataKey="actual" fill="#22c55e" name="Tatsächlich" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Crew Capacity Table */}
      <div className="glass-card overflow-hidden">
        <h3 className="text-white font-semibold p-5 pb-0">Kapazität nach Teams</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Team</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Kapazität (Std)</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Ausgelastet</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Frei</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400">Auslastung</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {crewCapacity.map((crew, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="px-6 py-3 text-white">{crew.crew}</td>
                  <td className="px-6 py-3 text-gray-300">{crew.capacity}</td>
                  <td className="px-6 py-3 text-gray-300">{crew.utilized}</td>
                  <td className="px-6 py-3 text-green-400">{crew.available}</td>
                  <td className="px-6 py-3">
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(crew.utilized / crew.capacity) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>

      {/* Utilization Gauge */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold mb-4">Gesamtauslastung</h3>
        <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium z-10">
            {currentCapacity.utilizationRate}% ausgelastet
          </div>
          <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" style={{ width: `${currentCapacity.utilizationRate}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Basierend auf {currentCapacity.totalHours} verfügbaren Stunden in dieser Woche
        </p>
      </div>
    </div>
  );
}