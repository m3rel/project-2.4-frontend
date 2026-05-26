<template>
  <aside class="w-64 h-screen bg-red-300 flex flex-col p-6">
    <h1 class="font-bold text-xl mb-8">BeFRAUD.inc</h1>

    <nav class="flex flex-col">
      <router-link to="/users" class="p-3 rounded-lg hover:bg-red-100" active-class="bg-gray-700">
        Users
      </router-link>

      <router-link
        to="/accounts"
        class="p-3 rounded-lg hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Accounts
      </router-link>

      <router-link
        to="/transactions"
        class="p-3 rounded-lg hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Transactions
      </router-link>

      <button @click="handleLogout" class="mt-auto p-3 rounded-lg hover:bg-gray-700 text-left">
        Logout
      </button>
    </nav>
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
