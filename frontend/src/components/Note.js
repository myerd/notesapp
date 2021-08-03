import React from 'react'
import EditNoteForm from './EditNoteForm'
import { Button, Card } from 'semantic-ui-react'

const Note = ({ note, remove, edit }) => {
  const cardContentStyle = {
    backgroundColor: '#202030',
    height: '150px',
    color: 'white'
  }
  const cardHeaderStyle = {
    backgroundColor: 'black',
    height: '25px',
    color: 'white'
  }
  const cardExtraStyle = {
    backgroundColor: 'black'
  }
  const cardMetaStyle = {
    backgroundColor: '#332244',
    color: 'grey'
  }

  return (
    <Card>
      <Card.Header style={cardHeaderStyle}>{note.name}</Card.Header>
      <Card.Meta style={cardMetaStyle}>{note.user}</Card.Meta>
      <Card.Content style={cardContentStyle}>{note.description}</Card.Content>
      <Card.Content extra style={cardExtraStyle}>
        <Button compact size="mini" inverted color="red" onClick={() => remove(note._id)}>REMOVE</Button>
        <EditNoteForm editNote={edit} note={note} />
      </Card.Content>
    </Card>
  )
}

export default Note