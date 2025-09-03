import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Order } from '@/types'

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')

// Read orders from file
async function readOrders(): Promise<Order[]> {
  try {
    const data = await fs.readFile(ORDERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Write orders to file
async function writeOrders(orders: Order[]): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

// GET - Retrieve specific order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orders = await readOrders()
    const order = orders.find(o => o.id === params.id)
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error reading order:', error)
    return NextResponse.json(
      { error: 'Failed to read order' },
      { status: 500 }
    )
  }
}

// PUT - Update order status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updateData = await request.json()
    const orders = await readOrders()
    const orderIndex = orders.findIndex(o => o.id === params.id)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    // Update order
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    await writeOrders(orders)
    
    console.log(`✅ Order updated: ${params.id}`)
    
    return NextResponse.json({ 
      success: true, 
      order: orders[orderIndex] 
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
