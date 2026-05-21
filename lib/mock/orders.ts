export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: string;
  location: string;
  assignedCrewId?: string;
  assignedCrewName?: string;
  actualMargin: number;
}

export const mockOrders: Order[] = [
  {
    id: 'ord1',
    orderNumber: 'SC-2412',
    customerId: 'c1',
    customerName: 'ABC Construction GmbH',
    status: 'in_progress',
    location: 'Stuttgart, Industriestr. 12',
    assignedCrewId: '1',
    assignedCrewName: 'Estrich Team A',
    actualMargin: 63000,
  },
  {
    id: 'ord2',
    orderNumber: 'SC-2415',
    customerId: 'c2',
    customerName: 'Bauwerk AG',
    status: 'in_progress',
    location: 'München, Marienplatz 8',
    assignedCrewId: '3',
    assignedCrewName: 'Heizung Team Süd',
    actualMargin: 54000,
  },
  {
    id: 'ord3',
    orderNumber: 'SC-2420',
    customerId: 'c3',
    customerName: 'Wohnbau Stuttgart',
    status: 'planning',
    location: 'Stuttgart, Hauptstr. 5',
    actualMargin: 0,
  },
];

export const fetchOrders = async (): Promise<Order[]> => {
  await new Promise(r => setTimeout(r, 200));
  return [...mockOrders];
};

export const fetchOrder = async (id: string): Promise<Order | undefined> => {
  await new Promise(r => setTimeout(r, 100));
  return mockOrders.find(o => o.id === id);
};

export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order> => {
  await new Promise(r => setTimeout(r, 300));
  const index = mockOrders.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Order not found');
  mockOrders[index] = { ...mockOrders[index], ...data };
  return mockOrders[index];
};