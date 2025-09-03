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
        const orderData: any = {
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
          // Create order directly in KV storage (bypass HTTP calls)
          console.log('💾 Saving order directly to KV storage...')
          
          // Generate order ID
          const orderId = `NYO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
          
          // Create new order
          const newOrder = {
            id: orderId,
            userId: 'guest',
            items: orderData.items,
            total: orderData.total,
            status: 'pending',
            shippingAddress: orderData.shippingAddress,
            paymentMethod: orderData.paymentMethod || 'stripe',
            paymentStatus: 'paid',
            paymentIntentId: orderData.paymentIntentId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Optional properties
            ...(orderData.customerEmail && { customerEmail: orderData.customerEmail }),
            ...(orderData.subtotal && { subtotal: orderData.subtotal }),
            ...(orderData.shipping && { shipping: orderData.shipping }),
            ...(orderData.tax && { tax: orderData.tax }),
            currency: orderData.currency || 'USD'
          }
          
          // Save to KV storage
          if (process.env.KV_REST_API_URL) {
            const { kv } = await import('@vercel/kv')
            
            // Get existing orders
            const existingOrders = await kv.get<any[]>('orders') || []
            
            // Add new order
            existingOrders.push(newOrder)
            
            // Save back to KV
            await kv.set('orders', existingOrders)
            
            console.log(`📦 Order created successfully: ${orderId}`)
            console.log(`💰 Total: $${newOrder.total}`)
            console.log(`📋 Items: ${newOrder.items.length}`)
            console.log(`💾 Saved to KV storage`)
          } else {
            console.log('⚠️ KV not available, order not saved (development mode)')
          }
          
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