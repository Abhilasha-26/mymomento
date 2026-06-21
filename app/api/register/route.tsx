import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/database/index'
import User from '@/lib/database/models/user.model'

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const { firstName, lastName, username, email, password } = await req.json()

    // basic validation
    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // check email
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    // check username
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      photo: ''
    })

    // create token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        username: user.username
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({ 
      message: 'Registered successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      }
    }, { status: 201 })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    return response

  } catch (err) {
  console.error("❌ REGISTER ERROR:", err);

  return NextResponse.json(
    {
      error: err instanceof Error ? err.message : String(err),
    },
    { status: 500 }
  );
}
}