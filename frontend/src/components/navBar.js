import React from 'react'
import { Button } from 'semantic-ui-react'

const NavBar = ({ user, handleLogout, loginForm, noteForm }) => {

  return (
    <div className='header'>
      {user === null ?
        loginForm() :
        <div>
          <Button inverted color="red" size="mini" compact onClick={() => handleLogout()}> LOGOUT</Button>
          {noteForm()}
        </div>

      }
    </div>
  )
}

export default NavBar