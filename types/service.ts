export interface Service {
  id: string;
  serviceNumber: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  defaultPrice: number;
  currency: string;
  taxRate: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceDto {
  name: string;
  description?: string;
  category: string;
  unit: string;
  defaultPrice: number;
  currency?: string;
  taxRate?: number;
  notes?: string;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {}