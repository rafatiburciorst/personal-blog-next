'use server'

import { prisma } from '@/lib/prisma'
import type { Message } from './page'

export async function saveMessage(data: Message) {
  await prisma.message.create({
    data,
  })
}
