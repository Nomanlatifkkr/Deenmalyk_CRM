'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointment, Crew } from '@/types/calendar';

interface FullCalendarViewProps {
  appointments: Appointment[];
  crews: Crew[];
  onEventDrop: (info: any) => Promise<void>;
  onEventResize: (info: any) => Promise<void>;
  onEventClick: (info: any) => void;
  initialView?: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
}

export default function FullCalendarView({
  appointments,
  crews,
  onEventDrop,
  onEventResize,
  onEventClick,
  initialView = 'timeGridWeek',
}: FullCalendarViewProps) {
  const events = appointments.map(app => ({
    id: app.id,
    title: `${app.title} - ${app.crewName}`,
    start: app.start,
    end: app.end,
    backgroundColor: crews.find(c => c.id === app.crewId)?.color || '#3b82f6',
    borderColor: crews.find(c => c.id === app.crewId)?.color || '#3b82f6',
    extendedProps: {
      orderId: app.orderId,
      orderNumber: app.orderNumber,
      customerName: app.customerName,
      crewName: app.crewName,
      status: app.status,
      location: app.location,
    },
  }));

  return (
    <div className="glass-card p-3">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView={initialView}
        events={events}
        editable={true}
        droppable={true}
        eventDrop={onEventDrop}
        eventResize={onEventResize}
        eventClick={onEventClick}
        height="auto"
        slotMinTime="06:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        locale="de"
        buttonText={{
          today: 'Heute',
          month: 'Monat',
          week: 'Woche',
          day: 'Tag',
        }}
      />
    </div>
  );
}