import { Invoice, InvoiceItem, Payment } from '@/types/invoice';
import { mockCustomers } from './customers';

export let mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'RE-2024-001',
    companyId: 'screed',
    customerId: 'c1',
    customerName: 'ABC Construction GmbH',
    customerAddress: 'Hauptstraße 1, 70173 Stuttgart',
    issueDate: '2024-05-01',
    dueDate: '2024-05-31',
    items: [
      { id: 'i1', description: 'Estrich verlegen EG', quantity: 450, unit: 'm²', unitPrice: 22.5, total: 10125 },
      { id: 'i2', description: 'Estrich verlegen OG', quantity: 450, unit: 'm²', unitPrice: 22.5, total: 10125 },
    ],
    subtotal: 20250,
    taxRate: 19,
    taxAmount: 3847.5,
    total: 24097.5,
    status: 'sent',
    notes: 'Zahlung bis zum Fälligkeitsdatum',
    payments: [],
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
  },
  {
    id: 'inv2',
    invoiceNumber: 'RE-2024-002',
    companyId: 'screed',
    customerId: 'c2',
    customerName: 'Bauwerk AG',
    customerAddress: 'Marienplatz 8, 80331 München',
    issueDate: '2024-05-15',
    dueDate: '2024-06-14',
    items: [
      { id: 'i3', description: 'Heizungsinstallation', quantity: 24, unit: 'Stück', unitPrice: 12500, total: 300000 },
    ],
    subtotal: 300000,
    taxRate: 0,
    taxAmount: 0,
    total: 300000,
    status: 'draft',
    notes: '§13b Reverse Charge',
    payments: [],
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
  },
];

export const fetchInvoices = async (): Promise<Invoice[]> => {
  await new Promise(r => setTimeout(r, 300));
  return [...mockInvoices];
};

export const fetchInvoice = async (id: string): Promise<Invoice | undefined> => {
  await new Promise(r => setTimeout(r, 200));
  return mockInvoices.find(i => i.id === id);
};

export const createInvoice = async (data: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt' | 'updatedAt' | 'payments'>): Promise<Invoice> => {
  await new Promise(r => setTimeout(r, 500));
  const newInvoice: Invoice = {
    ...data,
    id: `inv-${Date.now()}`,
    invoiceNumber: `RE-${new Date().getFullYear()}-${String(mockInvoices.length + 1).padStart(3, '0')}`,
    payments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockInvoices.push(newInvoice);
  return newInvoice;
};

export const updateInvoice = async (id: string, data: Partial<Invoice>): Promise<Invoice> => {
  await new Promise(r => setTimeout(r, 500));
  const index = mockInvoices.findIndex(i => i.id === id);
  if (index === -1) throw new Error('Invoice not found');
  const updated = { ...mockInvoices[index], ...data, updatedAt: new Date().toISOString() };
  mockInvoices[index] = updated;
  return updated;
};

export const deleteInvoice = async (id: string): Promise<void> => {
  await new Promise(r => setTimeout(r, 500));
  mockInvoices = mockInvoices.filter(i => i.id !== id);
};

export const addPayment = async (invoiceId: string, payment: Omit<Payment, 'id'>): Promise<Invoice> => {
  const inv = await fetchInvoice(invoiceId);
  if (!inv) throw new Error('Invoice not found');
  const newPayment: Payment = { ...payment, id: `pay-${Date.now()}` };
  const newPayments = [...inv.payments, newPayment];
  const totalPaid = newPayments.reduce((sum, p) => sum + p.amount, 0);
  const newStatus = totalPaid >= inv.total ? 'paid' : 'sent';
  return updateInvoice(invoiceId, { payments: newPayments, status: newStatus });
};

export const approveInvoice = async (id: string): Promise<Invoice> => updateInvoice(id, { status: 'approved' });

export const sendInvoice = async (id: string): Promise<Invoice> => updateInvoice(id, { status: 'sent', sentAt: new Date().toISOString() });