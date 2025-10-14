import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// 🔒 SECURITY: No fallback password - MUST be set in environment
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// 🔒 SECURITY: Rate limiting to prevent brute force attacks
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

// 🔒 SECURITY: Hash password for comparison (simple but better than plain text)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'nyo_salt_2024').digest('hex')
}

// 🔒 SECURITY: Get client IP for rate limiting
function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const clientIP = getClientIP(request)

    // 🚨 SECURITY: Check if admin password is configured
    if (!ADMIN_PASSWORD) {
      console.error('🚨 SECURITY ALERT: ADMIN_PASSWORD not configured!')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // 🔒 SECURITY: Rate limiting check
    const attempts = loginAttempts.get(clientIP)
    const now = Date.now()
    
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = now - attempts.lastAttempt
      if (timeSinceLastAttempt < LOCKOUT_TIME) {
        const remainingTime = Math.ceil((LOCKOUT_TIME - timeSinceLastAttempt) / 60000)
        console.warn(`🚨 SECURITY: Too many login attempts from ${clientIP}`)
        return NextResponse.json(
          { error: `Too many attempts. Try again in ${remainingTime} minutes.` },
          { status: 429 }
        )
      } else {
        // Reset attempts after lockout period
        loginAttempts.delete(clientIP)
      }
    }

    // 🔒 SECURITY: Hash incoming password and compare
    const hashedPassword = hashPassword(password)
    const hashedAdminPassword = hashPassword(ADMIN_PASSWORD)
    
    if (hashedPassword === hashedAdminPassword) {
      // Success - reset attempts
      loginAttempts.delete(clientIP)
      
      console.log(`✅ Admin login successful from ${clientIP}`)
      return NextResponse.json({ 
        success: true, 
        message: 'Authentication successful' 
      })
    } else {
      // Failed attempt - increment counter
      const currentAttempts = loginAttempts.get(clientIP) || { count: 0, lastAttempt: 0 }
      loginAttempts.set(clientIP, {
        count: currentAttempts.count + 1,
        lastAttempt: now
      })
      
      console.warn(`🚨 SECURITY: Failed login attempt from ${clientIP} (${currentAttempts.count + 1}/${MAX_ATTEMPTS})`)
      
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
