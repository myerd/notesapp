import React, { useState } from 'react'
import { Button, Input, Form, Label } from 'semantic-ui-react'

const NoteForm = ({ createNote }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')


  const nameHandleChange = (event) => {
    setName(event.target.value)
  }

  const descHandleChange = (event) => {
    setDescription(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    createNote({
      name: name,
      description: description,
      completed: false,
    })

    setName('')
    setDescription('')
  }


  return (

    <div>
      <h2>Create a new note</h2>

      <Form size="mini" inverted onSubmit={addNote}>
        <Form.Field inline>
          <Label color="black" htmlFor="name">Note name:</Label>
          <Input type="text"
            name="name"
            onChange={nameHandleChange}
            value={name} />
        </Form.Field>
        <Form.Field inline>
          <Label color="black" htmlFor="description">Note desc:</Label>
          <Input type="text"
            name="description"
            onChange={descHandleChange}
            value={description} />
        </Form.Field>
        <Button compact size="mini" inverted color="green" type="submit">Add note</Button>
      </Form>
    </div>

  )
}

export default NoteForm