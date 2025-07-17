'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '@/components/PaymentForm'
import { useCartStore } from '@/store/cart-store'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const { items, total, itemCount } = useCartStore()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [shippingCountry, setShippingCountry] = useState('GB') // Default to UK
  const [taxRate, setTaxRate] = useState(0.20) // Default UK VAT

  // Redirect to cart if empty
  useEffect(() => {
    if (itemCount === 0) {
      window.location.href = '/cart'
    }
  }, [itemCount])

  // Tax rates by country/region (UK-based business)
  const getTaxRate = (country: string) => {
    if (country === 'GB') {
      return 0.20 // UK VAT 20%
    } else if (country === 'US') {
      return 0.00 // No tax for US customers
    } else if (country === 'CA') {
      return 0.00 // No tax for Canadian customers
    } else if (country === 'AU') {
      return 0.00 // No tax for Australian customers
    } else {
      return 0.00 // No tax for international customers (UK business)
    }
  }

  // Calculate totals (VAT inclusive pricing for UK)
  const subtotal = total // Use cart store total
  const shipping = getShippingCost(shippingCountry)
  
  // For UK: prices include VAT, so we calculate the VAT portion
  // For international: no VAT, prices remain as shown
  let vatAmount = 0
  let subtotalExVat = subtotal
  
  if (shippingCountry === 'GB') {
    // UK: Extract VAT from inclusive price
    vatAmount = subtotal - (subtotal / 1.20) // 20% VAT included
    subtotalExVat = subtotal / 1.20
  }
  
  const orderTotal = subtotal + shipping

  // Get shipping cost based on country (USD pricing from UK)
  function getShippingCost(country: string) {
    if (country === 'GB') {
      return 4.99 // UK domestic shipping
    } else if (country === 'US' || country === 'CA') {
      return 15.99 // North America
    } else {
      return 19.99 // Rest of world
    }
  }

  // Update tax rate when country changes
  const handleCountryChange = (country: string) => {
    setShippingCountry(country)
    setTaxRate(getTaxRate(country))
  }

  // Get shipping region label
  function getShippingRegion(country: string) {
    if (country === 'GB') {
      return 'UK'
    } else if (country === 'US' || country === 'CA') {
      return 'North America'
    } else {
      return 'International'
    }
  }

  // Get tax label
  function getTaxLabel(country: string) {
    if (country === 'GB') {
      return 'UK VAT 20%'
    } else {
      return 'No Tax'
    }
  }

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: orderTotal,
            currency: 'usd'
          })
        })

        const data = await response.json()
        
        if (data.error) {
          setError(data.error)
        } else {
          setClientSecret(data.clientSecret)
        }
      } catch (err) {
        setError('Failed to initialize payment')
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [total])

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#fafafa',
      colorBackground: '#1a1a1a',
      colorText: '#fafafa',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white" style={{ color: '#fafafa' }}>Initializing payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/cart" className="text-white hover:underline" style={{ color: '#fafafa' }}>
            Back to Cart
          </Link>
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
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/nyo.png"
                alt="NYO - Not Your Ordinary"
                width={80}
                height={32}
                className="h-8 w-auto"
                priority
              />
              <span className="text-sm font-normal text-white hidden sm:block" style={{ color: '#fafafa' }}>Not Your Ordinary</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-green-500" />
              <span className="text-sm text-white" style={{ color: '#fafafa' }}>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/cart" className="flex items-center text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-white mb-6" style={{ color: '#fafafa' }}>
              Order Summary
            </h2>
            
            <div className="bg-secondary/20 rounded-lg p-6 mb-6" style={{ backgroundColor: '#1a1a1a' }}>
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-border last:border-b-0" style={{ borderColor: '#2a2a2a' }}>
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium" style={{ color: '#fafafa' }}>{item.product.name}</h3>
                    <p className="text-white opacity-75 text-sm" style={{ color: '#d0d0d0' }}>
                      Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-white font-semibold" style={{ color: '#fafafa' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-white opacity-75" style={{ color: '#d0d0d0' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white opacity-75" style={{ color: '#d0d0d0' }}>
                  <span>Shipping ({getShippingRegion(shippingCountry)})</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {shippingCountry === 'GB' ? (
                  <div className="flex justify-between text-white opacity-75" style={{ color: '#d0d0d0' }}>
                    <span>Subtotal (ex. VAT)</span>
                    <span>${subtotalExVat.toFixed(2)}</span>
                  </div>
                ) : null}
                {shippingCountry === 'GB' ? (
                  <div className="flex justify-between text-white opacity-75" style={{ color: '#d0d0d0' }}>
                    <span>VAT (20% included)</span>
                    <span>${vatAmount.toFixed(2)}</span>
                  </div>
                ) : null}
                <div className="border-t border-border pt-2 flex justify-between text-white font-bold text-lg" style={{ borderColor: '#2a2a2a', color: '#fafafa' }}>
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Tax Information */}
            <div className="bg-secondary/10 rounded-lg p-4 mb-4" style={{ backgroundColor: '#151515' }}>
              <h4 className="text-white font-medium mb-2" style={{ color: '#fafafa' }}>Tax Information</h4>
                             <p className="text-white opacity-75 text-sm" style={{ color: '#d0d0d0' }}>
                 {shippingCountry === 'GB' ? (
                   'Prices include 20% UK VAT. VAT breakdown is shown above.'
                 ) : (
                   'Prices shown are final. No additional tax for international customers.'
                 )}
               </p>
            </div>

            {/* Security Features */}
            <div className="bg-secondary/10 rounded-lg p-4" style={{ backgroundColor: '#151515' }}>
              <div className="flex items-center space-x-3 mb-3">
                <CreditCard className="h-5 w-5 text-green-500" />
                <span className="text-white font-medium" style={{ color: '#fafafa' }}>Secure Payment</span>
              </div>
              <p className="text-white opacity-75 text-sm" style={{ color: '#d0d0d0' }}>
                Your payment information is encrypted and secure. We use Stripe for processing payments.
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-white mb-6" style={{ color: '#fafafa' }}>
              Payment Details
            </h2>
            
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <PaymentForm total={orderTotal} onCountryChange={handleCountryChange} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 