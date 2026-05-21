import { User, RoleDefinition } from '@/types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@crmsystem.de',
    firstName: 'Max',
    lastName: 'Mustermann',
    role: 'admin',
    isActive: true,
    lastLogin: '2024-05-20T08:00:00Z',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-05-20T08:00:00Z',
    permissions: ['*'], // wildcard = all permissions
  },
  {
    id: '2',
    email: 'manager@crmsystem.de',
    firstName: 'Anna',
    lastName: 'Schmidt',
    role: 'manager',
    isActive: true,
    lastLogin: '2024-05-19T09:30:00Z',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-05-19T09:30:00Z',
    permissions: ['customers:read', 'customers:write', 'orders:read', 'orders:write', 'invoices:read', 'invoices:write'],
  },
  {
    id: '3',
    email: 'dispatcher@crmsystem.de',
    firstName: 'Tom',
    lastName: 'Bauer',
    role: 'dispatcher',
    isActive: true,
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-05-18T14:00:00Z',
    permissions: ['orders:read', 'orders:write', 'calendar:read', 'calendar:write', 'crews:read'],
  },
  {
    id: '4',
    email: 'crew@crmsystem.de',
    firstName: 'Jonas',
    lastName: 'Fischer',
    role: 'crew',
    isActive: true,
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-05-17T11:00:00Z',
    permissions: ['orders:read', 'crews:read', 'calendar:read'],
  },
];

export const roleDefinitions: RoleDefinition[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Vollzugriff auf alle Module und Einstellungen',
    permissions: ['*'],
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Kunden, Aufträge, Rechnungen verwalten',
    permissions: ['customers:read', 'customers:write', 'orders:read', 'orders:write', 'invoices:read', 'invoices:write', 'offers:read', 'offers:write', 'materials:read', 'materials:write'],
  },
  {
    id: 'dispatcher',
    name: 'Disponent',
    description: 'Aufträge planen und Teams zuweisen',
    permissions: ['orders:read', 'orders:write', 'calendar:read', 'calendar:write', 'crews:read', 'crews:write'],
  },
  {
    id: 'crew',
    name: 'Mitarbeiter (Team)',
    description: 'Eigene Aufträge und Kalender einsehen',
    permissions: ['orders:read', 'crews:read', 'calendar:read'],
  },
  {
    id: 'viewer',
    name: 'Nur Leser',
    description: 'Nur Lesezugriff auf Berichte',
    permissions: ['reports:read'],
  },
];

// Helper functions
export const fetchUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockUsers]), 300));
};

export const fetchUser = async (id: string): Promise<User | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockUsers.find(u => u.id === id);
};

export const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newUser: User = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    permissions: data.permissions || [],
  };
  mockUsers.push(newUser);
  return newUser;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockUsers.findIndex(u => u.id === id);
  if (index === -1) throw new Error('User not found');
  const updated = { ...mockUsers[index], ...data, updatedAt: new Date().toISOString() };
  mockUsers[index] = updated;
  return updated;
};

export const deleteUser = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockUsers.findIndex(u => u.id === id);
  if (index !== -1) mockUsers.splice(index, 1);
};

export const updateUserPermissions = async (userId: string, permissions: string[]): Promise<User> => {
  return updateUser(userId, { permissions });
};