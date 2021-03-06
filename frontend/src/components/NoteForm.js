import React, { useState } from 'react'
import { Button, Input, Form, Label, Modal } from 'semantic-ui-react'

const NoteForm = ({ createNote }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [open, setOpen] = useState(false)

  const nameHandleChange = (event) => {
    setName(event.target.value)
  }

  const descHandleChange = (event) => {
    setDescription(event.target.value)
  }

  const completedHandleChange = () => {
    setCompleted(!completed)
  }


  const addNote = (event) => {
    event.preventDefault()
    createNote({
      name: name,
      description: description,
      completed: completed,
    })
    setOpen(false)
    setName('')
    setDescription('')
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button compact size="small" inverted color="green">Add note</Button>}
    >
      <Modal.Content >
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
              <Input type="textarea"
                name="description"
                onChange={descHandleChange}
                value={description} />
            </Form.Field>
            <Form.Field inline>
              <Label color="black" htmlFor="description">Note completed:</Label>
              <Input type="checkbox"
                name="completed"
                onChange={completedHandleChange}
                value={completed} />
            </Form.Field>
            <Button compact size="mini" inverted color="green" type="submit">Add note</Button>
          </Form>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default NoteForm