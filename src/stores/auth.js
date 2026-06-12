import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    status: localStorage.getItem('status') || null,
  }),

  getters: {
    isEmployee: (state) => state.role === 'ROLE_EMPLOYEE',
    isCustomer: (state) => state.role === 'ROLE_CUSTOMER',
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    setAuth(token, role, status) {
      this.token = token
      this.role = role
      this.status = status
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('status', status)

    },
    logout() {
      this.token = null
      this.role = null
      this.status = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('status')
    }
  }
})
