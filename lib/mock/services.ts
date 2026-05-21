import { Service } from '@/types/service';

export const mockServices: Service[] = [
  {
    id: '1',
    serviceNumber: 'SV-1001',
    name: 'Heizungsinstallation',
    description: 'Komplette Heizungsinstallation inkl. Rohrleitung',
    category: 'Heizung',
    unit: 'm²',
    defaultPrice: 85.00,
    currency: 'EUR',
    taxRate: 19,
    notes: 'Preis pro Quadratmeter Wohnfläche',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
  },
  {
    id: '2',
    serviceNumber: 'SV-1002',
    name: 'Estrich verlegen',
    description: 'Zementestrich, inkl. Grundierung',
    category: 'Estrich',
    unit: 'm²',
    defaultPrice: 22.50,
    currency: 'EUR',
    taxRate: 19,
    notes: 'Mindestabnahme 20m²',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-05-10T10:00:00Z',
  },
  {
    id: '3',
    serviceNumber: 'SV-1003',
    name: 'Elektroinstallation Unterputz',
    description: 'Unterputzinstallation für Neubau',
    category: 'Elektro',
    unit: 'm²',
    defaultPrice: 45.00,
    currency: 'EUR',
    taxRate: 19,
    notes: 'Pro Quadratmeter Nutzfläche',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-05-05T10:00:00Z',
  },
  {
    id: '4',
    serviceNumber: 'SV-1004',
    name: 'Wärmepumpe installieren',
    description: 'Luft-Wasser-Wärmepumpe, 10kW',
    category: 'Heizung',
    unit: 'Stück',
    defaultPrice: 12500.00,
    currency: 'EUR',
    taxRate: 19,
    notes: 'Inkl. Inbetriebnahme',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
  },
  {
    id: '5',
    serviceNumber: 'SV-1005',
    name: 'Bodenheizung verlegen',
    description: 'Fußbodenheizung mit Verteiler',
    category: 'Heizung',
    unit: 'm²',
    defaultPrice: 65.00,
    currency: 'EUR',
    taxRate: 19,
    notes: '',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-05-12T10:00:00Z',
  },
];

export const fetchServices = async (): Promise<Service[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockServices]), 300));
};

export const fetchService = async (id: string): Promise<Service | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockServices.find(s => s.id === id);
};

export const createService = async (data: Omit<Service, 'id' | 'serviceNumber' | 'createdAt' | 'updatedAt'>): Promise<Service> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newService: Service = {
    ...data,
    id: Date.now().toString(),
    serviceNumber: `SV-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockServices.push(newService);
  return newService;
};

export const updateService = async (id: string, data: Partial<Service>): Promise<Service> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockServices.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Service not found');
  const updated = { ...mockServices[index], ...data, updatedAt: new Date().toISOString() };
  mockServices[index] = updated;
  return updated;
};

export const deleteService = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockServices.findIndex(s => s.id === id);
  if (index !== -1) mockServices.splice(index, 1);
};