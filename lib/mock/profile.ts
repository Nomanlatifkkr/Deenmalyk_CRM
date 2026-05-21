import { UserProfile } from '@/types/profile';

// Simulate current logged-in user
let currentUser: UserProfile = {
  id: 'user-1',
  email: 'max.mustermann@crmsystem.de',
  firstName: 'Max',
  lastName: 'Mustermann',
  avatar: null,
  phone: '+49 170 1234567',
  position: 'Geschäftsführer',
  department: 'Management',
  language: 'de',
  timezone: 'Europe/Berlin',
  emailNotifications: {
    orderCreated: true,
    orderCompleted: true,
    invoiceCreated: true,
    offerExpiring: true,
    systemUpdates: false,
  },
  pushNotifications: true,
  defaultCompany: 'screed',
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { ...currentUser };
};

export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  currentUser = { ...currentUser, ...data };
  return currentUser;
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Mock validation: oldPassword must be "current123"
  if (oldPassword !== 'current123') {
    throw new Error('Altes Passwort ist falsch');
  }
  return true;
};