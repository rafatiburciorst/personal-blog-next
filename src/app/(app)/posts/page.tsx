import { PostForm } from './post-form'

export default function CreatePost() {
  return (
    <div className="flex flex-col justify-start items-center h-screen p-20">
      <div>
        <h1 className="text-center font-bold">Novo Post</h1>
        <PostForm />
      </div>
    </div>
  )
}
