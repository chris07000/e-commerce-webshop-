'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProductStock {
  id: string
  stock: number
  sizeStock: {
    [size: string]: number
  }
}

interface ProductStoreState {
  stockData: ProductStock[]
  isHydrated: boolean
  initializeStock: () => void
  reduceStock: (productId: string, quantity: number, size?: string) => void
  getProductStock: (productId: string) => ProductStock | undefined
  setHydrated: () => void
}

// Initial stock data (matches the products)
const initialStockData: ProductStock[] = [
  {
    id: '1',
    stock: 15,
    sizeStock: {
      'XS': 10,
      'S': 18,
      'M': 28,
      'L': 25,
      'XL': 15
    }
  },
  {
    id: '2',
    stock: 32,
    sizeStock: {
      'XS': 10,
      'S': 28,
      'M': 43,
      'L': 30,
      'XL': 15
    }
  },
  {
    id: '3',
    stock: 25,
    sizeStock: {
      'XS': 10,
      'S': 19,
      'M': 29,
      'L': 25,
      'XL': 15
    }
  },
  {
    id: '4',
    stock: 20,
    sizeStock: {
      'XS': 10,
      'S': 28,
      'M': 43,
      'L': 30,
      'XL': 15
    }
  }
]

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set, get) => ({
      stockData: initialStockData,
      isHydrated: false,
      
      setHydrated: () => {
        set({ isHydrated: true })
      },
      
      initializeStock: () => {
        const currentStock = get().stockData
        if (currentStock.length === 0) {
          set({ stockData: initialStockData })
        }
      },
      
      reduceStock: (productId: string, quantity: number, size?: string) => {
        const stockData = get().stockData
        const updatedStock = stockData.map(item => {
          if (item.id === productId) {
            // Reduce overall stock
            const newStock = Math.max(0, item.stock - quantity)
            
            // Reduce size-specific stock if size is provided
            let newSizeStock = { ...item.sizeStock }
            if (size && newSizeStock[size] !== undefined) {
              newSizeStock[size] = Math.max(0, newSizeStock[size] - quantity)
            }
            
            return {
              ...item,
              stock: newStock,
              sizeStock: newSizeStock
            }
          }
          return item
        })
        
        set({ stockData: updatedStock })
      },
      
      getProductStock: (productId: string) => {
        return get().stockData.find(item => item.id === productId)
      }
    }),
    {
      name: 'product-stock-storage',
      partialize: (state) => ({
        stockData: state.stockData
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated()
        }
      },
    }
  )
) 