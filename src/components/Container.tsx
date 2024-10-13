import { Topic, type TopicProps } from './Topics'

export function Container({ id, title, prev, image, date }: TopicProps) {
  return (
    <div>
      <Topic date={date} id={id} image={image} prev={prev} title={title} />
    </div>
  )
}
