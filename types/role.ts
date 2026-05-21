export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // e.g. 'customers:read', 'orders:write', '*'
  isSystemRole?: boolean; // true for admin, manager, etc. (cannot delete)
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleDto {
  name: string;
  description: string;
  permissions?: string[];
}