'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchAppointments, fetchCrews, updateAppointment } from '@/lib/mock/calendar';
import CrewView from '@/components/calendar/CrewView';
import AppointmentDetailsModal from '@/components/calendar/AppointmentDetailsModal';
import { Appointment, Crew } from '@/types/calendar';

export default function CrewCalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const [apps, crewsData] = await Promise.all([fetchAppointments(), fetchCrews()]);
    setAppointments(apps);
    setCrews(crewsData);
    setLoading(false);
  };

  const handleAppointmentClick = (app: Appointment) => {
    setSelectedApp(app);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Appointment>) => {
    if (selectedApp) {
      const updated = await updateAppointment(selectedApp.id, data);
      setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
    }
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/calendar">
          <button className="p-2 glass rounded-lg hover:bg-white/10"><ArrowLeft className="h-5 w-5 text-gray-400" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Team-Kalender</h1>
          <p className="text-gray-400">Auslastung pro Team und Tag</p>
        </div>
      </div>
      <CrewView appointments={appointments} crews={crews} onAppointmentClick={handleAppointmentClick} />
      <AppointmentDetailsModal
        isOpen={modalOpen}
        appointment={selectedApp}
        crews={crews}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}