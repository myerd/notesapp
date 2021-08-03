import './App.css'
import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'
import NotesList from './components/NotesList'
import NavBar from './components/NavBar'
import userService from './services/UserService'
import noteService from './services/NoteService'
import { Tab } from 'semantic-ui-react'

const App = () => {

  const [notes, setNotes] = useState([])
  const [completedNotes, setcompleNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const panes = [
    {
      menuItem: { key: 'notes', content: 'Uncompleted Notes', color: 'red' },
      // eslint-disable-next-line react/display-name
      render: () =>
        <Tab.Pane attached={false}>
          <NotesList notes={notes} removeItem={deleteNote} editItem={editNote} />
        </Tab.Pane>,
    },
    {
      menuItem: { key: 'completedNotes', content: 'Completed Notes', color: 'green' },
      // eslint-disable-next-line react/display-name
      render: () =>
        <Tab.Pane attached={false}>
          <NotesList notes={completedNotes} removeItem={deleteNote} editItem={editNote} />
        </Tab.Pane>,
    },
  ]

  useEffect(() => {
    if (user) {
      noteService
        .getNotes(user.token)
        .then(initialNotes => {
          setNotes(initialNotes)
        })
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON !== 'undefined') {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addNote = (noteObject) => {
    noteService
      .addNote(noteObject, user.token)
      .then(returnedNote => {
        returnedNote.completed ?
          setcompleNotes([...completedNotes, returnedNote]) :
          setNotes([...notes, returnedNote])
      })
  }

  const editNote = async (noteObject, noteId) => {
    await noteService
      .editNote(noteId, noteObject, user.token)
      .then((returnedNote) => {
        if (returnedNote.completed) {
          let newArr = [...completedNotes]
          completedNotes.filter((note, index) => {
            if (note._id === returnedNote._id) {
              newArr[index] = returnedNote

            }
          })
          setcompleNotes(newArr)
        } else {
          let newArr = [...notes]
          notes.filter((note, index) => {
            if (note._id === returnedNote._id) {
              newArr[index] = returnedNote
            }
          })
          setNotes(newArr)
        }
      })
  }

  const deleteNote = async (id) => {
    await noteService.deleteNote(id, user.token)
      .then(() => {
        setNotes([])
        handleNotes(user)
      })
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      await userService.register({
        username, password
      })
    } catch (exception) {
      setErrorMessage('ERROR')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      handleNotes(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogout = () => {
    userService.logout(user.token)
    localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setNotes(null)
    setUsername('')
  }

  const handleNotes = async (user) => {
    let data = await noteService.getNotes(user.token)
    setNotes(data.filter(note => !note.completed))
    setcompleNotes(data.filter(note => note.completed))
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const registerForm = () => (
    <RegisterForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleRegister={handleRegister}
    />
  )

  const noteForm = () => (
    <NoteForm createNote={addNote} />
  )

  return (
    <div className='wrapper'>
      <div className='topLeftCorner'>
        <h1>Notes Appi</h1>
      </div>
      <div className='header'>
        <Notification message={errorMessage} />
        <NavBar user={user} handleLogout={handleLogout} loginForm={loginForm} registerForm={registerForm} noteForm={noteForm} />
      </div>
      <div className='content'>
        {username}
        <Tab menu={{
          inverted: true,
          attached: true,
          tabular: true,
          pointing: false,
          secondary: true
        }} panes={panes}>
        </Tab>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )

}

export default App
