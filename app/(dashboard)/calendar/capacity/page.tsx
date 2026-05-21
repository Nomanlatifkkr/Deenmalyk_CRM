'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchCapacity } from '@/lib/mock/calendar';
import CapacityChart from '@/components/calendar/CapacityChart';
import { CapacityData } from '@/types/calendar';

export default function CapacityPage() {
  const [data, setData] = useState<CapacityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const d = await fetchCapacity();
    setData(d);
    setLoading(false);
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/calendar">
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Kapazitätsplanung</h1>
          <p className="text-gray-400 mt-1">Wöchentliche Auslastungsübersicht</p>
        </div>
      </div>
      <CapacityChart data={data} />
    </div>
  );
}