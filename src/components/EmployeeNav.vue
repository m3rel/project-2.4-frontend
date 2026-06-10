<template>
  <aside class="w-64 h-screen gradient-bg flex flex-col p-6">
    <h1 class="text-2xl m-4">
      <span class="font-serif">BeFRAUD.inc</span>
    </h1>

    <nav class="flex flex-col gap-1 flex-1">
      <div>
        <button
          @click="usersOpen = !usersOpen"
          class="w-full p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left flex justify-between items-center"
        >
          Users
          <span>{{ usersOpen ? '▲' : '▼' }}</span>
        </button>

        <!--only show when open -->
        <div v-if="usersOpen" class="ml-4 flex flex-col gap-1">
          <router-link
            :to="{ name: 'employeeUsers' }"
            class="p-2 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors"
            active-class="bg-white/60 font-medium text-gray-900"
          >
            All Users
          </router-link>
          <router-link
            :to="{ name: 'employeePendingUsers' }"
            class="p-2 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors"
            active-class="bg-white/60 font-medium text-gray-900"
          >
            Pending Approvals
          </router-link>
        </div>
      </div>

      <router-link
        :to="{ name: 'employeeAccounts' }"
        class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors"
        active-class="bg-white/60 font-medium text-gray-900"
      >
        Accounts
      </router-link>

      <router-link
        :to="{ name: 'employeeTransactions' }"
        class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors"
        active-class="bg-white/60 font-medium text-gray-900"
      >
        Transactions
      </router-link>
    </nav>

    <button
      @click="handleLogout"
      class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left"
    >
      Logout
    </button>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const usersOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
