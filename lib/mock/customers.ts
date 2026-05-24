// /lib/mock/customers.ts

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  vatExempt?: boolean;
  taxId?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'ABC Construction GmbH',
    email: 'info@abc-construction.de',
    phone: '+49 711 123456',
    vatExempt: true,
    taxId: 'DE123456789',
    address: {
      street: 'Hauptstraße 1',
      city: 'Stuttgart',
      postalCode: '70173',
      country: 'Germany',
    },
  },
  {
    id: 'c2',
    name: 'Bauwerk AG',
    email: 'kontakt@bauwerk.de',
    phone: '+49 89 987654',
    vatExempt: false,
    taxId: 'DE987654321',
    address: {
      street: 'Marienplatz 8',
      city: 'München',
      postalCode: '80331',
      country: 'Germany',
    },
  },
  {
    id: 'c3',
    name: 'Wohnbau Stuttgart',
    email: 'info@wohnbau-stuttgart.de',
    phone: '+49 711 456789',
    vatExempt: true,
    taxId: 'DE456789123',
    address: {
      street: 'Hauptstr. 5',
      city: 'Stuttgart',
      postalCode: '70173',
      country: 'Germany',
    },
  },
];

export const fetchCustomers = async (): Promise<Customer[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [...mockCustomers];
};

export const fetchCustomer = async (id: string): Promise<Customer | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockCustomers.find(c => c.id === id);
};