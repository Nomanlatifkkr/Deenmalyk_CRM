// app/(dashboard)/calendar/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAppointments, fetchCrews, updateAppointment } from '@/lib/mock/calendar';
import FullCalendarView from '@/components/calendar/FullCalendarView';
import AppointmentDetailsModal from '@/components/calendar/AppointmentDetailsModal';
import { Calendar, Users, List, BarChart3, Zap } from 'lucide-react';

export default function CalendarPage() {
  const [appointments, setAppointments] = useState([]);
  const [crews, setCrews] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => {
    const [apps, crewsData] = await Promise.all([fetchAppointments(), fetchCrews()]);
    setAppointments(apps);
    setCrews(crewsData);
    setLoading(false);
  };
  const handleEventDrop = async (info) => {
    const updated = await updateAppointment(info.event.id, { start: info.event.start.toISOString(), end: info.event.end.toISOString() });
    setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
  };
  const handleEventResize = async (info) => {
    const updated = await updateAppointment(info.event.id, { end: info.event.end.toISOString() });
    setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
  };
  const handleEventClick = (info) => {
    const app = appointments.find(a => a.id === info.event.id);
    if (app) { setSelectedApp(app); setModalOpen(true); }
  };
  const handleSave = async (data) => {
    if (selectedApp) {
      const updated = await updateAppointment(selectedApp.id, data);
      setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
    }
  };
  if (loading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div><h1 className="text-2xl font-bold text-white">Kalender – Schedule View</h1><p className="text-gray-400">Drag & Drop zum Verschieben, Klick zum Bearbeiten</p></div>
        <div className="flex gap-2">
          <Link href="/calendar/crews"><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><Users className="h-4 w-4" /> Team-Ansicht</button></Link>
          <Link href="/calendar/schedules"><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><List className="h-4 w-4" /> Zeitplan</button></Link>
          <Link href="/calendar/capacity"><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><BarChart3 className="h-4 w-4" /> Kapazität</button></Link>
          <Link href="/calendar/auto-schedule"><button className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm"><Zap className="h-4 w-4" /> Auto‑Plan</button></Link>
        </div>
      </div>
      <FullCalendarView appointments={appointments} crews={crews} onEventDrop={handleEventDrop} onEventResize={handleEventResize} onEventClick={handleEventClick} />
      <AppointmentDetailsModal isOpen={modalOpen} appointment={selectedApp} crews={crews} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </div>
  );
}