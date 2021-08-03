import React from 'react'
import { Button } from 'semantic-ui-react'

const NavBar = ({ user, handleLogout, loginForm, registerForm, noteForm }) => {

  return (
    <div className='header'>
      {user === null ?
        <div>
          {loginForm()}
          {registerForm()}
        </div> :
        <div className='navBar'>
          <h3>{user.name}</h3>
          <div>
            <Button inverted color="red" size="mini" compact onClick={() => handleLogout()}> Logout</Button>
          </div>
          <div className='navFormButtons'>
            {noteForm()}
          </div>
        </div>
      }
    </div>
  )
}

export default NavBar