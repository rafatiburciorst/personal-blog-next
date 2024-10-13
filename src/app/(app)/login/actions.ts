'use server'

import { prisma } from '@/lib/prisma'
import type { Login } from './page'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function login(data: Login) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const comparePassword = await compare(data.password, user.password)

  if (!comparePassword) throw new Error('User or password does not match')

  const token = jwt.sign(
    {
      sub: user.id,
    },
    JWT_SECRET_KEY,
    {
      algorithm: 'HS256',
      expiresIn: '7d',
    }
  )

  cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  const payload = { ...user, password: undefined }

  return {
    payload,
  }
}
