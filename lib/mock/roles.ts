import { Role } from '@/types/role';

export const mockRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Vollzugriff auf alle Module und Einstellungen',
    permissions: ['*'],
    isSystemRole: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Kunden, Aufträge, Rechnungen verwalten',
    permissions: ['customers:read', 'customers:write', 'orders:read', 'orders:write', 'invoices:read', 'invoices:write', 'offers:read', 'offers:write', 'materials:read', 'materials:write'],
    isSystemRole: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'dispatcher',
    name: 'Disponent',
    description: 'Aufträge planen und Teams zuweisen',
    permissions: ['orders:read', 'orders:write', 'calendar:read', 'calendar:write', 'crews:read', 'crews:write'],
    isSystemRole: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'crew',
    name: 'Mitarbeiter (Team)',
    description: 'Eigene Aufträge und Kalender einsehen',
    permissions: ['orders:read', 'crews:read', 'calendar:read'],
    isSystemRole: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'viewer',
    name: 'Nur Leser',
    description: 'Nur Lesezugriff auf Berichte',
    permissions: ['reports:read'],
    isSystemRole: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  // Custom role example
  {
    id: 'custom-1',
    name: 'Auftragsassistent',
    description: 'Kann Aufträge erstellen, aber nicht löschen',
    permissions: ['orders:read', 'orders:write'],
    isSystemRole: false,
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
  },
];

export const fetchRoles = async (): Promise<Role[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockRoles]), 300));
};

export const fetchRole = async (id: string): Promise<Role | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockRoles.find(r => r.id === id);
};

export const createRole = async (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'isSystemRole'>): Promise<Role> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newRole: Role = {
    ...data,
    id: `role-${Date.now()}`,
    isSystemRole: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockRoles.push(newRole);
  return newRole;
};

export const updateRole = async (id: string, data: Partial<Role>): Promise<Role> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockRoles.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Role not found');
  const updated = { ...mockRoles[index], ...data, updatedAt: new Date().toISOString() };
  mockRoles[index] = updated;
  return updated;
};

export const deleteRole = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const role = mockRoles.find(r => r.id === id);
  if (role?.isSystemRole) throw new Error('Systemrollen können nicht gelöscht werden');
  const index = mockRoles.findIndex(r => r.id === id);
  if (index !== -1) mockRoles.splice(index, 1);
};