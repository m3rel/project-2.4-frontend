<template>
  <div class="h-screen w-screen gradient-bg flex items-center justify-center">
    <div class="flex flex-col items-center">
      <h1 class="text-5xl m-10">Hello! Welcome to <span class="font-serif">BeFRAUD.inc</span></h1>
      <div class="bg-white rounded-2xl shadow-sm p-8 w-80">
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="text"
              v-model="email"
              placeholder="Value"
              class="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              v-model="password"
              placeholder="Value"
              class="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>

          <button
            type="submit"
            class="w-full bg-gray-900 text-white rounded-lg p-2 text-sm font-medium hover:bg-gray-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  try {
    const response = await axios.post('https://project-2-4-api.onrender.com/auth/login', {
      email: email.value,
      password: password.value,
    })

    authStore.setAuth(response.data.token, response.data.role) // ← use store

    if (response.data.role === 'ROLE_EMPLOYEE') {
      router.push('/employee/dashboard')
    } else {
      router.push('/customer/dashboard')
    }
  } catch (error) {
    error.value = 'Invalid email or password'
  }
}
</script>
