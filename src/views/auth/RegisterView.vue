<template>
  <div class="h-screen w-screen gradient-bg flex items-center justify-center">
    <div class="flex flex-col items-center">
      <h1 class="text-5xl m-10">Hello! Welcome to <span class="font-serif">BeFRAUD.inc</span></h1>
      <div class="bg-white rounded-2xl shadow-sm p-8 w-80">
        <form @submit.prevent="handleSignUp">
          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              v-model="firstName"
              class="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              v-model="lastName"
              class="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="text"
              v-model="email"
              class="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Phone Number</label>
            <input
              type="text"
              v-model="phoneNumber"
              class="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">BSN</label>
            <input
              type="text"
              v-model="bsn"
              class="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              v-model="password"
              class="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>

          <button
            type="submit"
            class="w-full bg-gray-900 text-white rounded-lg p-2 text-sm font-medium hover:bg-gray-700"
          >
            Sign Up
          </button>

          <p class="text-center text-sm text-gray-500 mt-4">
            Already have an account?
            <router-link to="/login" class="text-gray-900 font-medium">Sign In</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const phoneNumber = ref('')
const bsn = ref('')
const error = ref('')

const handleSignUp = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      phoneNumber: phoneNumber.value,
      bsn: bsn.value,
    })

    router.push('/login')
  } catch (err) {
  const data = err.response?.data
  const firstFieldError = data?.fieldErrors
    ? Object.values(data.fieldErrors)[0]
    : null
  error.value = firstFieldError || data?.message || 'Something went wrong'
}
}
</script>
