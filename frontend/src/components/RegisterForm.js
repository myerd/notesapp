import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Modal } from 'semantic-ui-react'

const RegisterForm = ({
  handleRegister,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button compact size="small" inverted color="green">Register</Button>}
    >
      <Modal.Content >
        <div>
          <h2>Register</h2>

          <Form onSubmit={handleRegister}>
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
            <Button size="mini" compact inverted color="green" id="login-button" type="submit">Register</Button>
          </Form>
        </div>
      </Modal.Content>
    </Modal>
  )
}

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default RegisterForm
