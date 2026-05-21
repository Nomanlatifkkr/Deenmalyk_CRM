'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X, Trash2, Mail, Phone, Shield, Calendar, Eye, EyeOff } from 'lucide-react';
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

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Unwrap params using React.use()
  const { id } = React.use(params);
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    role: User['role'];
    status: User['status'];
    password: string;
  }>({
    name: '',
    email: '',
    phone: '',
    role: 'sales',
    status: 'active',
    password: '',
  });

  useEffect(() => {
    if (id) {
      loadUserFromLocalStorage();
    }
  }, [id]);

  const loadUserFromLocalStorage = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('users');
      const allUsers: User[] = stored ? JSON.parse(stored) : [];
      const found = allUsers.find(u => u.id === id);
      
      if (found) {
        setUser(found);
        setFormData({
          name: found.name,
          email: found.email,
          phone: found.phone || '',
          role: found.role,
          status: found.status,
          password: '',
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: formData.status,
    };
    
    // Update password if provided
    if (formData.password) {
      // In a real app, you'd hash the password
      console.log('Password updated for user:', user.email);
    }
    
    // Update in localStorage
    const stored = localStorage.getItem('users');
    let allUsers: User[] = stored ? JSON.parse(stored) : [];
    allUsers = allUsers.map(u => u.id === id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(allUsers));
    
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!confirm('Delete this user? This action cannot be undone.')) return;
    
    const stored = localStorage.getItem('users');
    let allUsers: User[] = stored ? JSON.parse(stored) : [];
    allUsers = allUsers.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(allUsers));
    
    router.push('/dashboard/users');
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

  const getRoleDescription = (role: string) => {
    const descriptions: Record<string, string> = {
      admin: 'Full system access including user management and settings',
      manager: 'Access to all modules but cannot manage users',
      sales: 'Can manage customers, offers, and invoices only',
      crew: 'Can view orders and schedule work only',
    };
    return descriptions[role] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading user details...</div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/users">
              <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200">
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit User' : user.name}</h1>
              <p className="text-gray-500 text-sm">User Profile</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Edit User
                </button>
                <button 
                  onClick={handleDelete} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
                <button 
                  onClick={handleUpdate} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" /> Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* User Information Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">User Information</h2>
          </div>
          <div className="p-6">
            {!isEditing ? (
              // View Mode
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <div>{getRoleBadge(user.role)}</div>
                    <p className="text-xs text-gray-500 mt-1">{getRoleDescription(user.role)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  {user.status === 'active' ? (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active - Can log in</span>
                  ) : (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Inactive - Cannot log in</span>
                  )}
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="Leave blank to keep current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="admin">Admin - Full System Access</option>
                      <option value="manager">Manager - All Modules Access</option>
                      <option value="sales">Sales - Quotes & Customers Only</option>
                      <option value="crew">Crew - Orders & Scheduling Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active - Can log in</option>
                      <option value="inactive">Inactive - Cannot log in</option>
                    </select>
                  </div>
                </div>

                {/* Company Access Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This user has access to all 3 companies. 
                    Company-specific access settings will be available in a future update.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}