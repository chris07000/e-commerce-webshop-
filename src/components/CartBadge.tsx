'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'

export default function CartBadge() {
  const { itemCount, isHydrated } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until the component is mounted and hydrated
  if (!mounted || !isHydrated) {
    return (
      <Link href="/cart" className="relative text-white hover:text-primary transition-colors">
        <ShoppingCart className="h-6 w-6" style={{ color: '#fafafa' }} />
      </Link>
    )
  }

  return (
    <Link href="/cart" className="relative text-white hover:text-primary transition-colors">
      <ShoppingCart className="h-6 w-6" style={{ color: '#fafafa' }} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
          style={{ 
            backgroundColor: '#dc2626', // Rode achtergrond
            color: '#ffffff', // Witte tekst
            border: '2px solid #ffffff', // Witte border
            minWidth: '20px',
            minHeight: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' // Schaduw voor contrast
          }}
        >
          {itemCount}
        </span>
      )}
    </Link>
  )
} 