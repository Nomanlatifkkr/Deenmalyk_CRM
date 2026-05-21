export interface Complaint {
  id: string;
  complaintNumber: string;
  title: string;
  description: string;
  originalOrderId: string;
  originalOrderNumber: string;
  customerId: string;
  customerName: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  reductionAmount: number;      // reduces profit of original order
  createdAt: string;
  scheduledDate?: string;       // from calendar
  completedAt?: string;
  notes?: string;
  attachments?: string[];       // PDF, images, etc.
}