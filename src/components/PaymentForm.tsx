'use client'

import React, { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js'
import { CreditCard, Loader2 } from 'lucide-react'

interface PaymentFormProps {
  total: number
  onCountryChange?: (country: string) => void
}

export default function PaymentForm({ total, onCountryChange }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    })

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred')
      } else {
        setMessage('An unexpected error occurred.')
      }
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-secondary/20 rounded-lg p-6" style={{ backgroundColor: '#1a1a1a' }}>
        <h3 className="text-lg font-semibold text-white mb-4" style={{ color: '#fafafa' }}>
          Shipping Address
        </h3>
        <AddressElement
          options={{
            mode: 'shipping',
            fields: {
              phone: 'always',
            },
          }}
          onChange={(event) => {
            if (event.complete && event.value?.address?.country && onCountryChange) {
              onCountryChange(event.value.address.country)
            }
          }}
        />
      </div>

      {/* Payment Information */}
      <div className="bg-secondary/20 rounded-lg p-6" style={{ backgroundColor: '#1a1a1a' }}>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center" style={{ color: '#fafafa' }}>
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Information
        </h3>
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {/* Error Message */}
      {message && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{message}</p>
        </div>
      )}

      {/* Order Total */}
      <div className="bg-secondary/10 rounded-lg p-4" style={{ backgroundColor: '#151515' }}>
        <div className="flex justify-between items-center">
          <span className="text-white font-medium" style={{ color: '#fafafa' }}>
            Total Amount:
          </span>
          <span className="text-2xl font-bold text-white" style={{ color: '#fafafa' }}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5 mr-2" />
            Complete Payment - ${total.toFixed(2)}
          </>
        )}
      </button>

      {/* Security Notice */}
      <div className="text-center">
        <p className="text-white opacity-60 text-xs" style={{ color: '#8a8a8a' }}>
          Your payment information is encrypted and secure. <br />
          Powered by Stripe - PCI DSS Level 1 compliant.
        </p>
      </div>
    </form>
  )
} 