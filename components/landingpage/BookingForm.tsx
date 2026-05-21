'use client'

import { useState } from 'react'
import { 
  X, User, Mail, Phone, MapPin, Calendar, 
  MessageSquare, Building2, Ruler, Hash
} from 'lucide-react'

interface BookingFormProps {
  service: {
    name: string
    icon: any
    color: string
  }
  onClose: () => void
  onSubmit: (data: any, service: any) => void
}

export function BookingForm({ service, onClose, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    projectSize: '',
    projectType: '',
    area: '',
    preferredDate: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData, service)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative max-w-3xl w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/20 shadow-2xl my-8">
        
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/95 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
              <service.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Book {service.name}</h3>
              <p className="text-sm text-gray-400">Fill in your details to get a free quote</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Personal Information Section */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-400" />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  City/Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Berlin, Germany"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-purple-400" />
              Project Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project Type *
                </label>
                <select
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Institutional">Institutional</option>
                </select>
              </div>

              {/* Project Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project Size/Budget *
                </label>
                <select
                  required
                  value={formData.projectSize}
                  onChange={(e) => setFormData({ ...formData, projectSize: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select budget range</option>
                  <option value="Small (€1k - €10k)">Small (€1k - €10k)</option>
                  <option value="Medium (€10k - €50k)">Medium (€10k - €50k)</option>
                  <option value="Large (€50k - €100k)">Large (€50k - €100k)</option>
                  <option value="Enterprise (€100k+)">Enterprise (€100k+)</option>
                </select>
              </div>

              {/* Area in sq meters */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Area (sq meters)
                </label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 500"
                  />
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Preferred Start Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Address *
            </label>
            <textarea
              required
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Street address, building number, postal code, city..."
            />
          </div>

          {/* Additional Message */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Additional Information / Special Requirements
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Any specific requirements, timeline constraints, or additional information..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-gray-300 hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 bg-gradient-to-br ${service.color} rounded-lg text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2`}
            >
              <Calendar className="h-4 w-4" />
              Submit Booking Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}