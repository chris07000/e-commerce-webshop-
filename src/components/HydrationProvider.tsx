'use client'

import { useEffect, ReactNode } from 'react'
import { useCartStore } from '@/store/cart-store'

interface HydrationProviderProps {
  children: ReactNode
}

export default function HydrationProvider({ children }: HydrationProviderProps) {
  const setHydrated = useCartStore((state) => state.setHydrated)

  useEffect(() => {
    // Trigger hydration after the component mounts
    setHydrated()
  }, [setHydrated])

  return <>{children}</>
} 