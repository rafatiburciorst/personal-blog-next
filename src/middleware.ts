import { type NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET_KEY)
    const { payload } = await jwtVerify(token.value, secret)
    const id = payload.sub
    if (!id) throw new Error('User unauthenticated')

    return NextResponse.next()
  } catch (err) {
    console.error('Token inválido ou expirado', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/posts/:path*'],
}
