'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, User, ArrowLeft, X } from 'lucide-react'

// NYO Lookbook - Professional Model Photoshoot Images
const lookbookImages = [
  {
    id: 1,
    src: '/NYO-Stills (1).jpg',
    alt: 'NYO Model Street Style Look 1',
    category: 'Street',
    title: 'Urban Comfort'
  },
  {
    id: 2,
    src: '/NYO-Stills (3).jpg',
    alt: 'NYO Model Minimal Look',
    category: 'Minimal',
    title: 'Clean Aesthetic'
  },
  {
    id: 3,
    src: '/NYO-Stills (5).jpg',
    alt: 'NYO Model Vintage Style',
    category: 'Vintage',
    title: 'Retro Vibes'
  },
  {
    id: 4,
    src: '/NYO-Stills (7).jpg',
    alt: 'NYO Model Bold Statement',
    category: 'Street',
    title: 'Bold Statement'
  },
  {
    id: 5,
    src: '/NYO-Stills (9).jpg',
    alt: 'NYO Model Collaboration Style',
    category: 'Collab',
    title: 'Limited Edition'
  },
  {
    id: 6,
    src: '/NYO-Stills (11).jpg',
    alt: 'NYO Model Layered Look',
    category: 'Street',
    title: 'Layered Style'
  },
  {
    id: 7,
    src: '/NYO-Stills (13).jpg',
    alt: 'NYO Model Back Design Focus',
    category: 'Details',
    title: 'Back Print Focus'
  },
  {
    id: 8,
    src: '/NYO-Stills (15).jpg',
    alt: 'NYO Model Design Details',
    category: 'Details',
    title: 'Design Details'
  },
  {
    id: 9,
    src: '/NYO-Stills (17).jpg',
    alt: 'NYO Model Urban Style',
    category: 'Street',
    title: 'City Vibes'
  },
  {
    id: 10,
    src: '/NYO-Stills (19).jpg',
    alt: 'NYO Model Minimalist',
    category: 'Minimal',
    title: 'Pure Style'
  },
  {
    id: 11,
    src: '/NYO-Stills (21).jpg',
    alt: 'NYO Model Vintage Look',
    category: 'Vintage',
    title: 'Timeless'
  },
  {
    id: 12,
    src: '/NYO-Stills (23).jpg',
    alt: 'NYO Model Street Fashion',
    category: 'Street',
    title: 'Street Ready'
  },
  {
    id: 13,
    src: '/NYO-Stills (25).jpg',
    alt: 'NYO Model Detail Shot',
    category: 'Details',
    title: 'Focus Details'
  },
  {
    id: 14,
    src: '/NYO-Stills (26).jpg',
    alt: 'NYO Model Final Look',
    category: 'Collab',
    title: 'Signature Style'
  }
]

const categories = ['All', 'Street', 'Minimal', 'Vintage', 'Collab', 'Details']

export default function LookbookPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof lookbookImages[0] | null>(null)

  const filteredImages = selectedCategory === 'All' 
    ? lookbookImages 
    : lookbookImages.filter(img => img.category === selectedCategory)

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
        <div className="max-w-7xl mx-auto">
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
              Lookbook
            </h1>
            <p className="text-lg text-white opacity-75 max-w-2xl mx-auto" style={{ color: '#d0d0d0' }}>
              Discover how NYO pieces come together to create bold, authentic streetwear looks that define urban style.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-white hover:bg-secondary/80'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? '#fafafa' : '#2a2a2a',
                  color: selectedCategory === category ? '#0a0a0a' : '#fafafa'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="group relative aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: '#1a1a1a' }}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="text-xs opacity-75 mb-1" style={{ color: '#d0d0d0' }}>{image.category}</p>
                    <p className="font-semibold" style={{ color: '#fafafa' }}>{image.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-white mb-4" style={{ color: '#fafafa' }}>
              Ready to Create Your Look?
            </h2>
            <p className="text-white opacity-75 mb-8" style={{ color: '#d0d0d0' }}>
              Shop the collection and build your own NYO streetwear style.
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full h-full max-w-6xl max-h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              style={{ color: '#fafafa' }}
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative w-full h-full max-w-4xl max-h-[85vh] rounded-lg overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            <div className="mt-6 text-center bg-black/50 px-6 py-3 rounded-lg">
              <p className="text-sm text-white opacity-75 mb-1" style={{ color: '#d0d0d0' }}>{selectedImage.category}</p>
              <p className="text-xl font-semibold text-white" style={{ color: '#fafafa' }}>{selectedImage.title}</p>
            </div>
          </div>
        </div>
      )}

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