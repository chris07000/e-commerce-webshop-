'use client'

import React, { useState, useEffect } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface AdminAuthProps {
  children: React.ReactNode
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if already authenticated on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsAuthenticated(true)
        sessionStorage.setItem('admin_authenticated', 'true')
        setPassword('')
      } else {
        setError(data.error || 'Incorrect password')
      }
    } catch (err) {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
  }

  if (isAuthenticated) {
    return (
      <div>
        {/* Logout button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="w-full max-w-md">
        <div className="bg-secondary/20 rounded-lg p-8" style={{ backgroundColor: '#1a1a1a' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#2a2a2a' }}>
              <Lock className="h-8 w-8 text-white" style={{ color: '#fafafa' }} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2" style={{ color: '#fafafa' }}>
              Admin Access
            </h1>
            <p className="text-white opacity-75" style={{ color: '#d0d0d0' }}>
              Enter password to access order management
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2" style={{ color: '#fafafa' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent"
                  style={{ 
                    backgroundColor: '#2a2a2a', 
                    borderColor: '#3a3a3a', 
                    color: '#fafafa' 
                  }}
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-50 hover:opacity-75"
                  style={{ color: '#8a8a8a' }}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ backgroundColor: '#fafafa', color: '#0a0a0a' }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-white opacity-60 text-xs" style={{ color: '#8a8a8a' }}>
              This area is restricted to authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
