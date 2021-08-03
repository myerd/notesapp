import axios from 'axios'
const baseUrl = '/api/note'

const getNotes = async token => {
  const response = await axios.get(baseUrl, {
    headers: {
      'token': token
    }
  })
  return response.data
}

const addNote = async (note, token) => {
  const response = await axios.post(baseUrl, note, {
    headers: {
      'token': token
    }
  })
  return response.data
}


const deleteNote = async (id, token) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      'token': token
    }
  })
    .then(() => {

    })
    .catch((error) => {
      console.log(error)
    })
}

const editNote = async (id, note, token) => {
  const response = await axios.put(`${baseUrl}/${id}`, note, {
    headers: {
      'token': token
    }
  })
  return response.data
}

export default { getNotes, editNote, deleteNote, addNote }