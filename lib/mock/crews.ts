import { Crew, AreaCost, CrewAssignment, CrewSettlement } from '@/types/crew';

export const mockCrews: Crew[] = [
  {
    id: '1',
    crewNumber: 'C-1001',
    name: 'Estrich Team A',
    type: 'main',
    contactPerson: 'Herr Müller',
    phone: '+49 711 1234567',
    email: 'team-a@crmsystem.de',
    isActive: true,
    areaCosts: [
      { area: 'Stuttgart', hourlyRate: 45, notes: 'Standard' },
      { area: 'München', hourlyRate: 48, notes: 'Anfahrt extra' },
      { area: 'Ulm', hourlyRate: 46, notes: '' },
    ],
    notes: 'Spezialisiert auf Zementestrich',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
  },
  {
    id: '2',
    crewNumber: 'C-1002',
    name: 'Estrich Team B',
    type: 'main',
    contactPerson: 'Frau Schmidt',
    phone: '+49 711 1234568',
    email: 'team-b@crmsystem.de',
    isActive: true,
    areaCosts: [
      { area: 'Stuttgart', hourlyRate: 42 },
      { area: 'München', hourlyRate: 45 },
    ],
    notes: 'Fließestrich Spezialisten',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-05-10T10:00:00Z',
  },
  {
    id: '3',
    crewNumber: 'C-1003',
    name: 'Heizung Team Süd',
    type: 'main',
    contactPerson: 'Herr Weber',
    phone: '+49 89 9876543',
    email: 'heizung@crmsystem.de',
    isActive: true,
    areaCosts: [
      { area: 'München', hourlyRate: 55 },
      { area: 'Augsburg', hourlyRate: 52 },
    ],
    notes: 'Heizungsinstallation & Wärmepumpen',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
  },
  {
    id: '4',
    crewNumber: 'C-1004',
    name: 'Elektro Team Nord',
    type: 'main',
    contactPerson: 'Herr Fischer',
    phone: '+49 731 1122334',
    email: 'elektro@crmsystem.de',
    isActive: false,
    areaCosts: [{ area: 'Ulm', hourlyRate: 50 }],
    notes: 'Derzeit nicht verfügbar',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
  },
];

// Mock assignments (from orders/sub-services)
export const mockAssignments: CrewAssignment[] = [
  {
    id: 'a1',
    crewId: '1',
    crewName: 'Estrich Team A',
    orderId: 'ord1',
    orderNumber: 'SC-2412',
    subServiceId: 'ss1',
    subServiceName: 'Estrich verlegen EG',
    projectName: 'Bürogebäude Stuttgart',
    date: '2024-05-20',
    hours: 40,
    area: 'Stuttgart',
    rate: 45,
    total: 1800,
    status: 'scheduled',
  },
  {
    id: 'a2',
    crewId: '1',
    crewName: 'Estrich Team A',
    orderId: 'ord1',
    orderNumber: 'SC-2412',
    subServiceId: 'ss2',
    subServiceName: 'Estrich verlegen OG',
    projectName: 'Bürogebäude Stuttgart',
    date: '2024-05-21',
    hours: 35,
    area: 'Stuttgart',
    rate: 45,
    total: 1575,
    status: 'scheduled',
  },
  {
    id: 'a3',
    crewId: '2',
    crewName: 'Estrich Team B',
    orderId: 'ord2',
    orderNumber: 'SC-2415',
    projectName: 'Wohnanlage München',
    date: '2024-05-22',
    hours: 60,
    area: 'München',
    rate: 45,
    total: 2700,
    status: 'in_progress',
  },
];

export const mockSettlements: CrewSettlement[] = [
  {
    id: 'set1',
    crewId: '1',
    crewName: 'Estrich Team A',
    period: 'KW 21 (20.05 - 26.05)',
    totalHours: 75,
    totalAmount: 3375,
    assignments: mockAssignments.filter(a => a.crewId === '1'),
    status: 'pending',
  },
  {
    id: 'set2',
    crewId: '2',
    crewName: 'Estrich Team B',
    period: 'KW 21 (20.05 - 26.05)',
    totalHours: 60,
    totalAmount: 2700,
    assignments: mockAssignments.filter(a => a.crewId === '2'),
    status: 'approved',
  },
];

export const fetchCrews = async (): Promise<Crew[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockCrews];
};

export const fetchCrew = async (id: string): Promise<Crew | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockCrews.find(c => c.id === id);
};

export const createCrew = async (data: Omit<Crew, 'id' | 'crewNumber' | 'createdAt' | 'updatedAt'>): Promise<Crew> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newCrew: Crew = {
    ...data,
    id: Date.now().toString(),
    crewNumber: `C-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockCrews.push(newCrew);
  return newCrew;
};

export const updateCrew = async (id: string, data: Partial<Crew>): Promise<Crew> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockCrews.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Crew not found');
  const updated = { ...mockCrews[index], ...data, updatedAt: new Date().toISOString() };
  mockCrews[index] = updated;
  return updated;
};

export const deleteCrew = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockCrews.findIndex(c => c.id === id);
  if (index !== -1) mockCrews.splice(index, 1);
};

export const fetchCrewAssignments = async (crewId: string): Promise<CrewAssignment[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAssignments.filter(a => a.crewId === crewId);
};

export const fetchCrewSettlements = async (crewId?: string): Promise<CrewSettlement[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (crewId) return mockSettlements.filter(s => s.crewId === crewId);
  return [...mockSettlements];
};

export const approveSettlement = async (settlementId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockSettlements.findIndex(s => s.id === settlementId);
  if (index !== -1) mockSettlements[index].status = 'approved';
};