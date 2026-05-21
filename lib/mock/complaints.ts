import { Complaint } from '@/types/complaint';
import { mockOrders, updateOrder, fetchOrder } from './orders';
import { createAppointmentFromOrder } from './calendar';

let mockComplaints: Complaint[] = [
  {
    id: 'comp1',
    complaintNumber: 'CMP-001',
    title: 'Unebener Estrich',
    description: 'Im EG ist der Estrich an mehreren Stellen uneben (>5mm Abweichung).',
    originalOrderId: 'ord1',
    originalOrderNumber: 'SC-2412',
    customerId: 'c1',
    customerName: 'ABC Construction GmbH',
    status: 'open',
    priority: 'high',
    reductionAmount: 2500,
    createdAt: '2024-05-15T10:00:00Z',
    scheduledDate: null,
    notes: 'Kunde verlangt Nachbesserung bis Ende Mai.',
  },
];

export const fetchComplaints = async (): Promise<Complaint[]> => {
  await new Promise(r => setTimeout(r, 300));
  return [...mockComplaints];
};

export const fetchComplaint = async (id: string): Promise<Complaint | undefined> => {
  await new Promise(r => setTimeout(r, 200));
  return mockComplaints.find(c => c.id === id);
};

// Auto‑create complaint from an existing order
export const createComplaintFromOrder = async (
  orderId: string,
  data: { title: string; description: string; priority: string; reductionAmount: number; notes?: string }
): Promise<Complaint> => {
  const order = await fetchOrder(orderId);
  if (!order) throw new Error('Order not found');
  const newComplaint: Complaint = {
    id: `comp-${Date.now()}`,
    complaintNumber: `CMP-${Date.now()}`,
    title: data.title,
    description: data.description,
    originalOrderId: order.id,
    originalOrderNumber: order.orderNumber,
    customerId: order.customerId,
    customerName: order.customerName,
    status: 'open',
    priority: data.priority as any,
    reductionAmount: data.reductionAmount,
    createdAt: new Date().toISOString(),
    scheduledDate: null,
    notes: data.notes,
  };
  mockComplaints.push(newComplaint);
  // Reduce profit of original order
  await updateOrder(orderId, { actualMargin: order.actualMargin - data.reductionAmount });
  // Automatically create a calendar appointment for this complaint (if calendar mock exists)
  if (typeof createAppointmentFromOrder === 'function') {
    await createAppointmentFromOrder(orderId, {
      title: `Reklamation: ${data.title}`,
      start: new Date(Date.now() + 2 * 24 * 3600000).toISOString(),
      end: new Date(Date.now() + 3 * 24 * 3600000).toISOString(),
      crewId: order.assignedCrewId || '1',
      crewName: order.assignedCrewName || 'Standard Team',
      status: 'scheduled',
      location: order.location,
    });
  }
  return newComplaint;
};

export const updateComplaint = async (id: string, data: Partial<Complaint>): Promise<Complaint> => {
  await new Promise(r => setTimeout(r, 500));
  const index = mockComplaints.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Complaint not found');
  const updated = { ...mockComplaints[index], ...data, updatedAt: new Date().toISOString() };
  mockComplaints[index] = updated;
  // If reductionAmount changes, update the order margin accordingly
  if (data.reductionAmount !== undefined) {
    const order = await fetchOrder(updated.originalOrderId);
    if (order) {
      const originalReduction = mockComplaints[index].reductionAmount;
      const delta = data.reductionAmount - originalReduction;
      await updateOrder(order.id, { actualMargin: order.actualMargin - delta });
    }
  }
  return updated;
};

export const completeComplaint = async (id: string): Promise<Complaint> => {
  return updateComplaint(id, { status: 'completed', completedAt: new Date().toISOString() });
};

export const deleteComplaint = async (id: string): Promise<void> => {
  await new Promise(r => setTimeout(r, 500));
  mockComplaints = mockComplaints.filter(c => c.id !== id);
};
