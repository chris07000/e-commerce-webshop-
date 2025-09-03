import { NextRequest, NextResponse } from 'next/server'

// Simple password authentication
// In production, use environment variable and proper hashing
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Simple password check
    // In production, use bcrypt or similar for hashed passwords
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ 
        success: true, 
        message: 'Authentication successful' 
      })
    } else {
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
