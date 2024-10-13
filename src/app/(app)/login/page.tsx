'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import { login } from './actions'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type Login = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const result = loginSchema.safeParse(Object.fromEntries(data))
      if (!result.success) {
        console.error(result.error.flatten().fieldErrors)
        throw new Error()
      }

      await login(result.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      router.push('/posts')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleLogin}
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
          <Button disabled={isLoading} className="w-full">
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </div>
  )
}
