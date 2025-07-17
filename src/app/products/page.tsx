'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Search, User, Heart } from 'lucide-react'
import { useProductStore } from '@/store/product-store'

// Mock data for all products (should match the data from home page)
const allProducts = [
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
    name: 'Black Oversized',
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

export default function ProductsPage() {
  const { getProductStock, initializeStock, isHydrated } = useProductStore()
  
  // Initialize stock on page load
  useEffect(() => {
    initializeStock()
  }, [initializeStock])
  
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

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" style={{ color: '#d0d0d0' }} />
                <input
                  type="text"
                  placeholder="Search clothing..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', color: '#fafafa' }}
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link href="/products" className="text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
                Shop
              </Link>
              <Link href="/cart" className="relative text-white hover:text-primary transition-colors" style={{ color: '#0a0a0a' }}>
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

      {/* Page Header */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
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
            Shop Collection
          </h1>
          <p className="text-xl text-white opacity-75 mb-8 max-w-2xl mx-auto" style={{ color: '#d0d0d0' }}>
            Discover our complete range of premium streetwear. Each piece is crafted with attention to detail and designed for those who dare to stand out.
          </p>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white" style={{ color: '#fafafa' }}>
              All Products ({allProducts.length})
            </h2>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-white" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', color: '#fafafa' }}>
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product) => {
              const stockData = isHydrated ? getProductStock(product.id) : null
              const currentStock = stockData?.stock || product.stock
              
              return (
                <div key={product.id} className="product-card p-6 group" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
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
                        style={{ backgroundColor: 'rgba(10, 10, 10, 0.8)' }}
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
                  <h3 className="text-lg font-semibold text-white mb-2 hover:text-primary transition-colors cursor-pointer" style={{ color: '#fafafa' }}>{product.name}</h3>
                </Link>
                <p className="text-white opacity-75 text-sm mb-3" style={{ color: '#d0d0d0' }}>{product.description}</p>
                <div className="mb-3">
                  <p className="text-xs text-white opacity-75 mb-1" style={{ color: '#d0d0d0' }}>Available sizes:</p>
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
                  <span className="text-2xl font-bold text-white" style={{ color: '#fafafa' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}>
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary/20" style={{ backgroundColor: '#151515' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ color: '#fafafa' }}>
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white opacity-75 mb-8 max-w-2xl mx-auto" style={{ color: '#d0d0d0' }}>
            Stay tuned for new drops and limited edition pieces. Follow us on social media to be the first to know about new releases.
          </p>
          <Link 
            href="/" 
            className="accent-gradient px-8 py-4 rounded-lg font-medium hover:scale-105 transition-transform duration-200"
            style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-border text-primary-foreground py-12" style={{ backgroundColor: '#000000', borderColor: '#2a2a2a' }}>
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