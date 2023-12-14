import { useState } from 'react'

const BlogListForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlogList = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
      <h2>Enter a new blog</h2>
      <form onSubmit={addBlogList}>
        title: <input value={title} onChange={(event) => setTitle(event.target.value)} /><br />
        author: <input value={author} onChange={(event) => setAuthor(event.target.value)} /><br />
        url: <input value={url} onChange={(event) => setUrl(event.target.value)} /><br />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogListForm