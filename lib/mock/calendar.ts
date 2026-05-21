import { Appointment, Order, Crew, CapacityData, CrewAvailability } from '@/types/calendar';

// ---------- Mock Orders (source of truth) ----------
export const mockOrders: Order[] = [
  {
    id: 'ord1',
    orderNumber: 'SC-2412',
    customerName: 'ABC Construction GmbH',
    location: 'Stuttgart, Industriestr. 12',
    status: 'in_progress',
    scheduledStart: '2024-05-20T08:00:00',
    scheduledEnd: '2024-05-21T17:00:00',
    assignedCrewId: '1',
    assignedCrewName: 'Estrich Team A',
    subServices: [
      { id: 'ss1', name: 'Estrich verlegen EG', durationHours: 8, status: 'scheduled' },
      { id: 'ss2', name: 'Estrich verlegen OG', durationHours: 8, status: 'scheduled' },
    ],
  },
  {
    id: 'ord2',
    orderNumber: 'SC-2415',
    customerName: 'Bauwerk AG',
    location: 'München, Marienplatz 8',
    status: 'in_progress',
    scheduledStart: '2024-05-22T09:00:00',
    scheduledEnd: '2024-05-24T17:00:00',
    assignedCrewId: '3',
    assignedCrewName: 'Heizung Team Süd',
    subServices: [{ id: 'ss3', name: 'Heizungsinstallation', durationHours: 24, status: 'in_progress' }],
  },
  {
    id: 'ord3',
    orderNumber: 'SC-2420',
    customerName: 'Wohnbau Stuttgart',
    location: 'Stuttgart, Hauptstr. 5',
    status: 'planning',
    scheduledStart: null,
    scheduledEnd: null,
    assignedCrewId: null,
    assignedCrewName: null,
    subServices: [],
  },
];

// ---------- Mock Crews ----------
export const mockCrews: Crew[] = [
  { id: '1', name: 'Estrich Team A', color: '#3b82f6' },
  { id: '2', name: 'Estrich Team B', color: '#10b981' },
  { id: '3', name: 'Heizung Team Süd', color: '#f59e0b' },
];

// ---------- Helper: Generate Appointments from Orders ----------
export function generateAppointmentsFromOrders(): Appointment[] {
  const appointments: Appointment[] = [];
  for (const order of mockOrders) {
    if (order.scheduledStart && order.scheduledEnd) {
      appointments.push({
        id: `app-${order.id}`,
        title: order.orderNumber,
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        crewId: order.assignedCrewId || '',
        crewName: order.assignedCrewName || '',
        start: order.scheduledStart,
        end: order.scheduledEnd,
        status: order.status === 'completed' ? 'completed' : order.status === 'planning' ? 'scheduled' : 'in_progress',
        location: order.location,
        allDay: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

// In‑memory appointments (regenerated on each fetch to stay in sync with orders)
let cachedAppointments = generateAppointmentsFromOrders();

export function refreshAppointments() {
  cachedAppointments = generateAppointmentsFromOrders();
}

// ---------- Mock Capacity Data ----------
export const mockCapacityData: CapacityData[] = [
  { week: 'KW 19', totalCapacity: 380, usedCapacity: 365, freeCapacity: 15, utilizationPercent: 96 },
  { week: 'KW 20', totalCapacity: 400, usedCapacity: 388, freeCapacity: 12, utilizationPercent: 97 },
  { week: 'KW 21', totalCapacity: 420, usedCapacity: 402, freeCapacity: 18, utilizationPercent: 95.7 },
  { week: 'KW 22', totalCapacity: 410, usedCapacity: 395, freeCapacity: 15, utilizationPercent: 96.3 },
  { week: 'KW 23', totalCapacity: 430, usedCapacity: 412, freeCapacity: 18, utilizationPercent: 95.8 },
];

// ---------- Mock Crew Availability ----------
export const mockCrewAvailability: CrewAvailability[] = [
  {
    crewId: '1',
    crewName: 'Estrich Team A',
    date: '2024-05-20',
    hoursAvailable: 8,
    hoursAssigned: 8,
    appointments: cachedAppointments.filter(a => a.crewId === '1' && a.start.startsWith('2024-05-20')),
  },
  {
    crewId: '1',
    crewName: 'Estrich Team A',
    date: '2024-05-21',
    hoursAvailable: 8,
    hoursAssigned: 8,
    appointments: cachedAppointments.filter(a => a.crewId === '1' && a.start.startsWith('2024-05-21')),
  },
  {
    crewId: '3',
    crewName: 'Heizung Team Süd',
    date: '2024-05-22',
    hoursAvailable: 8,
    hoursAssigned: 8,
    appointments: cachedAppointments.filter(a => a.crewId === '3' && a.start.startsWith('2024-05-22')),
  },
];

// ---------- API‑style Functions ----------
export const fetchAppointments = async (): Promise<Appointment[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...cachedAppointments];
};

export const fetchAppointment = async (id: string): Promise<Appointment | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return cachedAppointments.find(a => a.id === id);
};

export const updateAppointment = async (id: string, data: Partial<Appointment>): Promise<Appointment> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = cachedAppointments.findIndex(a => a.id === id);
  if (index === -1) throw new Error('Appointment not found');
  const updated = { ...cachedAppointments[index], ...data, updatedAt: new Date().toISOString() };
  cachedAppointments[index] = updated;

  // Also update the corresponding order
  const orderId = updated.orderId;
  const order = mockOrders.find(o => o.id === orderId);
  if (order) {
    if (data.start) order.scheduledStart = data.start;
    if (data.end) order.scheduledEnd = data.end;
    if (data.crewId) {
      order.assignedCrewId = data.crewId;
      order.assignedCrewName = mockCrews.find(c => c.id === data.crewId)?.name || '';
    }
    if (data.status) {
      order.status = data.status === 'completed' ? 'completed' : data.status === 'in_progress' ? 'in_progress' : 'planning';
    }
  }
  return updated;
};

export const createAppointmentFromOrder = async (orderId: string): Promise<Appointment> => {
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) throw new Error('Order not found');
  const newApp: Appointment = {
    id: `app-${orderId}`,
    title: order.orderNumber,
    orderId: order.id,
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    crewId: order.assignedCrewId || '',
    crewName: order.assignedCrewName || '',
    start: order.scheduledStart || new Date().toISOString(),
    end: order.scheduledEnd || new Date(Date.now() + 8 * 3600000).toISOString(),
    status: order.status === 'completed' ? 'completed' : order.status === 'in_progress' ? 'in_progress' : 'scheduled',
    location: order.location,
    allDay: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  cachedAppointments.push(newApp);
  return newApp;
};

export const fetchCrews = async (): Promise<Crew[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return [...mockCrews];
};

export const fetchCrewAvailability = async (crewId?: string, date?: string): Promise<CrewAvailability[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  let data = [...mockCrewAvailability];
  if (crewId) data = data.filter(c => c.crewId === crewId);
  if (date) data = data.filter(c => c.date === date);
  return data;
};

export const fetchCapacity = async (): Promise<CapacityData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockCapacityData];
};

// For the schedules page (list view)
export const mockCalendarEvents = cachedAppointments.map(app => ({
  id: app.id,
  title: app.title,
  orderNumber: app.orderNumber,
  customer: app.customerName,
  crew: app.crewName,
  crewColor: mockCrews.find(c => c.id === app.crewId)?.color || '#3b82f6',
  location: app.location,
  start: new Date(app.start),
  end: new Date(app.end),
}));