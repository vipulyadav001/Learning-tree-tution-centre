'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PremiumPage() {
  const [showQR, setShowQR] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handlePayment = () => {
    setShowQR(true)
    // Simulate payment processing with 1 minute timeout
    setTimeout(() => {
      router.push('/courses')
    }, 60000) // 60 seconds = 1 minute
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {!showQR ? (
            <div className="p-8">
              <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Upgrade to Premium
              </h1>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Access to all premium courses</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Exclusive study materials</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">24/7 doubt solving support</span>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-5xl font-bold mb-2">₹1,999</div>
                <div className="text-gray-600">One-time payment</div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Pay with UPI
              </button>
            </div>
          ) : (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-6">Scan QR Code to Pay</h2>
              <div className="w-64 h-64 mx-auto rounded-lg mb-6 overflow-hidden">
                <Image 
                  src="/premium/QR_code.jpeg"
                  alt="UPI Payment QR Code"
                  width={256}
                  height={256}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-lg text-gray-600 animate-pulse">
                You will be redirected once the payment is processed...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
