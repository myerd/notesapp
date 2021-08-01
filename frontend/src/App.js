import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import NotesList from './components/NotesList'
import NavBar from './components/NavBar'
// import { Switch, Route, Redirect } from 'react-router-dom';
import userService from './services/UserService'
import noteService from './services/NoteService'
//import { Tab } from 'semantic-ui-react'

const App = () => {

  const [notes, setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON !== 'undefined') {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .addNote(noteObject, user.token)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const deleteNote = async (id) => {
    await noteService.deleteNote(id, user.token)
      .then(() => setNotes([]),
        handleNotes)
  }

  /* const handleRegister = async (user) => {
  }*/

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
  }

  const handleNotes = async (user) => {
    let data = await noteService.getNotes(user.token)
    setNotes(data)
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div className='wrapper'>
      <div className='topLeftCorner'>
        <h1>Notes Appi</h1>
      </div>
      <div className='header'>
        <Notification message={errorMessage} />
        <NavBar user={user} handleLogout={handleLogout} loginForm={loginForm} noteForm={noteForm} />
      </div>
      <div className='content'>
        <NotesList notes={notes} removeItem={deleteNote} />
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )

}

export default App
