export interface Company {
  id: string
  name: string
  shortName: string
  legalName: string
  taxId: string
  commercialRegister: string
  address: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  contact: {
    phone: string
    email: string
    website: string
  }
  logo: string | null
  invoiceNumberConfig: {
    prefix: string
    nextNumber: number
    suffix: string
    padding: number
  }
  createdAt: string
  updatedAt: string
}