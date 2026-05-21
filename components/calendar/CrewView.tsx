'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Appointment, Crew } from '@/types/calendar';

interface CrewViewProps {
  appointments: Appointment[];
  crews: Crew[];
  onAppointmentClick: (app: Appointment) => void;
}

export default function CrewView({ appointments, crews, onAppointmentClick }: CrewViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    start.setDate(start.getDate() + diff);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);
  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getAppointmentsForCrewAndDay = (crewId: string, date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(a => a.crewId === crewId && a.start.startsWith(dateStr));
  };

  return (
    <div className="glass-card p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button onClick={prevWeek} className="p-2 glass rounded-lg"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={nextWeek} className="p-2 glass rounded-lg"><ChevronRight className="h-5 w-5" /></button>
        </div>
        <div className="text-white font-semibold">
          {weekDays[0].toLocaleDateString('de-DE')} – {weekDays[6].toLocaleDateString('de-DE')}
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-2 text-gray-400">Team</th>
            {weekDays.map((day, idx) => (
              <th key={idx} className="text-center py-2 text-gray-400">
                {day.toLocaleDateString('de-DE', { weekday: 'short' })}<br />
                {day.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {crews.map(crew => (
            <tr key={crew.id} className="hover:bg-white/5">
              <td className="py-3 font-medium text-white">{crew.name}</td>
              {weekDays.map((day, idx) => {
                const apps = getAppointmentsForCrewAndDay(crew.id, day);
                const hasApp = apps.length > 0;
                return (
                  <td key={idx} className="text-center py-3">
                    {hasApp ? (
                      <button
                        onClick={() => onAppointmentClick(apps[0])}
                        className="text-xs px-2 py-1 rounded-full transition"
                        style={{ backgroundColor: `${crew.color}30`, color: crew.color }}
                      >
                        {apps.length} Termin{apps.length !== 1 ? 'e' : ''}
                      </button>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                   </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}