<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const account = ref(null)
const loading = ref(true)

const fetchAccount = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/accounts/${route.params.iban}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )

    account.value = response.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAccount)
</script>

<template>
  <div class="p-8">
    <div v-if="loading">
      Loading...
    </div>

    <div v-else-if="account">
      <h1 class="text-3xl font-bold mb-6">
        Account Details
      </h1>

      <p><strong>IBAN:</strong> {{ account.IBAN }}</p>
      <p><strong>Name:</strong> {{ account.accountName }}</p>
      <p><strong>Balance:</strong> €{{ account.balance }}</p>
      <p><strong>Limit:</strong> €{{ account.accountLimit }}</p>
      <p><strong>Status:</strong> {{ account.accountStatus }}</p>
      <p><strong>Owner:</strong>
        {{ account.user?.firstName }}
        {{ account.user?.lastName }}
      </p>
    </div>
  </div>
</template>