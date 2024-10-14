'use client'
import { useState, useTransition, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { saveMessage } from './actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()

  const [{ success, message, errors }, setFormState] = useState<{
    success: boolean
    message: string | null
    errors: Record<string, string[]> | null
  }>({
    success: false,
    message: null,
    errors: null,
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await saveMessage(data)
      setFormState(state)
      form.reset()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full px-16">
      {success === false && message && (
        <Alert>
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao enviar mensagem</AlertTitle>
          <AlertDescription>
            <p>Erro interno, tente mais tarde</p>
          </AlertDescription>
        </Alert>
      )}
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input name="name" id="name" />
        {errors?.name && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" />

        {errors?.email && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="message">Mensagem</Label>
        <Textarea id="message" name="message" />
        {errors?.message && (
          <p className="text-xs text-red-500 dark:text-red-400">
            {errors.message[0]}
          </p>
        )}
      </div>
      <div>
        <Button className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Enviar'}
        </Button>
      </div>
    </form>
  )
}
