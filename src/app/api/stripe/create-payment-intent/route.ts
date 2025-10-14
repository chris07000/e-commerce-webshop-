import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Server-side product prices (SINGLE SOURCE OF TRUTH)
const SERVER_PRODUCTS = {
  '1': { name: 'Black Oversized', price: 89.99 },
  '2': { name: 'NYO White T-shirt', price: 34.99 },
  '3': { name: 'NYO Acid Washed Hoodie', price: 95.99 },
  '4': { name: 'Black Oversized', price: 34.99 }
} as const

export async function POST(request: NextRequest) {
  try {
    const { 
      amount, 
      currency = 'usd',
      cartItems,
      customerEmail,
      shippingAddress 
    } = await request.json()

    // 🔒 SECURITY: Calculate server-side total instead of trusting frontend
    let serverCalculatedTotal = 0
    
    if (cartItems && Array.isArray(cartItems)) {
      for (const item of cartItems) {
        const productId = item.product?.id
        const quantity = item.quantity || 1
        
        // Get server-side price (SECURE)
        const serverProduct = SERVER_PRODUCTS[productId as keyof typeof SERVER_PRODUCTS]
        
        if (!serverProduct) {
          return NextResponse.json(
            { error: `Invalid product ID: ${productId}` },
            { status: 400 }
          )
        }
        
        // Calculate with server price (not frontend price)
        serverCalculatedTotal += serverProduct.price * quantity
      }
    }

    // 🚨 SECURITY CHECK: Compare frontend amount with server calculation
    const tolerance = 0.01 // Allow 1 cent difference for rounding
    if (Math.abs(amount - serverCalculatedTotal) > tolerance) {
      console.error(`🚨 PRICE MANIPULATION DETECTED!`)
      console.error(`Frontend sent: $${amount}`)
      console.error(`Server calculated: $${serverCalculatedTotal}`)
      
      return NextResponse.json(
        { error: 'Price validation failed' },
        { status: 400 }
      )
    }

    if (!serverCalculatedTotal || serverCalculatedTotal <= 0) {
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
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      try {
        // Store essential cart data in metadata
        const cartSummary = cartItems.map((item: any) => ({
          id: item.product?.id || 'unknown',
          name: item.product?.name || 'unknown',
          qty: item.quantity || 1,
          price: item.product?.price || 0,
          size: item.size || 'N/A',
          color: item.color || 'N/A'
        }))
        
        // Store as JSON string (truncated if too long)
        const cartDataString = JSON.stringify(cartSummary)
        metadata.cartData = cartDataString.length > 450 
          ? cartDataString.substring(0, 450) + '...' 
          : cartDataString
      } catch (cartError) {
        console.warn('Failed to process cart items for metadata:', cartError)
        // Continue without cart metadata if there's an error
      }
    }

    // Add shipping country if provided
    if (shippingAddress?.country) {
      metadata.shippingCountry = shippingAddress.country
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(serverCalculatedTotal * 100), // Use SERVER price, not frontend
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    })

    console.log(`💳 Payment Intent created: ${paymentIntent.id} for $${serverCalculatedTotal}`)

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