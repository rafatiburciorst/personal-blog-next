'use client'

import { useFormState } from '@/@hooks/form-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { handleActionLogin } from './actions'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'

export function LoginForm() {
  const [isPending, setIsPending] = useState<boolean>(false)
  const router = useRouter()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    const form = event.currentTarget
    const data = new FormData(form)

    try {
      await handleActionLogin(data)
      router.push('/posts')
    } catch (error) {
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center gap-10 w-80"
    >
      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" />
      </div>
      <div className="w-full">
        <Label htmlFor="email">Senha</Label>
        <Input type="password" name="password" id="password" />
      </div>
      <div className="w-full">
        <Button disabled={isPending} className="w-full">
          {isPending ? 'Entrando...' : 'Entrar'}
        </Button>
      </div>
    </form>
  )
}
