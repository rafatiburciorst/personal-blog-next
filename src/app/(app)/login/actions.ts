'use server'

import type { FormState } from '@/@hooks/form-state'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function handleActionLogin(data: FormData): Promise<FormState> {
  console.log(Object.fromEntries(data))
  const result = loginSchema.safeParse(Object.fromEntries(data))
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const comparePassword = await compare(password, user.password)

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

    return { success: true, message: null, errors: null }
  } catch (error: any) {
    return { success: false, message: error.message, errors: null }
  }
}
