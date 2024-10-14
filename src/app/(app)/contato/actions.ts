'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const messageSchema = z.object({
  name: z.string().max(50),
  email: z.string().email().max(50),
  message: z.string().max(200),
})

export type Message = z.infer<typeof messageSchema>

export async function saveMessage(data: FormData) {
  const result = messageSchema.safeParse(Object.fromEntries(data))
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  try {
    await prisma.message.create({
      data: {
        ...result.data,
      },
    })
  } catch (error: any) {
    const message = error.message
    console.error(message)
    return { success: false, message, errors: null }
  }

  return { success: true, message: null, errors: null }
}
