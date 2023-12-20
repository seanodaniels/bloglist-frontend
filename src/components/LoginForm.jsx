const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username" 
            className="login-username" 
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password" 
            className="login-password" 
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-submit" type="submit">login</button>
      </form>
    </div>
  )}

export default LoginForm