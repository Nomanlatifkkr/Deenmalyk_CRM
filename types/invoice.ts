export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: 'bank_transfer' | 'cash' | 'credit_card';
  reference: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  companyId: string;
  customerId: string;
  customerName: string;
  customerAddress?: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'draft' | 'pending_approval' | 'approved' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
  pdfUrl?: string;
  sentAt?: string;
  reminderSentAt?: string;
}