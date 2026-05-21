export interface Appointment {
  id: string;
  title: string;
  orderId?: string;
  orderNumber?: string;
  customerName?: string;
  crewId: string;
  crewName: string;
  start: string;      // ISO datetime
  end: string;        // ISO datetime
  allDay?: boolean;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  location?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  location: string;
  status: string;
  scheduledStart: string | null;
  scheduledEnd: string | null;
  assignedCrewId: string | null;
  assignedCrewName: string | null;
  subServices: any[];
}

export interface Crew {
  id: string;
  name: string;
  color: string;
}

export interface CapacityData {
  week: string;
  totalCapacity: number;
  usedCapacity: number;
  freeCapacity: number;
  utilizationPercent: number;
}

export interface CrewAvailability {
  crewId: string;
  crewName: string;
  date: string;
  hoursAvailable: number;
  hoursAssigned: number;
  appointments: Appointment[];
}