import { Separator } from '@/components/ui/separator'
import { ContactForm } from './contact-form'

export default function Contat() {
  return (
    <div className="flex justify-evenly h-screen">
      <div className="w-full flex items-center justify-center">
        ALGUMA COISA
      </div>
      <Separator orientation="vertical" className="bg-zinc-200 text-zinc-200" />
      <div className="w-full flex items-center justify-center flex-col">
        <h1>CONTATO</h1>
        <ContactForm />
      </div>
    </div>
  )
}
