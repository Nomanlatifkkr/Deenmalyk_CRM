export interface OfferService {
  id: string;
  serviceId: string;
  serviceName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface Subsidy {
  name: string;
  amount: number;
  description: string;
}

export interface Offer {
  id: string;
  offerNumber: string;
  customerId: string;
  customerName: string;
  title: string;
  description?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'converted';
  totalNet: number;
  totalGross: number;
  taxRate: number;                // 0 or 19
  subsidies: Subsidy[];          // automatic calculation
  services: OfferService[];
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  pdfUrl?: string;               // for preview
}

export interface ChecklistAnswers {
  squareMeters: number;
  assemblyHeight: number;
  floorType?: string;
  heatingType?: string;
  electricalLoad?: number;
  additionalInfo?: string;
}