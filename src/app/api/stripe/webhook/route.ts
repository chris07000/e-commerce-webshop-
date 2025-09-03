import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.log(`❌ Webhook signature verification failed:`, err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`✅ Payment succeeded: ${paymentIntent.id}`)
      
      try {
        // Extract cart data from metadata
        const metadata = paymentIntent.metadata
        let cartItems = []
        
        if (metadata.cartData) {
          try {
            cartItems = JSON.parse(metadata.cartData)
          } catch (parseError) {
            console.error('Failed to parse cart data:', parseError)
          }
        }

        // Create order data from payment intent
        const orderData = {
          paymentIntentId: paymentIntent.id,
          items: cartItems.map((item: any) => ({
            id: `${item.id}-${item.size || 'default'}-${item.color || 'default'}-${Date.now()}`,
            product: {
              id: item.id,
              name: item.name,
              price: item.price,
              image: '', // Will need to be fetched separately if needed
              category: '',
              stock: 0
            },
            quantity: item.qty,
            size: item.size,
            color: item.color
          })),
          total: paymentIntent.amount / 100, // Convert from cents
          subtotal: paymentIntent.amount / 100,
          shipping: 0, // Would need to be calculated
          tax: 0,
          currency: paymentIntent.currency.toUpperCase(),
          shippingAddress: {
            id: 'temp',
            name: 'Customer',
            street: 'Address will be filled from Stripe',
            city: 'Unknown',
            postalCode: 'Unknown',
            country: metadata.shippingCountry || 'Unknown'
          },
          customerEmail: metadata.customerEmail,
          paymentMethod: 'stripe',
          paymentStatus: 'paid'
        }

        // Create order directly in webhook (no HTTP call needed)
        console.log(`🔄 Creating order for payment intent: ${paymentIntent.id}`)
        console.log(`📊 Order data:`, JSON.stringify(orderData, null, 2))
        
        try {
          // Import the order creation logic directly
          const { promises: fs } = await import('fs')
          const path = await import('path')
          
          const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')
          
          // Ensure data directory exists
          const dataDir = path.join(process.cwd(), 'data')
          try {
            await fs.access(dataDir)
          } catch {
            await fs.mkdir(dataDir, { recursive: true })
          }
          
          // Read existing orders
          let orders = []
          try {
            const data = await fs.readFile(ORDERS_FILE, 'utf8')
            orders = JSON.parse(data)
          } catch {
            // File doesn't exist yet, start with empty array
          }
          
          // Generate order ID
          const orderId = `NYO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
          
          // Create new order
          const newOrder = {
            id: orderId,
            userId: orderData.userId || 'guest',
            items: orderData.items,
            total: orderData.total,
            status: 'pending',
            shippingAddress: orderData.shippingAddress,
            paymentMethod: orderData.paymentMethod || 'stripe',
            paymentStatus: 'paid',
            paymentIntentId: orderData.paymentIntentId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,
            subtotal: orderData.subtotal,
            shipping: orderData.shipping,
            tax: orderData.tax,
            currency: orderData.currency || 'USD'
          }
          
          // Add to orders array
          orders.push(newOrder)
          
          // Write back to file
          await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2))
          
          console.log(`📦 Order created successfully: ${orderId}`)
          console.log(`💰 Total: $${newOrder.total}`)
          console.log(`📋 Items: ${newOrder.items.length}`)
          console.log(`📁 Saved to: ${ORDERS_FILE}`)
          
          // TODO: Send confirmation email
          // TODO: Update inventory
          // TODO: Notify admin
          
        } catch (orderError) {
          console.error('❌ Failed to create order:', orderError)
          console.error('📊 Order data that failed:', JSON.stringify(orderData, null, 2))
        }
        
      } catch (error) {
        console.error('Error processing successful payment:', error)
      }
      
      break
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log(`❌ Payment failed: ${failedPayment.id}`)
      
      // Handle failed payment
      // - Log failed payment
      // - Send notification to admin
      
      break
      
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
} 