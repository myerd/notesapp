import axios from 'axios'

export const getNotes = (token) => {
    axios.get('/api/note',
        {
            //data
        },
        {
            headers:
            {
                'token': `${token}`
            }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}

export const addNote = async (note) => {

}


export const deleteNote = async (id) => {

}

export const editNote = async (note) => {

}