import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogListForm from './components/BlogListForm'
import ToggleBlogView from './components/ToggleBlogView'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const bloglistFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(`${user.username} logged in.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
  
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setNotificationMessage(`${user.username} logged out.`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setUsername('')
    setPassword('')    
  }


  const addBloglist = (blogObject) => {
    bloglistFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(o => {
      setBlogs(blogs.concat(o))
      setNotificationMessage(`a new blog "${o.title}" by ${o.author} added`)
    })
    .catch(error => {
      console.log('CREATE ERROR:', error)
    })
    
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            handleSubmit={handleLogin} 
            handleUsernameChange={({ target }) => setUsername(target.value)} 
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username} 
            password={password} 
          />
        </Togglable>
    </div>
    )
  }

  const bloglistForm = () => {
    return (
      <div>
        <div className='loginBox'>
          {user.name} logged in         
          <form onSubmit={handleLogout}>
            <button type="submit">logout</button>
          </form>
        </div>

        
        <div className="blogListElement">
          <Togglable buttonLabel='add new blog listing' ref={bloglistFormRef}>
            <BlogListForm
              createBlog={addBloglist} 
            />   
          </Togglable>   
        </div> 

        <div className="blogListElement">

          {blogs.map(blog => {
            return (
              <div key={blog.id} className="blogShowElement">
                <ToggleBlogView blog={blog} />
              </div>
            )
            })}

          {/* <hr />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )} */}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
      <h2>blogs</h2>

      {user === null ?
        loginForm() :
        bloglistForm()
      }
    </div>
  )
}

export default App