'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { saveMessage } from './actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFormState } from '@/@hooks/form-state'

export function ContactForm() {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(saveMessage)

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
