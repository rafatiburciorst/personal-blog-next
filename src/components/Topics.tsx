import Image from 'next/image'
import Link from 'next/link'

export type TopicProps = {
  id: string
  title: string
  prev: string
  image: string
  date: string
}

export function Topic({ id, title, image, prev, date }: TopicProps) {
  return (
    <Link
      href={`/materia/${id}`}
      className="flex items-center w-[60%] w-max-[60%] w-min-[60%] max-h-[280px] gap-24 border-b-2 p-12 border-zinc-200"
    >
      <div className="flex flex-col flex-1 gap-4">
        <p className="font-extralight">{date}</p>
        <div>
          <span className="font-bold text-2xl text-wrap line-clamp-2">
            {title}
          </span>
        </div>
        <div>
          <span className="font-normal text-base text-wrap line-clamp-3">
            {prev}
          </span>
        </div>
      </div>
      <img src={image} alt="img" width={200} height={180} />
    </Link>
  )
}
