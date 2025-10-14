'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, User, ArrowLeft } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', borderColor: '#2a2a2a' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
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

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link href="/products" className="text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
                Shop
              </Link>
              <Link href="/cart" className="relative text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
                <ShoppingCart className="h-6 w-6" style={{ color: '#0a0a0a' }} />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="/profile" className="text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
                <User className="h-6 w-6" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image
                src="/nyo.png"
                alt="NYO - Not Your Ordinary"
                width={120}
                height={48}
                className="h-12 w-auto opacity-60"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ color: '#fafafa' }}>
              Contact
            </h1>
          </div>

          {/* Contact Information */}
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-8" style={{ color: '#fafafa' }}>
              Get in Touch
            </h2>
            <p className="text-xl text-white mb-4" style={{ color: '#fafafa' }}>
              team@lucidwear.io
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-border text-primary-foreground py-12 mt-16" style={{ backgroundColor: '#000000', borderColor: '#2a2a2a' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/nyo.png"
                  alt="NYO - Not Your Ordinary"
                  width={80}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>
                Not Your Ordinary streetwear brand. We create premium clothing that redefines urban style.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white" style={{ color: '#fafafa' }}>Customer Service</h4>
              <ul className="space-y-2 text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Refund And Returns Policy</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white" style={{ color: '#fafafa' }}>About NYO</h4>
              <ul className="space-y-2 text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>
                <li><Link href="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white" style={{ color: '#fafafa' }}>Follow Us</h4>
              <ul className="space-y-2 text-sm text-white opacity-75" style={{ color: '#d0d0d0' }}>
                <li><Link href="https://www.instagram.com/notyourordinaryclo/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</Link></li>
                <li><Link href="https://x.com/lucidbtc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="https://discord.gg/dEyX6N7W2C" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-white opacity-60" style={{ borderColor: '#2a2a2a', color: '#8a8a8a' }}>
            <p className="mb-3">&copy; 2025 NYO - Not Your Ordinary. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-2 opacity-50">
              <span className="text-xs">Powered and built by</span>
              <Image
                src="/tiger.jpg"
                alt="Bitcoin Tiger Collective"
                width={20}
                height={20}
                className="w-5 h-5 rounded-sm opacity-80"
              />
              <span className="text-xs font-medium">Bitcoin Tiger Collective</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
