export interface Supplier {
  id: string;
  supplierNumber: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  taxId?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  bankAccount?: {
    iban: string;
    bic: string;
    bankName: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}