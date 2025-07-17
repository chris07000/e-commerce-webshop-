import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
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
          </div>
        </div>
      </header>

      {/* Not Found Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="text-6xl font-bold text-white opacity-50" style={{ color: '#fafafa' }}>404</div>
          <h1 className="text-3xl font-bold text-white" style={{ color: '#fafafa' }}>Product Not Found</h1>
          <p className="text-white opacity-75 max-w-md mx-auto" style={{ color: '#d0d0d0' }}>
            Sorry, we couldn't find the product you're looking for. It might have been moved or no longer exists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collection
            </Link>
            <Link 
              href="/products" 
              className="border border-border text-white px-6 py-3 rounded-lg hover:border-primary transition-colors"
              style={{ borderColor: '#2a2a2a', color: '#fafafa' }}
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 