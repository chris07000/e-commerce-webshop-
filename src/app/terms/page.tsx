'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, User, ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
          <div className="flex justify-center mb-8">
            <Image
              src="/nyo.png"
              alt="NYO - Not Your Ordinary"
              width={120}
              height={48}
              className="h-12 w-auto opacity-60"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center" style={{ color: '#fafafa' }}>
            Terms and Conditions
          </h1>
          
          <div className="space-y-8">
            <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
              <strong>Last updated: December 2024</strong>
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Agreement to Terms
              </h2>
              <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Use License
              </h2>
              <p className="text-white opacity-85 leading-relaxed mb-4" style={{ color: '#d0d0d0' }}>
                Permission is granted to temporarily download one copy of the materials on NYO's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-white opacity-85 leading-relaxed space-y-2" style={{ color: '#d0d0d0' }}>
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Products and Services
              </h2>
              <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
                All products and services are subject to availability. We reserve the right to discontinue any product or service at any time. Prices are subject to change without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Payment Terms
              </h2>
              <p className="text-white opacity-85 leading-relaxed mb-4" style={{ color: '#d0d0d0' }}>
                Payment is due at the time of purchase. We accept major credit cards and other payment methods as indicated on our website. By providing payment information, you:
              </p>
              <ul className="list-disc list-inside text-white opacity-85 leading-relaxed space-y-2" style={{ color: '#d0d0d0' }}>
                <li>Represent that you are authorized to use the payment method</li>
                <li>Authorize us to charge the payment method for the total amount</li>
                <li>Agree to pay any additional charges that may apply</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Shipping and Delivery
              </h2>
              <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
                We will make every effort to ship orders within the timeframe indicated on our website. However, we are not responsible for delays caused by shipping carriers, customs, or other factors beyond our control.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Intellectual Property
              </h2>
              <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
                All content on this website, including text, graphics, logos, images, and software, is the property of NYO and is protected by copyright and other intellectual property laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Limitation of Liability
              </h2>
              <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
                In no event shall NYO be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NYO's website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Privacy Policy
              </h2>
              <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our website, to understand our practices.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Governing Law
              </h2>
              <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which NYO operates.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
                Changes to Terms
              </h2>
              <p className="text-white opacity-85 leading-relaxed" style={{ color: '#d0d0d0' }}>
                We reserve the right to revise these terms and conditions at any time. By using this website, you are expected to review these terms on a regular basis.
              </p>
            </div>

            <div className="bg-secondary/20 p-6 rounded-lg mt-8" style={{ backgroundColor: '#1a1a1a' }}>
              <p className="text-white opacity-85 leading-relaxed text-center" style={{ color: '#d0d0d0' }}>
                If you have any questions about these Terms and Conditions, please contact us at:{' '}
                <a 
                  href="mailto:team@lucidwear.io" 
                  className="text-primary hover:underline font-semibold"
                  style={{ color: '#fafafa' }}
                >
                  team@lucidwear.io
                </a>
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
            >
              Continue Shopping
            </Link>
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