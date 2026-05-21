'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { mockOrders, createAppointmentFromOrder, refreshAppointments } from '@/lib/mock/calendar';

export default function AutoSchedulePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ scheduled: number; failed: number; details: string[] } | null>(null);

  const handleAutoSchedule = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const unscheduledOrders = mockOrders.filter(o => !o.scheduledStart);
    let scheduled = 0;
    const details: string[] = [];
    for (const order of unscheduledOrders) {
      try {
        // In a real app, use AI to pick optimal date/crew
        const newApp = await createAppointmentFromOrder(order.id);
        // Update order with dummy schedule
        order.scheduledStart = new Date().toISOString();
        order.scheduledEnd = new Date(Date.now() + 8 * 3600000).toISOString();
        order.assignedCrewId = '1';
        order.assignedCrewName = 'Estrich Team A';
        scheduled++;
        details.push(`Auftrag ${order.orderNumber} wurde für ${new Date().toLocaleDateString()} eingeplant (Team Estrich A)`);
      } catch (error) {
        details.push(`Auftrag ${order.orderNumber} konnte nicht eingeplant werden`);
      }
    }
    refreshAppointments(); // Sync appointments cache
    setResult({ scheduled, failed: unscheduledOrders.length - scheduled, details });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/calendar">
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Automatische Planung</h1>
          <p className="text-gray-400 mt-1">KI-gestützte Terminplanung für offene Aufträge</p>
        </div>
      </div>
      <div className="glass-card p-6 text-center">
        <p className="text-gray-300 mb-4">Lassen Sie offene Aufträge automatisch in den Kalender einplanen – basierend auf Teamkapazitäten und Prioritäten.</p>
        <button onClick={handleAutoSchedule} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 mx-auto">
          <Zap className="h-5 w-5" /> {loading ? 'Wird geplant...' : 'Planung starten'}
        </button>
      </div>
      {result && (
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-3"><CheckCircle className="h-6 w-6 text-green-400" /><span className="text-white font-semibold">{result.scheduled} Aufträge erfolgreich geplant</span></div>
          {result.failed > 0 && <div className="flex items-center gap-3 mb-3"><AlertCircle className="h-6 w-6 text-yellow-400" /><span className="text-white">{result.failed} Aufträge konnten nicht geplant werden</span></div>}
          <ul className="space-y-1 text-sm text-gray-300">{result.details.map((d, i) => <li key={i}>• {d}</li>)}</ul>
        </div>
      )}
    </div>
  );
}