'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CapacityData } from '@/types/calendar';

interface CapacityChartProps {
  data: CapacityData[];
}

export default function CapacityChart({ data }: CapacityChartProps) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-white font-semibold mb-4">Kapazitätsauslastung (Wochen)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="week" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }} />
          <Bar dataKey="totalCapacity" fill="#3b82f6" name="Gesamtkapazität (h)" />
          <Bar dataKey="usedCapacity" fill="#f59e0b" name="Genutzte Kapazität (h)" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div><p className="text-gray-400 text-xs">Ø Auslastung</p><p className="text-white text-lg font-bold">{(data.reduce((s, d) => s + d.utilizationPercent, 0) / data.length).toFixed(1)}%</p></div>
        <div><p className="text-gray-400 text-xs">Freie Kapazität</p><p className="text-white text-lg font-bold">{data.reduce((s, d) => s + d.freeCapacity, 0)} h</p></div>
        <div><p className="text-gray-400 text-xs">Gesamtkapazität</p><p className="text-white text-lg font-bold">{data.reduce((s, d) => s + d.totalCapacity, 0)} h</p></div>
      </div>
    </div>
  );
}