/**
 * Stripe Payment Elements Component
 * Handles card input, payment processing, and 3D Secure authentication
 */

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

// Initialize Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

/**
 * Payment Form Component (inside Stripe Elements context)
 */
function CheckoutForm({ amount, currency, orderId, onSuccess, onError }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?order_id=${orderId}`,
        },
        redirect: 'if_required',
      })

      if (error) {
        setErrorMessage(error.message || 'Payment failed')
        if (onError) {
          onError(error)
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        if (onSuccess) {
          onSuccess(paymentIntent)
        }
      }
    } catch (err) {
      const message = err && err.message ? err.message : 'Unexpected error during payment'
      setErrorMessage(message)
      if (onError) {
        onError(err)
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {processing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Processing...
          </span>
        ) : (
          `Pay ${currency} ${amount.toFixed(2)}`
        )}
      </button>
    </form>
  )
}

/**
 * Stripe Payment Component (with Elements wrapper)
 */
export default function StripePayment({
  clientSecret,
  amount,
  currency,
  orderId,
  onSuccess,
  onError,
  locale = 'EN'
}) {
  const [stripeReady, setStripeReady] = useState(false)

  useEffect(() => {
    if (clientSecret) {
      setStripeReady(true)
    }
  }, [clientSecret])

  const options = {
    clientSecret,
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#10b981',
        colorBackground: '#0b1129',
        colorText: '#ffffff',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '12px',
      },
      rules: {
        '.Input': {
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: 'none',
        },
        '.Input:focus': {
          border: '1px solid #10b981',
          boxShadow: '0 0 0 1px #10b981',
        },
        '.Label': {
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '14px',
          fontWeight: '500',
        },
      },
    },
    locale: locale === 'CN' ? 'zh' : 'en',
  }

  if (!stripeReady || !clientSecret) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-emerald-500"></div>
          <p className="text-white/70">
            {locale === 'CN' ? '正在准备付款...' : 'Preparing payment...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={amount}
        currency={currency}
        orderId={orderId}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  )
}
