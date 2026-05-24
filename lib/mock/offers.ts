import { Offer, OfferService, Subsidy, ChecklistAnswers } from '@/types/offer';
import { catalogServices } from './services';
import { mockCustomers } from './customers';
import { createOrder } from './orders';    // will be used later

let mockOffers: Offer[] = [
  {
    id: 'off1',
    offerNumber: 'AN-2401',
    customerId: 'c1',
    customerName: 'ABC Construction GmbH',
    title: 'Estricharbeiten Bürogebäude',
    description: 'Estrich verlegen EG und OG',
    status: 'sent',
    totalNet: 25200,
    totalGross: 29988,
    taxRate: 19,
    subsidies: [],
    services: [
      {
        id: 'os1',
        serviceId: 'sv1',
        serviceName: 'Estrich verlegen',
        description: 'Zementestrich 450m²',
        quantity: 450,
        unit: 'm²',
        unitPrice: 22.5,
        totalPrice: 10125,
      },
      {
        id: 'os2',
        serviceId: 'sv1',
        serviceName: 'Estrich verlegen',
        description: 'Zementestrich 450m² OG',
        quantity: 450,
        unit: 'm²',
        unitPrice: 22.5,
        totalPrice: 10125,
      },
    ],
    validUntil: '2024-06-30',
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
  },
];

export const fetchOffers = async (): Promise<Offer[]> => {
  await new Promise(r => setTimeout(r, 300));
  return [...mockOffers];
};

export const fetchOffer = async (id: string): Promise<Offer | undefined> => {
  await new Promise(r => setTimeout(r, 200));
  return mockOffers.find(o => o.id === id);
};

export const createOffer = async (data: Omit<Offer, 'id' | 'offerNumber' | 'createdAt' | 'updatedAt'>): Promise<Offer> => {
  await new Promise(r => setTimeout(r, 500));
  const newOffer: Offer = {
    ...data,
    id: `off-${Date.now()}`,
    offerNumber: `AN-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockOffers.push(newOffer);
  return newOffer;
};

export const updateOffer = async (id: string, data: Partial<Offer>): Promise<Offer> => {
  await new Promise(r => setTimeout(r, 500));
  const index = mockOffers.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Offer not found');
  const updated = { ...mockOffers[index], ...data, updatedAt: new Date().toISOString() };
  mockOffers[index] = updated;
  return updated;
};

export const deleteOffer = async (id: string): Promise<void> => {
  await new Promise(r => setTimeout(r, 500));
  mockOffers = mockOffers.filter(o => o.id !== id);
};

export const autoGenerateOffer = async (answers: ChecklistAnswers, customerId: string): Promise<Offer> => {
  // Simulate AI: compute services based on square meters, height, etc.
  const customer = mockCustomers.find(c => c.id === customerId)!;
  const services: OfferService[] = [];
  let totalNet = 0;
  const sqm = answers.squareMeters;
  const height = answers.assemblyHeight;

  // Example rule: if height > 3m, add extra service
  if (answers.heatingType === 'underfloor') {
    const heatingService = catalogServices.find(s => s.name === 'Heizungsinstallation')!;
    const quantity = sqm;
    const total = quantity * heatingService.defaultPrice;
    services.push({
      id: `temp-${Date.now()}`,
      serviceId: heatingService.id,
      serviceName: heatingService.name,
      description: `${heatingService.description} für ${sqm}m²`,
      quantity,
      unit: heatingService.unit,
      unitPrice: heatingService.defaultPrice,
      totalPrice: total,
    });
    totalNet += total;
  } else {
    const screedService = catalogServices.find(s => s.name === 'Estrich verlegen')!;
    const quantity = sqm;
    const total = quantity * screedService.defaultPrice;
    services.push({
      id: `temp-${Date.now()}`,
      serviceId: screedService.id,
      serviceName: screedService.name,
      description: `${screedService.description} für ${sqm}m²`,
      quantity,
      unit: screedService.unit,
      unitPrice: screedService.defaultPrice,
      totalPrice: total,
    });
    totalNet += total;
  }

  // Additional height surcharge
  if (height > 3) {
    const extra = { ...services[0], quantity: sqm, unitPrice: 5, totalPrice: sqm * 5, description: 'Zuschlag für Montagehöhe >3m' };
    services.push({ ...extra, id: `temp-${Date.now()}` });
    totalNet += sqm * 5;
  }

  const newOffer: Omit<Offer, 'id' | 'offerNumber' | 'createdAt' | 'updatedAt'> = {
    customerId,
    customerName: customer.name,
    title: `Auto-Angebot für ${customer.name}`,
    description: `Automatisch generiert aus Checkliste (${sqm}m², Höhe ${height}m)`,
    status: 'draft',
    totalNet,
    totalGross: totalNet * 1.19,
    taxRate: 19,
    subsidies: [],
    services,
    validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  };
  return createOffer(newOffer);
};