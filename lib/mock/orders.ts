import { Order, SubService, MaterialOrderItem, ActualCost } from '@/types/order';
import { mockCustomers } from './customers';

export const mockOrders: Order[] = [
  {
    id: 'ord1',
    orderNumber: 'SC-2412',
    customerId: 'c1',
    customerName: 'ABC Construction GmbH',
    title: 'Estricharbeiten Bürogebäude Stuttgart',
    description: 'Estrich verlegen EG und OG, ca. 1200m²',
    status: 'in_progress',
    orderValue: 285000,
    plannedCosts: 198000,
    actualCosts: 156000,
    plannedMargin: 87000,
    actualMargin: 129000,
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
    scheduledStart: '2024-05-20T08:00:00',
    scheduledEnd: '2024-05-25T17:00:00',
    assignedCrewId: '1',
    assignedCrewName: 'Estrich Team A',
    location: 'Stuttgart, Industriestr. 12',
    subServices: [
      {
        id: 'ss1',
        name: 'Estrich verlegen EG',
        quantity: 450,
        unit: 'm²',
        unitPrice: 22.5,
        total: 10125,
        assignedCrewId: '1',
        assignedCrewName: 'Estrich Team A',
        status: 'in_progress',
      },
      {
        id: 'ss2',
        name: 'Estrich verlegen OG',
        quantity: 450,
        unit: 'm²',
        unitPrice: 22.5,
        total: 10125,
        assignedCrewId: '1',
        assignedCrewName: 'Estrich Team A',
        status: 'pending',
      },
    ],
    materialOrders: [
      {
        id: 'mo1',
        materialId: 'mat1',
        materialName: 'Zement CEM II 42,5 R',
        quantity: 200,
        unit: 'Sack',
        unitPrice: 6.5,
        total: 1300,
        supplierId: 'sup1',
        supplierName: 'Baustoffzentrale Süd GmbH',
        ordered: true,
        confirmed: true,
        preliminaryOrderSent: true,
        finalOrderSent: false,
      },
    ],
    mediaFiles: [],
    actualCostsList: [
      {
        id: 'ac1',
        category: 'material',
        description: 'Zement 200 Säcke',
        amount: 1300,
        date: '2024-05-05',
        invoiceNumber: 'RE-1001',
      },
    ],
  },
  {
    id: 'ord2',
    orderNumber: 'SC-2415',
    customerId: 'c2',
    customerName: 'Bauwerk AG',
    title: 'Heizungsinstallation Wohnanlage',
    description: 'Installation von 24 Wärmepumpen',
    status: 'confirmed',
    orderValue: 890000,
    plannedCosts: 645000,
    actualCosts: 0,
    plannedMargin: 245000,
    actualMargin: 0,
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2024-05-10T10:00:00Z',
    scheduledStart: null,
    scheduledEnd: null,
    assignedCrewId: null,
    location: 'München, Marienplatz 8',
    subServices: [],
    materialOrders: [],
    mediaFiles: [],
    actualCostsList: [],
  },
];

export const fetchOrders = async (): Promise<Order[]> => {
  await new Promise(r => setTimeout(r, 300));
  return [...mockOrders];
};

export const fetchOrder = async (id: string): Promise<Order | undefined> => {
  await new Promise(r => setTimeout(r, 200));
  return mockOrders.find(o => o.id === id);
};

export const createOrder = async (data: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'actualCosts' | 'actualMargin'>): Promise<Order> => {
  await new Promise(r => setTimeout(r, 500));
  const newOrder: Order = {
    ...data,
    id: `ord-${Date.now()}`,
    orderNumber: `SC-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    actualCosts: 0,
    actualMargin: data.orderValue - data.plannedCosts,
    mediaFiles: [],
    actualCostsList: [],
  };
  mockOrders.push(newOrder);
  return newOrder;
};

export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order> => {
  await new Promise(r => setTimeout(r, 500));
  const index = mockOrders.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Order not found');
  const updated = { ...mockOrders[index], ...data, updatedAt: new Date().toISOString() };
  mockOrders[index] = updated;
  return updated;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await new Promise(r => setTimeout(r, 500));
  const index = mockOrders.findIndex(o => o.id === id);
  if (index !== -1) mockOrders.splice(index, 1);
};

export const addActualCost = async (orderId: string, cost: Omit<ActualCost, 'id'>): Promise<Order> => {
  const order = await fetchOrder(orderId);
  if (!order) throw new Error('Order not found');
  const newCost: ActualCost = { ...cost, id: `ac-${Date.now()}` };
  const newList = [...order.actualCostsList, newCost];
  const total = newList.reduce((sum, c) => sum + c.amount, 0);
  const updated = await updateOrder(orderId, { actualCostsList: newList, actualCosts: total, actualMargin: order.orderValue - total });
  return updated;
};