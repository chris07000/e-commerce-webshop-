'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Heart, Minus, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart-store'
import { useProductStore } from '@/store/product-store'
import toast from 'react-hot-toast'
import CartBadge from '@/components/CartBadge'

// Mock data for products (should match the data from home page)
const products = [
  {
    id: '1',
    name: 'Black Oversized',
    description: 'Premium heavyweight cotton hoodie with NYO branding',
    fullDescription: 'Our Cotton Heavy Fleece Hoodie is the perfect blend of comfort, durability, and trendy style. Made from premium, thick cotton fleece, this hoodie offers superior warmth without compromising breathability. It features bold puff print designs on both the front and back, adding a modern, streetwear-inspired edge. The classic fit, standard hood (without a drawstring for a sleek look), and spacious kangaroo pocket make it a versatile staple for everyday wear. Available exclusively in black, this hoodie provides unmatched comfort and a fashion-forward, timeless appeal—an essential piece for any wardrobe.',
    price: 89.99,
    image: '/nyohoodie.jpg',
    images: ['/nyohoodie.jpg', '/BlackOversizedback.jpg'], // Multiple images
    category: 'hoodies',
    stock: 15,
    rating: 4.9,
    reviews: 47,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeStock: {
      'XS': 10,
      'S': 18, 
      'M': 28,
      'L': 25,
      'XL': 15
    },
    colors: ['Black'],
    materials: ['100% Organic Cotton', 'Fleece Lining', 'Ribbed Cuffs'],
    features: ['Premium heavyweight cotton', 'Soft fleece lining', 'Kangaroo pocket', 'Adjustable hood', 'Ribbed cuffs and hem']
  },
  {
    id: '2',
    name: 'NYO White T-shirt',
    description: 'Oversized t-shirt with bold puff print designs, perfect for streetwear style',
    fullDescription: 'Our Oversized T-Shirt is the ultimate blend of comfort and effortless style. Made from soft, breathable cotton, this tee features a relaxed, oversized fit that drapes perfectly for a laid-back yet polished look. The minimalist design is elevated with a bold puff print logo on the front and a large puff print on the back, giving it a trendy, streetwear-inspired vibe. Whether you\'re pairing it with jeans, layering it under a jacket, or rocking it solo for a casual look, this timeless tee is a wardrobe essential that delivers both comfort and standout style.',
    price: 34.99,
    image: '/nyowhitetshirt.jpg',
    images: ['/nyowhitetshirt.jpg', '/WhiteOversizedBack.jpg'],
    category: 'tees',
    stock: 32,
    rating: 4.8,
    reviews: 89,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeStock: {
      'XS': 10,
      'S': 28, 
      'M': 43,
      'L': 30,
      'XL': 15
    },
    colors: ['White'],
    materials: ['100% Cotton', 'Soft & Breathable', 'Oversized Cut'],
    features: ['Oversized relaxed fit', 'Bold puff print logo front', 'Large puff print back', 'Soft breathable cotton', 'Streetwear inspired design']
  },
  {
    id: '3',
    name: 'NYO Acid Washed Hoodie',
    description: 'Unique acid washed hoodie with vintage streetwear aesthetic',
    fullDescription: 'Make a bold statement with our Acid-Washed Hoodie, crafted from thick, heavy cotton fleece for superior warmth and comfort. Each hoodie undergoes a unique acid-washing process, resulting in a one-of-a-kind, vintage-inspired look with subtle color variations. The relaxed fit, and spacious kangaroo pocket enhance both style and functionality. Featuring an embroidered logo for a premium finish, this hoodie is perfect for layering or wearing on its own. Whether you\'re going for an edgy, retro vibe or simply looking for a cozy staple, this hoodie is the perfect blend of standout style and everyday comfort.',
    price: 95.99,
    image: '/AcidWashedFront.jpg',
    images: ['/AcidWashedFront.jpg', '/AcidWashedBack.jpg'],
    category: 'hoodies',
    stock: 25,
    rating: 4.7,
    reviews: 34,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeStock: {
      'XS': 10,
      'S': 19, 
      'M': 29,
      'L': 25,
      'XL': 15
    },
    colors: ['Acid Wash Black'],
    materials: ['Thick Heavy Cotton Fleece', 'Acid Wash Treatment', 'Premium Finish'],
    features: ['Unique acid-washing process', 'One-of-a-kind vintage look', 'Relaxed comfortable fit', 'Spacious kangaroo pocket', 'Embroidered logo premium finish']
  },
  {
    id: '4',
    name: 'Black Oversized',
    description: 'Oversized fit t-shirt with premium NYO branding in classic black',
    fullDescription: 'Our Oversized T-Shirt is the ultimate blend of comfort and effortless style. Made from soft, breathable cotton, this tee features a relaxed, oversized fit that drapes perfectly for a laid-back yet polished look. The minimalist design is elevated with a bold puff print logo on the front and a large puff print on the back, giving it a trendy, streetwear-inspired vibe. Whether you\'re pairing it with jeans, layering it under a jacket, or rocking it solo for a casual look, this timeless tee is a wardrobe essential that delivers both comfort and standout style.',
    price: 34.99,
    image: '/BlackOversizedFront.jpg',
    images: ['/BlackOversizedFront.jpg', '/tshirtOversizedBack.jpg'],
    category: 'tees',
    stock: 20,
    rating: 4.6,
    reviews: 67,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeStock: {
      'XS': 10,
      'S': 28, 
      'M': 43,
      'L': 30,
      'XL': 15
    },
    colors: ['Black'],
    materials: ['100% Cotton', 'Soft & Breathable', 'Oversized Cut'],
    features: ['Oversized relaxed fit', 'Bold puff print logo front', 'Large puff print back', 'Soft breathable cotton', 'Streetwear inspired design']
  }
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()
  const { getProductStock, isHydrated } = useProductStore()
  const [currentStock, setCurrentStock] = useState(product?.sizeStock || {})
  const [totalStock, setTotalStock] = useState(product?.stock || 0)
  
  // Update stock when product store is hydrated
  useEffect(() => {
    if (isHydrated && product) {
      const stockData = getProductStock(product.id)
      if (stockData) {
        setCurrentStock(stockData.sizeStock)
        setTotalStock(stockData.stock)
      }
    }
  }, [isHydrated, product, getProductStock])

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color')
      return
    }
    
    addItem(product, quantity, selectedSize, selectedColor)
    toast.success(`${product.name} added to cart!`)
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
              <span className="text-sm font-normal text-white hidden sm:block">Not Your Ordinary</span>
            </Link>
            <CartBadge />
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center text-white hover:text-primary transition-colors" style={{ color: '#fafafa' }}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Collection
        </Link>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative bg-card rounded-lg overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <button className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full" style={{ backgroundColor: 'rgba(10, 10, 10, 0.8)' }}>
                <Heart className="h-5 w-5 text-white" />
              </button>
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                  style={{
                    borderColor: selectedImage === index ? '#fafafa' : '#2a2a2a'
                  }}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2" style={{ color: '#fafafa' }}>{product.name}</h1>
              <p className="text-xl text-white opacity-75 mb-4" style={{ color: '#d0d0d0' }}>{product.description}</p>
              <div className="text-3xl font-bold text-white" style={{ color: '#fafafa' }}>
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Full Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white" style={{ color: '#fafafa' }}>Description</h3>
              <p className="text-white opacity-75 leading-relaxed" style={{ color: '#d0d0d0' }}>{product.fullDescription}</p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white" style={{ color: '#fafafa' }}>Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-white opacity-75 flex items-start" style={{ color: '#d0d0d0' }}>
                    <span className="text-primary mr-2" style={{ color: '#fafafa' }}>•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white" style={{ color: '#fafafa' }}>Materials</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span key={index} className="bg-secondary text-white px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#2a2a2a', color: '#fafafa' }}>
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white" style={{ color: '#fafafa' }}>Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size} className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-white hover:border-primary'
                      }`}
                      style={{
                        backgroundColor: selectedSize === size ? '#fafafa' : 'transparent',
                        color: selectedSize === size ? '#0a0a0a' : '#fafafa',
                        borderColor: selectedSize === size ? '#fafafa' : '#2a2a2a'
                      }}
                    >
                      {size}
                    </button>
                    {currentStock && (
                      <span className="text-xs text-white opacity-60 mt-1" style={{ color: '#8a8a8a' }}>
                        {currentStock[size as keyof typeof currentStock]} left
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white" style={{ color: '#fafafa' }}>Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-white hover:border-primary'
                    }`}
                    style={{
                      backgroundColor: selectedColor === color ? '#fafafa' : 'transparent',
                      color: selectedColor === color ? '#0a0a0a' : '#fafafa',
                      borderColor: selectedColor === color ? '#fafafa' : '#2a2a2a'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white" style={{ color: '#fafafa' }}>Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border-2 hover:bg-gray-100 transition-colors"
                  style={{ 
                    backgroundColor: '#fafafa', 
                    borderColor: '#0a0a0a', 
                    color: '#0a0a0a'
                  }}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-semibold text-white" style={{ color: '#fafafa' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
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
            </div>

            {/* Stock Status */}
            <div className="text-white opacity-75" style={{ color: '#d0d0d0' }}>
              {selectedSize ? (
                currentStock && currentStock[selectedSize as keyof typeof currentStock] > 0 ? (
                  <span className="text-green-400">✓ In Stock ({currentStock[selectedSize as keyof typeof currentStock]} available in size {selectedSize})</span>
                ) : (
                  <span className="text-red-400">✗ Size {selectedSize} Out of Stock</span>
                )
              ) : (
                <span className="text-blue-400">Select a size to see availability</span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
              disabled={!selectedSize || !selectedColor || (currentStock && selectedSize !== '' && currentStock[selectedSize as keyof typeof currentStock] === 0)}
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>


          </div>
        </div>
      </div>

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