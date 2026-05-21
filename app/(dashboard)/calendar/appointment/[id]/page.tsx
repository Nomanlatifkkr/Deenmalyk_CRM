'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAppointment, fetchCrews, updateAppointment } from '@/lib/mock/calendar';
import AppointmentDetailsModal from '@/components/calendar/AppointmentDetailsModal';
import { Appointment, Crew } from '@/types/calendar';

export default function AppointmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const [app, crewsData] = await Promise.all([fetchAppointment(id), fetchCrews()]);
    setAppointment(app || null);
    setCrews(crewsData);
    setLoading(false);
  };

  const handleSave = async (data: Partial<Appointment>) => {
    if (appointment) {
      await updateAppointment(appointment.id, data);
      router.push('/calendar');
    }
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" /></div>;
  if (!appointment) return <div className="text-center py-12">Termin nicht gefunden</div>;

  return (
    <AppointmentDetailsModal
      isOpen={true}
      appointment={appointment}
      crews={crews}
      onClose={() => router.push('/calendar')}
      onSave={handleSave}
    />
  );
}