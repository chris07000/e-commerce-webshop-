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

        // Create order via API
        const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
        })

        if (orderResponse.ok) {
          const { order } = await orderResponse.json()
          console.log(`📦 Order created successfully: ${order.id}`)
          
          // TODO: Send confirmation email
          // TODO: Update inventory
          // TODO: Notify admin
          
        } else {
          console.error('Failed to create order:', await orderResponse.text())
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