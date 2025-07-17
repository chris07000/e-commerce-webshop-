'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import CartBadge from '@/components/CartBadge'

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCartStore()
  
  // Shipping wordt berekend bij checkout op basis van locatie
  const shippingTBD = true // To Be Determined
  const finalTotal = total // Geen shipping in totaal tot het bekend is

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background" style={{ backgroundColor: '#0a0a0a' }}>
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', borderColor: '#2a2a2a' }}>
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
              <nav className="flex items-center space-x-6">
                <Link href="/products" className="text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
                  Shop
                </Link>
                <CartBadge />
                <Link href="/profile" className="text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
                  <User className="h-6 w-6" />
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-white opacity-30 mx-auto" style={{ color: '#3a3a3a' }} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4" style={{ color: '#fafafa' }}>
              Your cart is empty
            </h1>
            <p className="text-white opacity-75 mb-8" style={{ color: '#d0d0d0' }}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link 
              href="/products"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', borderColor: '#2a2a2a' }}>
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
                          <nav className="flex items-center space-x-6">
                <Link href="/products" className="text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
                  Shop
                </Link>
                <CartBadge />
                <Link href="/profile" className="text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
                  <User className="h-6 w-6" />
                </Link>
              </nav>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/products" className="flex items-center text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
                      <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white" style={{ color: '#fafafa' }}>
                Shopping Cart ({itemCount} items)
              </h1>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-secondary/20 rounded-lg p-6" style={{ backgroundColor: '#1a1a1a' }}>
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate" style={{ color: '#fafafa' }}>
                        {item.product.name}
                      </h3>
                      <p className="text-white opacity-75 text-sm" style={{ color: '#d0d0d0' }}>
                        {item.size && `Size: ${item.size}`} {item.color && ` | Color: ${item.color}`}
                      </p>
                      <p className="text-xl font-bold text-white mt-2" style={{ color: '#fafafa' }}>
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 rounded-lg border-2 hover:bg-gray-100 transition-colors"
                        style={{ 
                          backgroundColor: '#fafafa', 
                          borderColor: '#0a0a0a',
                          color: '#0a0a0a'
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      
                      <span className="text-lg font-semibold text-white min-w-[2rem] text-center" style={{ color: '#fafafa' }}>
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 rounded-lg border-2 hover:bg-gray-100 transition-colors"
                        style={{ 
                          backgroundColor: '#fafafa', 
                          borderColor: '#0a0a0a',
                          color: '#0a0a0a'
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-white" style={{ color: '#fafafa' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors mt-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/20 rounded-lg p-6 sticky top-24" style={{ backgroundColor: '#1a1a1a' }}>
                <h2 className="text-xl font-bold text-white mb-6" style={{ color: '#fafafa' }}>
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-white opacity-75" style={{ color: '#d0d0d0' }}>
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white opacity-75" style={{ color: '#d0d0d0' }}>
                    <span>Shipping</span>
                    <span className="text-sm">Calculated at checkout</span>
                  </div>
                  <div className="text-xs text-white opacity-60 mt-2" style={{ color: '#a0a0a0' }}>
                    <div>UK: $4.99 | North America: $15.99 | Rest of World: $19.99</div>
                  </div>
                  <div className="border-t border-border pt-3" style={{ borderColor: '#2a2a2a' }}>
                    <div className="flex justify-between text-white font-bold text-lg" style={{ color: '#fafafa' }}>
                      <span>Subtotal</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-white opacity-60 mt-1" style={{ color: '#a0a0a0' }}>
                      + shipping (calculated at checkout)
                    </div>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors block text-center"
                  style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-4 text-center">
                  <Link 
                    href="/products"
                    className="text-white opacity-75 hover:opacity-100 transition-colors text-sm"
                    style={{ color: '#d0d0d0' }}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 