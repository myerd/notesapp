import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'semantic-ui-react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <div>
          username
          <Input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <Input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button size="mini" compact inverted color="green" id="login-button" type="submit">login</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
