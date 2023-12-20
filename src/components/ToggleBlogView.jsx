import {
  useState
} from 'react'


const ToggleBlogView = ({ blog, handleLikeSubmit, handleDeleteSubmit }) => {
  const [show, setShow] = useState(false)

  const showSummary = { display: show ? '' : 'none' }
  const hideSummary = { display: show ? 'none' : '' }

  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <span className="blog-title">{blog.title}</span> by <span className="blog-author">{blog.author}</span>
      <button className="button-view" style={hideSummary} onClick={() => toggleShow()}>view</button>
      <button className="button-hide" style={showSummary} onClick={() => toggleShow()}>hide</button>
      <div style={showSummary}>
        <span className="blog-url">{blog.url}</span><br />
        <span className="blog-likes">{blog.likes}</span><button onClick={handleLikeSubmit} className="button-like" type="submit">Like</button><br />
        <span className="blog-username">{blog.user.name}</span><br />
        <button className="button-delete" onClick={handleDeleteSubmit} type="submit">Delete</button>
      </div>
    </div>
  )
}

export default ToggleBlogView