type Params = {
  params: {
    id: string
  }
}

export default function History({ params }: Params) {
  console.log(params.id)
  return <div>ID: {params.id}</div>
}
