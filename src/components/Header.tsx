import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

export function Header() {
  return (
    <header className="w-full p-8 bg-slate-900 text-white flex items-center">
      <Link className="flex-1" href="/">
        <span>LOGO</span>
      </Link>
      <div className="flex justify-around gap-8">
        <p>
          <Link href="/contato" className="hover:underline font-bold">
            CONTATO
          </Link>
        </p>
        <Link href="/sobre" className="hover:underline font-bold">
          SOBRE MIM
        </Link>
        <Link href="/login" className="hover:underline font-bold">
          LOGIN
        </Link>
      </div>
    </header>
  )
}
