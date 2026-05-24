export interface SubService {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  assignedCrewId?: string;
  assignedCrewName?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface MaterialOrderItem {
  id: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  supplierId: string;
  supplierName: string;
  ordered: boolean;
  confirmed: boolean;
  preliminaryOrderSent: boolean;
  finalOrderSent: boolean;
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

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  title: string;
  description?: string;
  status: 'draft' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  orderValue: number;
  plannedCosts: number;
  actualCosts: number;
  plannedMargin: number;
  actualMargin: number;
  createdAt: string;
  updatedAt: string;
  scheduledStart?: string;
  scheduledEnd?: string;
  assignedCrewId?: string;
  assignedCrewName?: string;
  location?: string;
  subServices: SubService[];
  materialOrders: MaterialOrderItem[];
  mediaFiles: string[];
  actualCostsList: ActualCost[];
  completionReport?: string;
  complaintId?: string;
}
export interface SubService {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  assignedCrewId?: string;
  assignedCrewName?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface MaterialOrderItem {
  id: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  supplierId: string;
  supplierName: string;
  ordered: boolean;
  confirmed: boolean;
  preliminaryOrderSent: boolean;
  finalOrderSent: boolean;
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

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  title: string;
  description?: string;
  status: 'draft' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  orderValue: number;
  plannedCosts: number;
  actualCosts: number;
  plannedMargin: number;
  actualMargin: number;
  createdAt: string;
  updatedAt: string;
  scheduledStart?: string;
  scheduledEnd?: string;
  assignedCrewId?: string;
  assignedCrewName?: string;
  location?: string;
  subServices: SubService[];
  materialOrders: MaterialOrderItem[];
  mediaFiles: string[];
  actualCostsList: ActualCost[];
  completionReport?: string;
  complaintId?: string;
}