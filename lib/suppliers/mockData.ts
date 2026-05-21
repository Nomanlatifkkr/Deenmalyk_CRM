import { Supplier } from "@/types/suppliers/types";

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    supplierNumber: 'S-1001',
    name: 'Baustoffzentrale Süd GmbH',
    contactPerson: 'Herr Müller',
    email: 'info@baustoffzentrale.de',
    phone: '+49 711 123456',
    taxId: 'DE123456789',
    address: {
      street: 'Industriestraße 15',
      city: 'Stuttgart',
      postalCode: '70174',
      country: 'Deutschland',
    },
    bankAccount: {
      iban: 'DE89 3704 0044 0532 0130 00',
      bic: 'COBADEFFXXX',
      bankName: 'Commerzbank',
    },
    notes: 'Lieferung innerhalb 48h',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    supplierNumber: 'S-1002',
    name: 'Bauprofi Material AG',
    contactPerson: 'Frau Schmidt',
    email: 'kontakt@bauprofi.de',
    phone: '+49 89 987654',
    taxId: 'DE987654321',
    address: {
      street: 'Gewerbepark 8',
      city: 'München',
      postalCode: '80805',
      country: 'Deutschland',
    },
    bankAccount: {
      iban: 'DE70 7002 0270 0033 4455 66',
      bic: 'HYVEDEMMXXX',
      bankName: 'UniCredit',
    },
    notes: 'Staffelpreise ab 100m²',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    supplierNumber: 'S-1003',
    name: 'Estrich & Beton GmbH',
    contactPerson: 'Herr Weber',
    email: 'info@estrich-beton.de',
    phone: '+49 40 456789',
    taxId: 'DE456789123',
    address: {
      street: 'Hafenstraße 23',
      city: 'Hamburg',
      postalCode: '20457',
      country: 'Deutschland',
    },
    bankAccount: {
      iban: 'DE15 2004 1133 0222 7890 11',
      bic: 'HASPDEHHXXX',
      bankName: 'Hamburger Sparkasse',
    },
    notes: 'Nur Vorkasse',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockSuppliers]), 300));
};

export const addSupplier = async (supplier: Omit<Supplier, 'id' | 'supplierNumber' | 'createdAt' | 'updatedAt'>): Promise<Supplier> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newSupplier: Supplier = {
    ...supplier,
    id: Date.now().toString(),
    supplierNumber: `S-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockSuppliers.push(newSupplier);
  return newSupplier;
};

export const updateSupplier = async (id: string, data: Partial<Supplier>): Promise<Supplier> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockSuppliers.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Supplier not found');
  const updated = { ...mockSuppliers[index], ...data, updatedAt: new Date().toISOString() };
  mockSuppliers[index] = updated;
  return updated;
};

export const deleteSupplier = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockSuppliers.findIndex(s => s.id === id);
  if (index !== -1) mockSuppliers.splice(index, 1);
};