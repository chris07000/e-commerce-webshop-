import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Order } from '@/types'

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read orders from file
async function readOrders(): Promise<Order[]> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(ORDERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Write orders to file
async function writeOrders(orders: Order[]): Promise<void> {
  await ensureDataDirectory()
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2))
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
