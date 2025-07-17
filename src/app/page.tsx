'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, User, Heart, Award, Globe, Zap } from 'lucide-react'
import CartBadge from '@/components/CartBadge'
import { useProductStore } from '@/store/product-store'

// Mock data for clothing products
const featuredProducts = [
  {
    id: '1',
    name: 'Black Oversized',
    description: 'Premium heavyweight cotton hoodie with NYO branding',
    price: 89.99,
    image: '/nyohoodie.jpg',
    category: 'hoodies',
    stock: 15,
    rating: 4.9,
    reviews: 47,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'NYO White T-shirt',
    description: 'Oversized t-shirt with bold puff print designs, perfect for streetwear style',
    price: 34.99,
    image: '/nyowhitetshirt.jpg',
    category: 'tees',
    stock: 32,
    rating: 4.8,
    reviews: 89,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'NYO Acid Washed Hoodie',
    description: 'Unique acid washed hoodie with vintage streetwear aesthetic',
    price: 95.99,
    image: '/AcidWashedFront.jpg',
    category: 'hoodies',
    stock: 25,
    rating: 4.7,
    reviews: 34,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    name: 'NYO Black Oversized ',
    description: 'Oversized fit t-shirt with premium NYO branding in classic black',
    price: 34.99,
    image: '/BlackOversizedFront.jpg',
    category: 'tees',
    stock: 20,
    rating: 4.6,
    reviews: 67,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  }
]



export default function HomePage() {
  const { getProductStock, initializeStock, isHydrated } = useProductStore()
  
  // Initialize stock on page load
  useEffect(() => {
    initializeStock()
  }, [initializeStock])
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
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
              <span className="text-sm font-normal text-white hidden sm:block">Not Your Ordinary</span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search clothing..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link href="/products" className="text-white hover:text-primary transition-colors">
                Shop
              </Link>
              <CartBadge />
              <Link href="/profile" className="text-white hover:text-primary transition-colors">
                <User className="h-6 w-6" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/collab.png"
            alt="NYO Collaboration Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/nyo.png"
              alt="NYO - Not Your Ordinary"
              width={200}
              height={80}
              className="h-16 w-auto opacity-90"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="nyo-highlight">Not Your Ordinary</span>
            <span className="block text-4xl md:text-5xl mt-2 text-white opacity-90">Streetwear</span>
          </h1>
          <p className="text-xl text-white opacity-85 mb-8 max-w-2xl mx-auto">
            Discover premium streetwear that redefines style and comfort.
            Crafted for those who dare to stand out from the crowd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="accent-gradient px-8 py-4 rounded-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const stockData = isHydrated ? getProductStock(product.id) : null
              const currentStock = stockData?.stock || product.stock
              
              return (
                <div key={product.id} className="product-card p-6 group">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative mb-4 overflow-hidden rounded-lg cursor-pointer">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          // Handle wishlist functionality
                        }}
                      >
                        <Heart className="h-4 w-4 text-white" />
                      </button>
                      {currentStock < 10 && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Only {currentStock} left
                        </div>
                      )}
                  </div>
                </Link>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-white mb-2 hover:text-primary transition-colors cursor-pointer">{product.name}</h3>
                </Link>
                <p className="text-white opacity-75 text-sm mb-3">{product.description}</p>
                <div className="mb-3">
                  <p className="text-xs text-white opacity-75 mb-1">Available sizes:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.slice(0, 4).map((size) => (
                      <span key={size} className="text-xs bg-secondary text-white px-2 py-1 rounded" style={{ backgroundColor: '#2a2a2a', color: '#fafafa' }}>
                        {size}
                      </span>
                    ))}
                    {product.sizes.length > 4 && (
                      <span className="text-xs text-white opacity-75" style={{ color: '#d0d0d0' }}>+{product.sizes.length - 4} more</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/products/${product.id}`}>
                      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
            })}
          </div>
        </div>
      </section>



      {/* Brand Story */}
      <section className="py-16 brand-story">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/nyo.png"
                alt="NYO - Not Your Ordinary"
                width={120}
                height={48}
                className="h-12 w-auto opacity-60"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-8">
              Why Choose NYO?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
                <p className="text-white opacity-75">
                  Every piece is crafted with attention to detail using only the finest materials.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Globe className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Sustainable</h3>
                <p className="text-white opacity-75">
                  We're committed to ethical production and environmental responsibility.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Limited Drops</h3>
                <p className="text-white opacity-75">
                  Exclusive collections that ensure you're always wearing something unique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-border text-primary-foreground py-12">
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
              <p className="text-sm text-white opacity-75">
                Not Your Ordinary streetwear brand. We create premium clothing that redefines urban style.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Customer Service</h4>
              <ul className="space-y-2 text-sm text-white opacity-75">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Refund And Returns Policy</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">About NYO</h4>
              <ul className="space-y-2 text-sm text-white opacity-75">
                <li><Link href="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
              <ul className="space-y-2 text-sm text-white opacity-75">
                <li><Link href="https://www.instagram.com/notyourordinaryclo/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</Link></li>
                <li><Link href="https://x.com/lucidbtc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="https://discord.gg/dEyX6N7W2C" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-white opacity-60">
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