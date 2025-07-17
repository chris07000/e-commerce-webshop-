'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  total: number
  itemCount: number
  isHydrated: boolean
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getItemById: (itemId: string) => CartItem | undefined
  setHydrated: () => void
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.product.discount 
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price
    return total + (price * item.quantity)
  }, 0)
}

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isHydrated: false,
      
      setHydrated: () => {
        set({ isHydrated: true })
      },
      
      addItem: (product: Product, quantity = 1, size?: string, color?: string) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          item => item.product.id === product.id && 
                  item.size === size && 
                  item.color === color
        )

        if (existingItemIndex > -1) {
          const newItems = [...items]
          newItems[existingItemIndex].quantity += quantity
          set({
            items: newItems,
            total: calculateTotal(newItems),
            itemCount: calculateItemCount(newItems)
          })
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${size || 'default'}-${color || 'default'}-${Date.now()}`,
            product,
            quantity,
            size,
            color
          }
          const newItems = [...items, newItem]
          set({
            items: newItems,
            total: calculateTotal(newItems),
            itemCount: calculateItemCount(newItems)
          })
        }
      },

      removeItem: (itemId: string) => {
        const items = get().items
        const newItems = items.filter(item => item.id !== itemId)
        set({
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems)
        })
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        const items = get().items
        const newItems = items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
        set({
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems)
        })
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0
        })
      },

      getItemById: (itemId: string) => {
        return get().items.find(item => item.id === itemId)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated()
        }
      },
    }
  )
) 