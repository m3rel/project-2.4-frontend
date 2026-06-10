<template>
  <aside class="w-64 h-screen gradient-bg flex flex-col p-6">
    <h1 class="text-2xl m-4">
      <span class="font-serif">BeFRAUD.inc</span>
    </h1>

    <router-link
      :to="{ name: 'customerAccounts' }"
      class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors"
      active-class="bg-white/60 font-medium text-gray-900"
    >
      My accounts
    </router-link>

    <router-link
      :to="{ name: 'customerTransactions' }"
      class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors"
      active-class="bg-white/60 font-medium text-gray-900"
    >
      My transactions
    </router-link>

    <button
      @click="handleLogout"
      class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left"
    >
      Logout
    </button>
  </aside>
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
