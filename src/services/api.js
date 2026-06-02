import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

// Handle expired/invalid tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

// Auth
export const login = (email, password) => {
  return api.post('/auth/login', { email, password })
}

// Users
export const getUsers = (page = 0, size = 10) => {
  return api.get('/users', { params: { page, size } })
}

export default api
