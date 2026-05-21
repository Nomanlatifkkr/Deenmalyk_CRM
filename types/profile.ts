export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  position?: string;
  department?: string;
  language: 'de' | 'en';
  timezone: string;
  emailNotifications: {
    orderCreated: boolean;
    orderCompleted: boolean;
    invoiceCreated: boolean;
    offerExpiring: boolean;
    systemUpdates: boolean;
  };
  pushNotifications: boolean;
  defaultCompany: string; // company id
}