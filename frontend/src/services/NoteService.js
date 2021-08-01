import axios from 'axios'
const baseUrl = '/api/note'



const getNotes = (token) => {
  axios.get(baseUrl, {
    headers: {
      'token': token
    }
  })
    .then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
}

const addNote = async (note, token) => {
  const response = await axios.post(baseUrl, note, {
    headers: {
      'token': token
    }
  })
  return response.data
}


const deleteNote = async id => {
  return id
}

const editNote = async (id, note, token) => {
  const request = axios.put(`${baseUrl}/${id}`, note, {
    headers: {
      'token': token
    }
  })
  return request.then(response => response.data)
}

export default { getNotes, editNote, deleteNote, addNote }