'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Package, Users, Truck, HardHat, Calendar, 
  FileText, DollarSign, TrendingUp, TrendingDown, Activity,
  Zap, Shield, Award, Clock, CheckCircle, ArrowRight,
  Menu, X, Bell, Search, Filter, Plus, Eye, MessageCircle,
  Phone, Mail, MapPin, MoreVertical, User, LogOut, Settings,
  CreditCard, Briefcase, ClipboardList, BarChart3, Globe,
  Sparkles, Crown, Target, Rocket, Star, Wallet, PieChart,
  AlertCircle, Sun, Moon, ChevronDown, Grid3x3, List,
  FolderKanban, ShoppingCart, ClipboardCheck, TruckIcon,
  PhoneCall, MailOpen, Users2, Signal, Gauge, HeartHandshake
} from 'lucide-react'

// Animated Background Component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  )
}

// Modern Stats Card Component
function ModernStatCard({ title, value, change, icon: Icon, trend, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition`}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-12 w-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{change}</span>
          </motion.div>
        </div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  )
}

// Modern Order Table Component
function ModernOrderTable() {
  const orders = [
    { id: 'ORD-001', customer: 'ABC Construction', project: 'Shopping Mall', amount: '€12,500', status: 'In Progress', progress: 65, priority: 'High' },
    { id: 'ORD-002', customer: 'XYZ Builders', project: 'Office Complex', amount: '€8,700', status: 'Completed', progress: 100, priority: 'Medium' },
    { id: 'ORD-003', customer: '123 Homes Ltd', project: 'Residential', amount: '€23,400', status: 'Confirmed', progress: 0, priority: 'Low' },
    { id: 'ORD-004', customer: 'City Mall', project: 'Parking Area', amount: '€45,000', status: 'In Progress', progress: 30, priority: 'Urgent' },
  ]

  const getStatusStyle = (status: string) => {
    const styles: any = {
      'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Confirmed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    }
    return styles[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getPriorityStyle = (priority: string) => {
    const styles: any = {
      'Urgent': 'text-red-400',
      'High': 'text-orange-400',
      'Medium': 'text-yellow-400',
      'Low': 'text-green-400',
    }
    return styles[priority]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderKanban className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Active Orders</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left text-sm text-gray-400">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Project</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Progress</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order, idx) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-white/5 transition"
              >
                <td className="p-4 font-medium text-white">{order.id}</td>
                <td className="p-4 text-gray-300">{order.customer}</td>
                <td className="p-4 text-gray-300">{order.project}</td>
                <td className="p-4 font-semibold text-white">{order.amount}</td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="w-24">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${order.progress}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{order.progress}%</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-medium ${getPriorityStyle(order.priority)}`}>
                    {order.priority}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <motion.button whileHover={{ scale: 1.1 }} className="p-1 hover:bg-white/10 rounded transition">
                      <Eye className="h-4 w-4 text-gray-400" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} className="p-1 hover:bg-white/10 rounded transition">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

// Quick Stats Component
function QuickStats() {
  const stats = [
    { label: 'Active Crews', value: '8', icon: HardHat, color: 'from-cyan-500 to-blue-500' },
    { label: 'Available', value: '3', icon: Users2, color: 'from-green-500 to-emerald-500' },
    { label: 'On Leave', value: '1', icon: Clock, color: 'from-orange-500 to-red-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Users className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Crew Status</h3>
      </div>
      <div className="space-y-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className={`h-10 w-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              View
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Activity Feed Component
function ActivityFeed() {
  const activities = [
    { user: 'John', action: 'completed order', target: 'ORD-001', time: '5 min ago', icon: CheckCircle, color: 'text-green-400' },
    { user: 'Sarah', action: 'assigned crew to', target: 'ORD-002', time: '1 hour ago', icon: Users, color: 'text-blue-400' },
    { user: 'Mike', action: 'updated invoice', target: 'INV-003', time: '3 hours ago', icon: FileText, color: 'text-purple-400' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Signal className="h-5 w-5 text-orange-400" />
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="font-medium text-blue-400">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Main Dashboard Component
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AnimatedBackground />

      {/* Modern Navigation */}
      <nav className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold gradient-text">CRM System</h1>
              
              {/* Company Selector */}
              <div className="relative">
                <div className="flex items-center space-x-2 glass px-4 py-2 rounded-lg cursor-pointer">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  <select className="bg-transparent text-white text-sm focus:outline-none cursor-pointer">
                    <option className="bg-gray-800">Heating Works</option>
                    <option className="bg-gray-800">Screed Works</option>
                    <option className="bg-gray-800">Electrical Works</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button whileHover={{ scale: 1.1 }} className="relative p-2 glass rounded-lg">
                <Bell className="h-5 w-5 text-gray-400" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="p-2 glass rounded-lg">
                <MessageCircle className="h-5 w-5 text-gray-400" />
              </motion.button>
              <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">John Carter</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <User className="h-5 w-5 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white">
            Welcome back, <span className="gradient-text">John Carter</span>
          </h2>
          <p className="text-gray-400 mt-2">Here is your business performance overview</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <ModernStatCard 
            title="Total Revenue" 
            value="€124,592" 
            change="+12.5%" 
            trend="up" 
            icon={Wallet}
            color="from-blue-500 to-cyan-500"
          />
          <ModernStatCard 
            title="Active Orders" 
            value="24" 
            change="+3" 
            trend="up" 
            icon={FolderKanban}
            color="from-purple-500 to-pink-500"
          />
          <ModernStatCard 
            title="Total Customers" 
            value="156" 
            change="+8%" 
            trend="up" 
            icon={HeartHandshake}
            color="from-green-500 to-emerald-500"
          />
          <ModernStatCard 
            title="Completion Rate" 
            value="94%" 
            change="+5%" 
            trend="up" 
            icon={Gauge}
            color="from-orange-500 to-red-500"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ModernOrderTable />
          </div>
          <div className="space-y-6">
            <QuickStats />
            <ActivityFeed />
          </div>
        </div>

        {/* Bottom Section - Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-yellow-400" />
                <h3 className="text-white font-semibold">Profit Margin</h3>
              </div>
              <Award className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">32.5%</p>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '32.5%' }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">↑ 5% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <h3 className="text-white font-semibold">Satisfaction Score</h3>
              </div>
              <HeartHandshake className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">4.8 / 5.0</p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">Based on 124 reviews</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-400" />
                <h3 className="text-white font-semibold">AI Automation</h3>
              </div>
              <Rocket className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-2">85% Automated</p>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">12 processes automated</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}