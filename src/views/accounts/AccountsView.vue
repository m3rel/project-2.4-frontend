<template>
  <div class="flex h-screen w-screen">

    <main class="w-full p-8 bg-gray-100 overflow-auto">
      <h1 class="text-3xl font-bold mb-6">Accounts</h1>

      <div class="mb-6 flex gap-2">
        <input
            v-model="firstName"
            placeholder="First name"
            class="border rounded px-3 py-2"
        />
        <input
            v-model="lastName"
            placeholder="Last name"
            class="border rounded px-3 py-2"
        />
        <button @click="searchAccounts"class="bg-blue-500 text-white px-4 py-2 rounded">
            Search
        </button>
        <button @click="fetchAccounts"class="bg-gray-500 text-white px-4 py-2 rounded">
            Reset
        </button>
        </div>

      <div v-if="loading" class="text-gray-500">
        Loading accounts...
      </div>

      <div v-else-if="error" class="text-red-500">
        {{ error }}
      </div>

      <div v-else class="bg-white rounded-xl shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-3 text-left">IBAN</th>
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Balance</th>
              <th class="p-3 text-left">Status</th>
              <th class="p-3 text-left">Type</th>
              <th class="p-3 text-left">Owner</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="account in accounts"
              :key="account.IBAN"
              class="border-t hover:bg-gray-50"
            >
              <td class="p-3">{{ account.IBAN }}</td>
              <td class="p-3">{{ account.accountName }}</td>
              <td class="p-3">€{{ account.balance }}</td>
              <td class="p-3">{{ account.accountStatus }}</td>
              <td class="p-3">{{ account.accountType }}</td>
              <td class="p-3">
                {{ account.user?.firstName }}
                {{ account.user?.lastName }}
              </td>
              <td class="p-3">
                <router-link
                    :to="`/accounts/${account.IBAN}`"
                    class="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    View
                </router-link>
                </td>
            </tr>
          </tbody>
        </table>
        </div>
        <div v-if="totalPages > 1" class="flex gap-2 mt-4">
            <button
                @click="previousPage"
                :disabled="page === 0"
                class="px-4 py-2 border rounded"
            >
                Previous
            </button>

            <span>Page {{ page + 1 }} of {{ totalPages }}</span>

            <button
                @click="nextPage"
                :disabled="page >= totalPages - 1"
                class="px-4 py-2 border rounded"
            >
                Next
            </button>
        </div>
    </main>
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

const page = ref(0)
const totalPages = ref(0)

const firstName = ref('')
const lastName = ref('')

const fetchAccounts = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/accounts?page=${page.value}&size=10`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    )

    accounts.value = response.data.content
    totalPages.value = response.data.totalPages

  } catch (err) {
    error.value = 'Failed to load accounts'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const searchAccounts = async () => {
    console.log('SEARCH CLICKED')
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/accounts/user`,
      {
        params: {
          firstName: firstName.value,
          lastName: lastName.value,
          page: page.value,
          size: 10
        },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    )

    accounts.value = response.data.content
    totalPages.value = response.data.totalPages

  } catch (err) {
    console.error(err)
    error.value = 'Search failed'
  }
}

const nextPage = async () => {
  if (page.value < totalPages.value - 1) {
    page.value++
    await fetchAccounts()
  }
}

const previousPage = async () => {
  if (page.value > 0) {
    page.value--
    await fetchAccounts()
  }
}

onMounted(fetchAccounts)
</script>