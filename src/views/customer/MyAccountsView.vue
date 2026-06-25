<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Your Accounts</h1>
    <button
      @click="handleBack"
      class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left"
    >
      Back
    </button>

    <div v-if="loading">Loading...</div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else class="bg-white rounded-xl shadow p-6 max-w-2xl">
      <!-- Total Balance -->
      <div class="mb-6 pb-4 border-b">
        <h2 class="text-lg text-gray-500">Total Balance</h2>
        <p class="text-3xl font-bold">€{{ totalBalance.toFixed(2) }}</p>
      </div>

      <!-- Accounts -->
      <div class="space-y-4">
        <div
          v-for="account in accounts"
          :key="account.IBAN"
          @click="viewTransactions(account.IBAN)"
          class="flex justify-between items-center border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
        >
          <div>
            <h3 class="font-semibold">{{ account.accountName }}</h3>
            <p class="text-sm text-gray-500">{{ account.IBAN }}</p>
          </div>

          <div class="text-right">
            <p class="font-bold text-lg">€{{ account.balance.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const viewTransactions = (iban) => {
  router.push(`/customer/${iban}/transactions`)
}

const authStore = useAuthStore()

const accounts = ref([])
const loading = ref(true)
const error = ref('')

const fetchAccount = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/accounts/me`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    accounts.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load accounts'
  } finally {
    loading.value = false
  }
}

const totalBalance = computed(() =>
  accounts.value.reduce((sum, account) => sum + account.balance, 0),
)

const handleBack = () => {
  window.history.back()
}

onMounted(fetchAccount)
</script>
