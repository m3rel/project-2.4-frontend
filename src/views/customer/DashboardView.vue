<template>
  <h1 class="text-black">customer dashboardddddd</h1>
  <button
        @click="handleLogout"
        class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left"
      >
        Logout
      </button>



</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>