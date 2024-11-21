import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
})

export default api
