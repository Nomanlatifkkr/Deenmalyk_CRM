import { Material, SupplierPrice, Supplier } from '@/types/materials/types'

// Mock suppliers (simplified)
export const mockSuppliers: Supplier[] = [
  { id: '1', name: 'Baustoffzentrale Süd GmbH' },
  { id: '2', name: 'Bauprofi Material AG' },
  { id: '3', name: 'Estrich & Beton GmbH' },
];

export const mockMaterials: Material[] = [
  {
    id: '1',
    materialNumber: 'M-1001',
    name: 'Zement CEM II 42,5 R',
    description: 'Portlandkompoundzement, 25kg Sack',
    unit: 'Sack',
    category: 'Zement',
    stockQuantity: 150,
    minimumStock: 50,
    supplierPrices: [
      { supplierId: '1', supplierName: 'Baustoffzentrale Süd GmbH', price: 6.50, currency: 'EUR', lastUpdated: '2024-05-01', notes: 'Palette = 56 Säcke' },
      { supplierId: '2', supplierName: 'Bauprofi Material AG', price: 6.20, currency: 'EUR', lastUpdated: '2024-05-10', notes: 'Ab 100 Säcke 5,90€' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    materialNumber: 'M-1002',
    name: 'Estrichmörtel CT-C25-F4',
    description: 'Zementestrich, 40kg Sack',
    unit: 'Sack',
    category: 'Estrich',
    stockQuantity: 200,
    minimumStock: 80,
    supplierPrices: [
      { supplierId: '1', supplierName: 'Baustoffzentrale Süd GmbH', price: 8.90, currency: 'EUR', lastUpdated: '2024-05-01' },
      { supplierId: '3', supplierName: 'Estrich & Beton GmbH', price: 8.50, currency: 'EUR', lastUpdated: '2024-05-05' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    materialNumber: 'M-1003',
    name: 'Bitumenbahn G200 S4',
    description: 'Dachabdichtungsbahn, 10m Rolle',
    unit: 'Rolle',
    category: 'Dachbau',
    stockQuantity: 45,
    minimumStock: 20,
    supplierPrices: [
      { supplierId: '2', supplierName: 'Bauprofi Material AG', price: 45.00, currency: 'EUR', lastUpdated: '2024-05-02' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper functions
export const fetchMaterials = async (): Promise<Material[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockMaterials]), 300));
};

export const fetchMaterial = async (id: string): Promise<Material | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockMaterials.find(m => m.id === id);
};

export const createMaterial = async (data: Omit<Material, 'id' | 'materialNumber' | 'createdAt' | 'updatedAt'>): Promise<Material> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newMaterial: Material = {
    ...data,
    id: Date.now().toString(),
    materialNumber: `M-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockMaterials.push(newMaterial);
  return newMaterial;
};

export const updateMaterial = async (id: string, data: Partial<Material>): Promise<Material> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockMaterials.findIndex(m => m.id === id);
  if (index === -1) throw new Error('Material not found');
  const updated = { ...mockMaterials[index], ...data, updatedAt: new Date().toISOString() };
  mockMaterials[index] = updated;
  return updated;
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockMaterials.findIndex(m => m.id === id);
  if (index !== -1) mockMaterials.splice(index, 1);
};

export const updateSupplierPrices = async (materialId: string, prices: SupplierPrice[]): Promise<Material> => {
  return updateMaterial(materialId, { supplierPrices: prices });
};

export const fetchSuppliersForPricing = async (): Promise<Supplier[]> => {
  return [...mockSuppliers];
};