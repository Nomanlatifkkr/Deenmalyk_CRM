export interface AreaCost {
  area: string;           // e.g. "Stuttgart", "München", "Ulm"
  hourlyRate: number;     // € per hour
  dailyRate?: number;     // optional
  notes?: string;
}

export interface Crew {
  id: string;
  crewNumber: string;
  name: string;
  type: 'main' | 'sub';    // Hauptteam oder Subunternehmer
  contactPerson?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  areaCosts: AreaCost[];   // unterschiedliche Kosten je Einsatzgebiet
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CrewAssignment {
  id: string;
  crewId: string;
  crewName: string;
  orderId: string;
  orderNumber: string;
  subServiceId?: string;
  subServiceName?: string;
  projectName: string;
  date: string;
  hours: number;
  area: string;
  rate: number;
  total: number;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export interface CrewSettlement {
  id: string;
  crewId: string;
  crewName: string;
  period: string;        // e.g. "KW 21 (20.05 - 26.05)"
  totalHours: number;
  totalAmount: number;
  assignments: CrewAssignment[];
  status: 'pending' | 'approved' | 'paid';
}