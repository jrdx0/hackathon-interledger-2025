import axios from 'axios'

const token = localStorage.getItem('SESSION_TOKEN') ?? ''
const baseURL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

export { api }
