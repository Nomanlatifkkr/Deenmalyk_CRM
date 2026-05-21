export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'dispatcher' | 'crew' | 'viewer';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  permissions: string[]; // module-based permissions, e.g. 'customers:write', 'orders:read'
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: User['role'];
  isActive?: boolean;
  permissions?: string[];
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  isActive?: boolean;
}

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}