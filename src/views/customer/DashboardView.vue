<template>
  <h1 class="text-black">customer dashboardddddd</h1>
  <button
        @click="handleLogout"
        class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left"
      >
        Logout
      </button>
      <router-link
          :to="`/customer/accounts`"
          class="bg-blue-500 text-white px-3 py-1 rounded"
      >
          Your accounts
      </router-link>



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