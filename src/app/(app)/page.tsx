import { Container } from '@/components/Container'
import { getPosts } from './actions'

export default async function App() {
  const posts = await getPosts()

  return (
    <div>
      {posts.map(post => (
        <Container
          id={post.id}
          date={new Intl.DateTimeFormat('pt-BR').format(post.date)}
          image={post.imageUrl}
          prev={post.post}
          title={post.title}
          key={post.id}
        />
      ))}
    </div>
  )
}
