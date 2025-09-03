import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(params.id)
    
    return NextResponse.json({
      paymentIntent: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        metadata: paymentIntent.metadata
      }
    })
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    return NextResponse.json(
      { error: 'Payment intent not found' },
      { status: 404 }
    )
  }
}
