'use server'

import { prisma } from '@/lib/prisma'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import type { Post } from './post-form'

export type TokenPayload = {
  sub: string
  iat: number
  exp: number
}

export async function savePost(data: Post) {
  const token = cookies().get('token')

  if (!token) throw new Error('User unauthenticated')

  const decoded = jwt.decode(token.value) as TokenPayload

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.sub,
    },
  })

  if (!user) throw new Error('User unauthenticated')

  await prisma.post.create({
    data: {
      title: data.title,
      post: data.post,
      imageUrl: data.image_url,
      date: new Date(),
      authorId: user.id,
    },
  })
}
