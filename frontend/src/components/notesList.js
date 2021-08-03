import React from 'react'
import { Card } from 'semantic-ui-react'
import Note from './Note'

const NotesList = ({ notes, removeItem, editItem }) => {
  let not
  if (notes === null) {
    not = []
  }
  else {
    not = notes.map((note, index) =>
      <Note key={note._id} note={note} index={index} remove={removeItem} edit={editItem} />
    )
  }
  return (
    <div >
      <Card.Group centered>
        {not}
      </Card.Group>
    </div>
  )
}


export default NotesList