import { 
  useState
} from 'react' 

const ToggleBlogView = ({ blog }) => {
  const [show, setShow] = useState(false)

  const showSummary = { display: show ? '' : 'none' }
  const hideSummary = { display: show ? 'none' : '' }

  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <span className="blogTitle">{blog.title}</span>
      <button style={hideSummary} onClick={() => toggleShow()}>view</button>
      <button style={showSummary} onClick={() => toggleShow()}>hide</button>
      <div style={showSummary}>
        {blog.url}<br />
        {blog.likes}<br />
        {blog.author}        
      </div>     
    </div>
  )

}

export default ToggleBlogView