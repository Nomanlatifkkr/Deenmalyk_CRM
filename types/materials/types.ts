export interface Material {
  id: string;
  materialNumber: string;
  name: string;
  description?: string;
  unit: string; // e.g., "Stück", "m²", "kg", "Liter"
  category: string;
  stockQuantity?: number;
  minimumStock?: number;
  supplierPrices: SupplierPrice[];
  createdAt: string;
  updatedAt: string;
}

export interface SupplierPrice {
  supplierId: string;
  supplierName: string;
  price: number; // net price per unit
  currency: string;
  lastUpdated: string;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
}