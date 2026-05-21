'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, MapPin, Calendar, ArrowRight, Filter } from 'lucide-react';
import { mockCalendarEvents } from '@/lib/mock/calendar';

export default function SchedulesPage() {
  const [selectedCrew, setSelectedCrew] = useState<string>('all');
  const crews = ['all', ...new Set(mockCalendarEvents.map(e => e.crew))];
  const filteredEvents = selectedCrew === 'all' ? mockCalendarEvents : mockCalendarEvents.filter(e => e.crew === selectedCrew);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Zeitplan</h1>
          <p className="text-gray-400 mt-1">Alle geplanten Aufträge und Termine im Überblick</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <select
              value={selectedCrew}
              onChange={(e) => setSelectedCrew(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
            >
              {crews.map(crew => <option key={crew} value={crew}>{crew === 'all' ? 'Alle Teams' : crew}</option>)}
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-white">
            <Calendar className="h-4 w-4" /> Exportieren
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/10 bg-white/5"><h2 className="text-white font-semibold">Nächste Termine</h2></div>
        <div className="divide-y divide-white/10">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/calendar/appointment/${event.id}`}>
              <div className="p-5 hover:bg-white/5 cursor-pointer transition-all group" style={{ borderLeft: `4px solid ${event.crewColor}` }}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  <div className="w-28 flex-shrink-0">
                    <div className="text-xs text-gray-400">Datum</div>
                    <div className="text-xl font-bold text-white">{event.start.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</div>
                    <div className="text-xs text-gray-500">{event.start.toLocaleDateString('de-DE', { weekday: 'long' })}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition">{event.title}</h3>
                      <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded-full text-gray-300">{event.orderNumber}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{event.customer}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-xs text-gray-300">
                      <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{event.start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} – {event.end.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
                      <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{event.crew}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 group-hover:text-white transition"><ArrowRight className="h-4 w-4" /></div>
                </div>
              </div>
            </Link>
          ))}
          {filteredEvents.length === 0 && <div className="text-center py-12 text-gray-400">Keine Termine gefunden</div>}
        </div>
      </div>
    </div>
  );
}