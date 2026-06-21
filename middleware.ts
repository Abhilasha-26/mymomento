// middleware.ts  ← root level, outside app/
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up'

  // not logged in + trying to access protected page → redirect to sign-in
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // already logged in + trying to access sign-in/sign-up → redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}

// which routes this middleware runs on
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/sign-in', '/sign-up']
}