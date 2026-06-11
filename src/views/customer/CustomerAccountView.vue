<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Your Accounts</h1>
    <button
      @click="handleBack"
      class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left"
    >
      Back
    </button>

    <div v-if="loading">
      Loading...
    </div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div
      v-else
      class="bg-white rounded-xl shadow p-6 max-w-2xl"
    >
      <div class="grid grid-cols-2 gap-4">

        <div v-for="account in accounts" :key="account.IBAN">
            <h3>{{ account.accountName }}</h3>
            <p>{{ account.IBAN }}</p>
            <p>€{{ account.balance }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const accounts = ref([])
const loading = ref(true)
const error = ref('')

const fetchAccount = async () => {
  try {
    const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/accounts/me`,
    {
        headers: {
        Authorization: `Bearer ${authStore.token}`
        }
    }
    )

        accounts.value = response.data
    } catch (err) {
        console.error(err)
        error.value = 'Failed to load accounts'
    } finally {
        loading.value = false
    }
}

const handleBack = () => {
  window.history.back()
}

onMounted(fetchAccount)
</script>