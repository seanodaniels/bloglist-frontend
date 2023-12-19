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
        title: <input className="new-title" value={title} onChange={(event) => setTitle(event.target.value)} /><br />
        author: <input className="new-author" value={author} onChange={(event) => setAuthor(event.target.value)} /><br />
        url: <input className="new-url" value={url} onChange={(event) => setUrl(event.target.value)} /><br />
        <button className="submit-new-blog" type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogListForm