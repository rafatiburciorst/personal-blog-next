'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import { savePost } from './actions'
// import TextEditor from '@/components/TextEditor'

const postSchema = z.object({
  title: z.string(),
  post: z.string(),
  image_url: z.string().url(),
})

export type Post = z.infer<typeof postSchema>

const TextEditor = dynamic(() => import('@/components/TextEditor'), {
  ssr: false,
})

export function PostForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postContent, setPostContent] = useState<string>('')

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    data.set('post', postContent)
    setIsLoading(true)
    try {
      const result = postSchema.safeParse(Object.fromEntries(data))
      if (!result.success) {
        console.error(result.error.flatten().fieldErrors)
        throw new Error('Erro de validação')
      }
      console.log(result.data)
      await savePost(result.data)
    } catch (error) {
      console.error(error)
    } finally {
      form.reset()
      setIsLoading(false)
      router.push('/')
    }
  }
  return (
    <form className="flex flex-col w-[80%] p-10 gap-10">
      <div className="flex flex-col gap-4">
        <Label htmlFor="title">Título</Label>
        <Input name="title" id="title" />
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="post">Mensagem do post</Label>
        <TextEditor onChange={setPostContent} />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Label htmlFor="image_url">URL da imagem</Label>
        <Input name="image_url" id="image_url" />
      </div>
      {/* <div className="text-center">
      <Button disabled={isLoading}>
        {isLoading ? 'Publicando' : 'Publicar'}
      </Button>
    </div> */}
    </form>
  )
}
