'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales' | 'crew';
  phone?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const stored = localStorage.getItem('users');
    if (stored && JSON.parse(stored).length > 0) {
      setUsers(JSON.parse(stored));
    } else {
      // Mock data
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Admin',
          email: 'john@crm.com',
          role: 'admin',
          phone: '+49 711 123456',
          status: 'active',
          createdAt: '2024-01-01'
        },
        {
          id: '2',
          name: 'Sarah Manager',
          email: 'sarah@crm.com',
          role: 'manager',
          phone: '+49 711 789012',
          status: 'active',
          createdAt: '2024-01-15'
        },
        {
          id: '3',
          name: 'Mike Sales',
          email: 'mike@crm.com',
          role: 'sales',
          phone: '+49 711 345678',
          status: 'active',
          createdAt: '2024-02-01'
        },
        {
          id: '4',
          name: 'Tom Crew',
          email: 'tom@crm.com',
          role: 'crew',
          phone: '+49 711 901234',
          status: 'inactive',
          createdAt: '2024-02-10'
        }
      ];
      setUsers(mockUsers);
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this user? This action cannot be undone.')) return;
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: 'bg-red-100 text-red-800',
      manager: 'bg-blue-100 text-blue-800',
      sales: 'bg-green-100 text-green-800',
      crew: 'bg-gray-100 text-gray-800',
    };
    const labels: Record<string, string> = {
      admin: 'Admin',
      manager: 'Manager',
      sales: 'Sales',
      crew: 'Crew',
    };
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[role]}`}>
        {labels[role] || role}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const activeUsers = users.filter(u => u.status === 'active').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage system users and role-based access</p>
          </div>
          <Link href="/dashboard/users/create">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" /> Add User
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Admin Users</p>
            <p className="text-2xl font-bold text-red-600">{adminUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Roles</p>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                  <option value="crew">Crew</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Phone</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Created</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.phone || '-'}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">
                      {user.status === 'active' ? (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/dashboard/users/${user.id}`}>
                          <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(user.id)} 
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No users found</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Showing {filteredUsers.length} of {users.length} users</p>
              <div className="flex gap-1">
                <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 text-xs bg-blue-600 text-white border border-blue-600 rounded-md">1</button>
                <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}