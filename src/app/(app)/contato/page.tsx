'use client'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { saveMessage } from './actions'

const messageSchema = z.object({
  name: z.string().max(50),
  email: z.string().email().max(50),
  message: z.string().max(200),
})

export type Message = z.infer<typeof messageSchema>

export default function Contat() {
  const [loading, setLoading] = useState<boolean>(false)
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      setLoading(true)
      const result = messageSchema.safeParse(Object.fromEntries(data))
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        console.error(errors)
        throw new Error()
      }

      await saveMessage(result.data)
      form.reset()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex justify-evenly h-screen">
      <div className="w-full flex items-center justify-center">
        ALGUMA COISA
      </div>
      <Separator orientation="vertical" className="bg-zinc-200 text-zinc-200" />
      <div className="w-full flex items-center justify-center flex-col">
        <h1>CONTATO</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 w-full px-16"
        >
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input name="name" id="name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" />
          </div>
          <div>
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" name="message" />
          </div>
          <div>
            <Button className="w-full" disabled={loading}>
              {loading ? 'Aguarde...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
