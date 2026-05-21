'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Eye, Upload, Filter } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: 'draft' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  orderDate: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  totalAmount: number;
  plannedCosts: number;
  actualCosts: number;
  contributionMargin: number;
  description?: string;
  items: OrderItem[];
}

interface OrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const stored = localStorage.getItem('orders');
    if (stored && JSON.parse(stored).length > 0) {
      setOrders(JSON.parse(stored));
    } else {
      // Mock data
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'SC-2024-001',
          customerId: '1',
          customerName: 'ABC Construction GmbH',
          status: 'in_progress',
          orderDate: '2024-01-15',
          plannedStartDate: '2024-02-01',
          plannedEndDate: '2024-02-15',
          totalAmount: 12500,
          plannedCosts: 8437.5,
          actualCosts: 8900,
          contributionMargin: 32.5,
          description: 'Screed work for office building',
          items: [
            { description: 'Screed material', quantity: 100, unitPrice: 85, total: 8500 },
            { description: 'Labor', quantity: 40, unitPrice: 100, total: 4000 }
          ]
        },
        {
          id: '2',
          orderNumber: 'SC-2024-002',
          customerId: '2',
          customerName: 'Bauwerk AG',
          status: 'confirmed',
          orderDate: '2024-01-20',
          plannedStartDate: '2024-02-10',
          plannedEndDate: '2024-02-20',
          totalAmount: 8700,
          plannedCosts: 6264,
          actualCosts: 0,
          contributionMargin: 28.0,
          description: 'Industrial floor screed',
          items: [
            { description: 'Industrial screed', quantity: 80, unitPrice: 75, total: 6000 },
            { description: 'Installation', quantity: 30, unitPrice: 90, total: 2700 }
          ]
        },
        {
          id: '3',
          orderNumber: 'SC-2024-003',
          customerId: '1',
          customerName: 'ABC Construction GmbH',
          status: 'completed',
          orderDate: '2024-01-10',
          plannedStartDate: '2024-01-20',
          plannedEndDate: '2024-01-30',
          totalAmount: 15200,
          plannedCosts: 9850,
          actualCosts: 10200,
          contributionMargin: 35.2,
          description: 'Residential screed',
          items: [
            { description: 'Screed material', quantity: 120, unitPrice: 80, total: 9600 },
            { description: 'Labor', quantity: 56, unitPrice: 100, total: 5600 }
          ]
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem('orders', JSON.stringify(mockOrders));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      confirmed: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const labels: Record<string, string> = {
      draft: 'Draft',
      confirmed: 'Confirmed',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {labels[status] || status}
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeOrders = filteredOrders.filter(o => o.status === 'in_progress' || o.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 text-sm mt-1">Manage screed works orders</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/orders/import-pdf">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="h-4 w-4" /> Import PDF
              </button>
            </Link>
            <Link href="/dashboard/orders/create">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" /> Create Order
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">€{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Active Orders</p>
            <p className="text-2xl font-bold text-gray-900">{activeOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Avg. Order Value</p>
            <p className="text-2xl font-bold text-gray-900">€{(totalRevenue / (filteredOrders.length || 1)).toLocaleString()}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Order #</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Order Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Planned Start</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Margin</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, index) => (
                  <tr key={order.id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.customerName}</td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.plannedStartDate ? new Date(order.plannedStartDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">€{order.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">{order.contributionMargin.toFixed(1)}%</td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Showing {filteredOrders.length} of {orders.length} orders</p>
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