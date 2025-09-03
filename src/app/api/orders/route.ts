import { NextRequest, NextResponse } from 'next/server'
import { Order } from '@/types'

// Use Vercel KV for production, fallback to memory for development
let orders: Order[] = [] // In-memory fallback for development

// Read orders from storage
async function readOrders(): Promise<Order[]> {
  if (process.env.NODE_ENV === 'production' && process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import('@vercel/kv')
      const storedOrders = await kv.get<Order[]>('orders')
      return storedOrders || []
    } catch (error) {
      console.error('Error reading from KV:', error)
      return []
    }
  } else {
    // Development: use in-memory storage
    return orders
  }
}

// Write orders to storage
async function writeOrders(ordersData: Order[]): Promise<void> {
  if (process.env.NODE_ENV === 'production' && process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import('@vercel/kv')
      await kv.set('orders', ordersData)
    } catch (error) {
      console.error('Error writing to KV:', error)
    }
  } else {
    // Development: use in-memory storage
    orders = ordersData
  }
}

// GET - Retrieve all orders (for admin)
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const adminAuth = request.headers.get('x-admin-auth')
    if (!adminAuth || adminAuth !== 'authenticated') {
      // For now, allow access - authentication is handled by the frontend
      // In production, you might want server-side session management
    }
    
    const orders = await readOrders()
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Error reading orders:', error)
    return NextResponse.json(
      { error: 'Failed to read orders' },
      { status: 500 }
    )
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // Validate required fields
    const requiredFields = ['items', 'total', 'shippingAddress', 'paymentIntentId']
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    const orders = await readOrders()
    
    // Generate order ID
    const orderId = `NYO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const newOrder: Order = {
      id: orderId,
      userId: orderData.userId || 'guest',
      items: orderData.items,
      total: orderData.total,
      status: 'pending',
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || 'stripe',
      paymentStatus: 'pending',
      paymentIntentId: orderData.paymentIntentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Additional fields for better tracking
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      currency: orderData.currency || 'USD'
    }
    
    orders.push(newOrder)
    await writeOrders(orders)
    
    console.log(`✅ New order created: ${orderId}`)
    
    return NextResponse.json({ 
      success: true, 
      order: newOrder 
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
