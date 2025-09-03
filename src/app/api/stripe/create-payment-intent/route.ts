import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { 
      amount, 
      currency = 'usd',
      cartItems,
      customerEmail,
      shippingAddress 
    } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Prepare metadata for Stripe
    const metadata: { [key: string]: string } = {
      source: 'webshop',
      itemCount: cartItems?.length?.toString() || '0',
    }

    // Add customer email if provided
    if (customerEmail) {
      metadata.customerEmail = customerEmail
    }

    // Add cart items as metadata (Stripe has 500 char limit per value)
    if (cartItems && cartItems.length > 0) {
      // Store essential cart data in metadata
      const cartSummary = cartItems.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        qty: item.quantity,
        price: item.product.price,
        size: item.size,
        color: item.color
      }))
      
      // Store as JSON string (truncated if too long)
      const cartDataString = JSON.stringify(cartSummary)
      metadata.cartData = cartDataString.length > 450 
        ? cartDataString.substring(0, 450) + '...' 
        : cartDataString
    }

    // Add shipping country if provided
    if (shippingAddress?.country) {
      metadata.shippingCountry = shippingAddress.country
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    })

    console.log(`💳 Payment Intent created: ${paymentIntent.id} for $${amount}`)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 