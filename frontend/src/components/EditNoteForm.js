import React, { useState } from 'react'
import { Button, Input, Form, Label, Modal } from 'semantic-ui-react'

const EditNoteForm = ({ note, editNote }) => {
  const [name, setName] = useState(note.name)
  const [description, setDescription] = useState(note.description)
  const [completed, setCompleted] = useState(note.completed)
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


  const eNote = (event) => {
    event.preventDefault()
    editNote({
      name: name,
      description: description,
      completed: completed,
    }, note._id)
    setOpen(false)
    setName('')
    setDescription('')
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button compact size="small" inverted color="green">Edit note</Button>}
    >
      <Modal.Content >
        <div>
          <h2>Edit note</h2>
          <Form size="mini" inverted onSubmit={eNote}>
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
            <Button compact size="mini" inverted color="green" type="submit">Save note</Button>
          </Form>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default EditNoteForm