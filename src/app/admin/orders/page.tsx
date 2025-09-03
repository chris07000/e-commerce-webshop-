'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Package, 
  Eye, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  DollarSign,
  Calendar,
  User,
  MapPin,
  ArrowLeft
} from 'lucide-react'
import { Order } from '@/types'
import AdminAuth from '@/components/AdminAuth'

function AdminOrdersContent() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      
      if (response.ok) {
        setOrders(data.orders || [])
      } else {
        setError(data.error || 'Failed to fetch orders')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // Refresh orders
        fetchOrders()
      } else {
        alert('Failed to update order status')
      }
    } catch (err) {
      alert('Error updating order')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'processing': return <Package className="h-4 w-4 text-blue-500" />
      case 'shipped': return <Truck className="h-4 w-4 text-purple-500" />
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'processing': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'shipped': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'delivered': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  const totalRevenue = orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.total, 0)

  const orderCounts = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white" style={{ color: '#fafafa' }}>Loading orders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={fetchOrders}
            className="text-white hover:underline" 
            style={{ color: '#fafafa' }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', borderColor: '#2a2a2a' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-white hover:text-gray-300" style={{ color: '#fafafa' }}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Store
              </Link>
              <h1 className="text-2xl font-bold text-white" style={{ color: '#fafafa' }}>
                Order Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>Total Revenue</p>
                <p className="text-xl font-bold text-green-400">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-secondary/20 rounded-lg p-4" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>Total Orders</p>
                <p className="text-2xl font-bold text-white" style={{ color: '#fafafa' }}>{orderCounts.total}</p>
              </div>
              <Package className="h-8 w-8 text-white opacity-50" style={{ color: '#8a8a8a' }} />
            </div>
          </div>

          <div className="bg-secondary/20 rounded-lg p-4" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{orderCounts.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500 opacity-50" />
            </div>
          </div>

          <div className="bg-secondary/20 rounded-lg p-4" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>Processing</p>
                <p className="text-2xl font-bold text-blue-400">{orderCounts.processing}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-secondary/20 rounded-lg p-4" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>Shipped</p>
                <p className="text-2xl font-bold text-purple-400">{orderCounts.shipped}</p>
              </div>
              <Truck className="h-8 w-8 text-purple-500 opacity-50" />
            </div>
          </div>

          <div className="bg-secondary/20 rounded-lg p-4" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>Delivered</p>
                <p className="text-2xl font-bold text-green-400">{orderCounts.delivered}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status 
                  ? 'bg-white text-black' 
                  : 'bg-secondary/20 text-white hover:bg-secondary/30'
              }`}
              style={filter !== status ? { backgroundColor: '#1a1a1a', color: '#fafafa' } : { backgroundColor: '#fafafa', color: '#0a0a0a' }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-secondary/20 rounded-lg overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-16 w-16 text-white opacity-25 mx-auto mb-4" style={{ color: '#8a8a8a' }} />
              <p className="text-white opacity-75" style={{ color: '#d0d0d0' }}>
                {filter === 'all' ? 'No orders found' : `No ${filter} orders found`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/30" style={{ backgroundColor: '#2a2a2a' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ color: '#fafafa' }}>
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ color: '#fafafa' }}>
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ color: '#fafafa' }}>
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ color: '#fafafa' }}>
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ color: '#fafafa' }}>
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ color: '#fafafa' }}>
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider" style={{ color: '#fafafa' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border" style={{ borderColor: '#2a2a2a' }}>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-secondary/10">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-white" style={{ color: '#fafafa' }}>
                              {order.id}
                            </div>
                            <div className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>
                              {order.paymentIntentId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-white opacity-50 mr-2" style={{ color: '#8a8a8a' }} />
                          <div>
                            <div className="text-sm text-white" style={{ color: '#fafafa' }}>
                              {order.customerEmail || 'Guest'}
                            </div>
                            <div className="text-sm text-white opacity-75 flex items-center" style={{ color: '#d0d0d0' }}>
                              <MapPin className="h-3 w-3 mr-1" />
                              {order.shippingAddress.country}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white" style={{ color: '#fafafa' }}>
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-sm font-medium text-white" style={{ color: '#fafafa' }}>
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-white opacity-50 mr-2" style={{ color: '#8a8a8a' }} />
                          <span className="text-sm text-white" style={{ color: '#fafafa' }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {/* Status Update Dropdown */}
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-secondary/20 border border-border rounded px-2 py-1 text-xs text-white"
                            style={{ backgroundColor: '#2a2a2a', borderColor: '#3a3a3a', color: '#fafafa' }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          
                          <button className="text-white hover:text-gray-300 p-1" style={{ color: '#fafafa' }}>
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminOrdersPage() {
  return (
    <AdminAuth>
      <AdminOrdersContent />
    </AdminAuth>
  )
}
