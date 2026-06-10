<template>
  <div class="flex flex-row items-center justify-between text-white p-6">
    <button
      @click="handleLogout"
      class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-colors"
    >
      Logout
    </button>
    <h1 class="text-2xl font-serif">BeFRAUD.inc</h1>

  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/atm')
}
</script>
