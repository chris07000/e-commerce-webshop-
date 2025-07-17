'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Download } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { useProductStore } from '@/store/product-store'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const { items, total, clearCart, isHydrated } = useCartStore()
  const { reduceStock } = useProductStore()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Get payment intent from URL params
  const paymentIntent = searchParams.get('payment_intent')

  useEffect(() => {
    // Use real cart data for order confirmation
    const simulateOrderConfirmation = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Convert cart items to order format
      const orderItems = items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.discount 
          ? item.product.price * (1 - item.product.discount / 100)
          : item.product.price,
        size: item.size || 'N/A',
        color: item.color || 'N/A'
      }))
      
      setOrderDetails({
        orderId: 'NYO-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        paymentIntentId: paymentIntent,
        total: total,
        items: orderItems,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      })
      
      // Reduce stock for each purchased item
      items.forEach(item => {
        reduceStock(item.product.id, item.quantity, item.size)
      })
      
      setLoading(false)
      
      // Clear cart after successful order
      clearCart()
    }

    if (paymentIntent && isHydrated) {
      if (items.length > 0) {
        simulateOrderConfirmation()
      } else {
        setLoading(false)
      }
    }
  }, [paymentIntent, items, total, clearCart, isHydrated])

  if (loading || !isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white" style={{ color: '#fafafa' }}>Confirming your order...</p>
        </div>
      </div>
    )
  }

  if (!paymentIntent || !orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <p className="text-white mb-4" style={{ color: '#fafafa' }}>
            {!paymentIntent ? 'Invalid payment session' : 'Order could not be confirmed'}
          </p>
          <Link href="/" className="text-white hover:underline" style={{ color: '#fafafa' }}>
            Back to Home
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ color: '#fafafa' }}>
            Payment Successful!
          </h1>
          <p className="text-xl text-white opacity-75 mb-8" style={{ color: '#d0d0d0' }}>
            Thank you for your order. We've received your payment and will process your order shortly.
          </p>

          {/* Order Details */}
          <div className="bg-secondary/20 rounded-lg p-8 mb-8 text-left" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white" style={{ color: '#fafafa' }}>
                Order Confirmation
              </h2>
              <span className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>
                Order #{orderDetails.orderId}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {orderDetails.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0" style={{ borderColor: '#2a2a2a' }}>
                  <div>
                    <span className="text-white font-medium" style={{ color: '#fafafa' }}>
                      {item.name} {item.size !== 'N/A' && `(Size: ${item.size})`}
                    </span>
                    <p className="text-white opacity-75 text-sm" style={{ color: '#d0d0d0' }}>
                      Quantity: {item.quantity}
                      {item.color !== 'N/A' && ` • Color: ${item.color}`}
                    </p>
                  </div>
                  <span className="text-white font-semibold" style={{ color: '#fafafa' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4" style={{ borderColor: '#2a2a2a' }}>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white" style={{ color: '#fafafa' }}>
                  Total Paid:
                </span>
                <span className="text-2xl font-bold text-white" style={{ color: '#fafafa' }}>
                  ${orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-secondary/10 rounded-lg p-6" style={{ backgroundColor: '#151515' }}>
              <Package className="h-8 w-8 text-white mx-auto mb-3" style={{ color: '#fafafa' }} />
              <h3 className="font-semibold text-white mb-2" style={{ color: '#fafafa' }}>
                Order Processing
              </h3>
              <p className="text-white opacity-75 text-sm" style={{ color: '#d0d0d0' }}>
                We're preparing your items for shipment
              </p>
            </div>

            <div className="bg-secondary/10 rounded-lg p-6" style={{ backgroundColor: '#151515' }}>
              <Truck className="h-8 w-8 text-white mx-auto mb-3" style={{ color: '#fafafa' }} />
              <h3 className="font-semibold text-white mb-2" style={{ color: '#fafafa' }}>
                Shipping
              </h3>
              <p className="text-white opacity-75 text-sm" style={{ color: '#d0d0d0' }}>
                Estimated delivery: {orderDetails.estimatedDelivery}
              </p>
            </div>

            <div className="bg-secondary/10 rounded-lg p-6" style={{ backgroundColor: '#151515' }}>
              <Download className="h-8 w-8 text-white mx-auto mb-3" style={{ color: '#fafafa' }} />
              <h3 className="font-semibold text-white mb-2" style={{ color: '#fafafa' }}>
                Order Updates
              </h3>
              <p className="text-white opacity-75 text-sm" style={{ color: '#d0d0d0' }}>
                We'll send tracking info to your email
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
            >
              Continue Shopping
            </Link>
            <Link 
              href="/"
              className="border border-border text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary/10 transition-colors"
              style={{ borderColor: '#2a2a2a', color: '#fafafa' }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 