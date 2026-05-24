<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <label>Email</label>
      <input type="text" id="email" v-model="email">

      <label>Password</label>
      <input type="password" id="password" v-model="password">

       <p v-if="error">{{ error }}</p>

      <input type="submit" value="login">
    </form>
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
    const response = await axios.post('http://localhost:8080/auth/login', {
      email: email.value,
      password: password.value
    })

    authStore.setAuth(response.data.token, response.data.role)  // ← use store
    router.push('/dashboard')

  } catch (err) {
    error.value = 'Invalid email or password'
  }
}
</script>