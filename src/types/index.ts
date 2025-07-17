export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images?: string[]
  category: string
  stock: number
  featured?: boolean
  rating?: number
  reviews?: number
  brand?: string
  tags?: string[]
  discount?: number
  createdAt?: string
  updatedAt?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  size?: string
  color?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  addresses?: Address[]
  orders?: Order[]
}

export interface Address {
  id: string
  name: string
  street: string
  city: string
  postalCode: string
  country: string
  isDefault?: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed'
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  productCount?: number
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface FilterOptions {
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  rating?: number
  sortBy?: 'name' | 'price' | 'rating' | 'newest'
  sortOrder?: 'asc' | 'desc'
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
  client_secret?: string
} 