import { Company } from "@/types/types"

export const mockCompanies: Company[] = [
  {
    id: 'heating',
    name: 'Heizungsbau Süddeutschland GmbH',
    shortName: 'Heizungsbau',
    legalName: 'Heizungsbau Süddeutschland GmbH',
    taxId: 'DE123456789',
    commercialRegister: 'HRB 12345',
    address: {
      street: 'Industriestr. 12',
      city: 'München',
      postalCode: '80331',
      country: 'Deutschland',
    },
    contact: {
      phone: '+49 89 1234567',
      email: 'info@heizungsbau-sued.de',
      website: 'www.heizungsbau-sued.de',
    },
    logo: null,
    invoiceNumberConfig: {
      prefix: 'HB',
      nextNumber: 1001,
      suffix: '',
      padding: 4,
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: 'screed',
    name: 'Estrichbau Süddeutschland GmbH',
    shortName: 'Estrichbau',
    legalName: 'Estrichbau Süddeutschland GmbH',
    taxId: 'DE987654321',
    commercialRegister: 'HRB 67890',
    address: {
      street: 'Bauweg 5',
      city: 'Stuttgart',
      postalCode: '70173',
      country: 'Deutschland',
    },
    contact: {
      phone: '+49 711 9876543',
      email: 'info@estrichbau-sued.de',
      website: 'www.estrichbau-sued.de',
    },
    logo: null,
    invoiceNumberConfig: {
      prefix: 'EB',
      nextNumber: 2001,
      suffix: '',
      padding: 4,
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
  {
    id: 'electrical',
    name: 'Elektrotechnik Süddeutschland GmbH',
    shortName: 'Elektrotechnik',
    legalName: 'Elektrotechnik Süddeutschland GmbH',
    taxId: 'DE456789123',
    commercialRegister: 'HRB 11223',
    address: {
      street: 'Stromstr. 8',
      city: 'Ulm',
      postalCode: '89073',
      country: 'Deutschland',
    },
    contact: {
      phone: '+49 731 1122334',
      email: 'info@elektrotechnik-sued.de',
      website: 'www.elektrotechnik-sued.de',
    },
    logo: null,
    invoiceNumberConfig: {
      prefix: 'ET',
      nextNumber: 3001,
      suffix: '',
      padding: 4,
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z',
  },
]

export const fetchCompanies = async (): Promise<Company[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockCompanies]), 300))
}

export const updateCompany = async (id: string, data: Partial<Company>): Promise<Company> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mockCompanies.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Company not found')
  const updated = { ...mockCompanies[index], ...data, updatedAt: new Date().toISOString() }
  mockCompanies[index] = updated
  return updated
}

export const updateLogo = async (id: string, logoBase64: string): Promise<Company> => {
  return updateCompany(id, { logo: logoBase64 })
}

export const removeLogo = async (id: string): Promise<Company> => {
  return updateCompany(id, { logo: null })
}

export const updateInvoiceConfig = async (id: string, config: Partial<Company['invoiceNumberConfig']>): Promise<Company> => {
  const company = mockCompanies.find(c => c.id === id)
  if (!company) throw new Error('Company not found')
  const updatedConfig = { ...company.invoiceNumberConfig, ...config }
  return updateCompany(id, { invoiceNumberConfig: updatedConfig })
}