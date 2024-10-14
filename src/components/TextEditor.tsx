'use client'
import ReactQuill from 'react-quill-new'
import 'react-quill/dist/quill.snow.css'

interface TextEditorProps {
  onChange: (content: string) => void
}

const TextEditor = ({ onChange }: TextEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      onChange={onChange}
      placeholder="Escreva aqui..."
      style={{ height: '300px' }}
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ align: [] }],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'font',
        'list',
        'bold',
        'italic',
        'underline',
        'strike',
        'link',
        'image',
        'align',
      ]}
    />
  )
}

export default TextEditor
