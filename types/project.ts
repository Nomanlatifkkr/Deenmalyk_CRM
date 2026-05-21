export interface SubService {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  assignedCrewId?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface ActualCost {
  id: string;
  category: 'material' | 'labor' | 'subcontractor' | 'equipment' | 'other';
  description: string;
  amount: number;
  date: string;
  invoiceNumber?: string;
  supplierId?: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  description?: string;
  customerId: string;
  customerName: string;
  status: 'planning' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  totalValue: number;      // planned/offered value
  plannedCosts: number;
  actualCosts: number;
  plannedMargin: number;
  actualMargin: number;
  subServices: SubService[];
  actualCostsList: ActualCost[];
  createdAt: string;
  updatedAt: string;
}