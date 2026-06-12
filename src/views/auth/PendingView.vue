<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center px-8">
    <div class="text-8xl mb-6">🧃</div>
    <h1 class="text-2xl font-medium mb-2">Thanks for signing up!</h1>
    <p class="text-gray-500 mb-6 max-w-sm leading-relaxed">
      Your account is being reviewed by our team. We'll get back to you within 1 business day!!!
    </p>
    <div
      class="flex items-center gap-2 text-sm text-gray-400 border border-gray-100 rounded-xl px-4 py-2 mb-8"
    >
      <span>⏳</span> Pending approval
    </div>
    <button
      @click="logout"
      class="text-sm text-gray-500 border border-gray-200 rounded-lg px-5 py-2 hover:bg-gray-50 transition-colors"
    >
      Log out
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
