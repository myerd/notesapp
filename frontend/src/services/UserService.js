import axios from 'axios'
const baseUrl = '/api/user'

const config = {
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  },
}

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials, config)
  return response.data
}

const register = async user => {
  await axios.post(`${baseUrl}/register`, user)
    .then((res) => {
      return res.data
    }).catch((error) => {
      console.log(error)
    })

}

const logout = user => {
  axios.post(`${baseUrl}/logout`, { data: [] }, {
    headers: {
      'token': user
    }
  })
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      console.log(error)
    })
}

export default { login, register, logout }