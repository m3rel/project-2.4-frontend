<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const transactions = ref([])
const loading = ref(true)
const error = ref('')
const account = ref(null)

const filters = ref({
  startDate: '',
  endDate: '',
  minAmount: '',
  maxAmount: '',
  otherIban: '',
})

const clearFilters = () => {
  filters.value = {
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    otherIban: '',
  }

  fetchTransactions()
}

const fetchTransactions = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/transactions/${route.params.iban}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        params: {
          startDate: filters.value.startDate || undefined,
          endDate: filters.value.endDate || undefined,
          minAmount: filters.value.minAmount || undefined,
          maxAmount: filters.value.maxAmount || undefined,
          otherIban: filters.value.otherIban || undefined,
        },
      },
    )

    transactions.value = response.data.content
  } catch (err) {
    error.value = 'Failed to load transactions'
  }
}

const fetchData = async () => {
  try {
    const [accountResponse, transactionResponse] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/accounts/${route.params.iban}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }),
      axios.get(`${import.meta.env.VITE_API_URL}/transactions/${route.params.iban}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }),
    ])

    account.value = accountResponse.data
    transactions.value = transactionResponse.data.content
  } catch (err) {
    error.value = 'Failed to load account'
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

const handleBack = () => {
  window.history.back()
}

onMounted(fetchTransactions)
</script>

<template>
  <button
    @click="handleBack"
    class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left"
  >
    Back
  </button>
  <div class="p-8">
    <div v-if="account" class="bg-white rounded-xl shadow p-6 mb-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold">
            {{ account.accountName }}
          </h1>

          <p class="text-gray-500">
            {{ account.IBAN }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-sm text-gray-500">Balance</p>
          <p class="text-2xl font-bold">€{{ account.balance.toFixed(2) }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div>
          <span class="text-gray-500">Type</span>
          <p>{{ account.accountType }}</p>
        </div>

        <div>
          <span class="text-gray-500">Status</span>
          <p>{{ account.accountStatus }}</p>
        </div>

        <div>
          <span class="text-gray-500">Limit</span>
          <p>€{{ account.accountLimit }}</p>
        </div>

        <div>
          <span class="text-gray-500">Interest Rate</span>
          <p>{{ account.interestRate }}%</p>
        </div>

        <div>
          <span class="text-gray-500">Created</span>
          <p>
            {{ new Date(account.dateCreated).toLocaleDateString() }}
          </p>
        </div>

        <div v-if="account.user">
          <span class="text-gray-500">Owner</span>
          <p>
            {{ account.user.firstName }}
            {{ account.user.lastName }}
          </p>
        </div>
      </div>
    </div>

    <h1 class="text-3xl font-bold mb-6">Transactions</h1>
    <div class="bg-white rounded-xl shadow p-4 mb-6">
      <h2 class="font-semibold mb-4">Filters</h2>

      <div class="grid grid-cols-5 gap-4">
        <input v-model="filters.otherIban" placeholder="Other IBAN" class="border rounded p-2" />

        <input
          v-model="filters.minAmount"
          type="number"
          placeholder="Minimum amount"
          class="border rounded p-2"
        />

        <input
          v-model="filters.maxAmount"
          type="number"
          placeholder="Maximum amount"
          class="border rounded p-2"
        />

        <input v-model="filters.startDate" type="datetime-local" class="border rounded p-2" />

        <input v-model="filters.endDate" type="datetime-local" class="border rounded p-2" />
      </div>

      <div class="mt-4 flex gap-2">
        <button @click="fetchTransactions" class="bg-gray-900 text-white px-4 py-2 rounded">
          Apply Filters
        </button>

        <button @click="clearFilters" class="border px-4 py-2 rounded">Clear</button>
      </div>
    </div>

    <div v-if="loading">Loading...</div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="flex justify-between items-center border rounded-lg p-4 bg-white"
      >
        <div>
          <p class="font-semibold">{{ transaction.type }}</p>
          <p class="text-sm text-gray-500">
            {{ transaction.senderIban }} → {{ transaction.receiverIban }}
          </p>
          <p class="text-xs text-gray-400">
            {{ new Date(transaction.timestamp).toLocaleString() }}
          </p>
          <p v-if="transaction.initiatedBy" class="text-xs text-gray-400">
            By {{ transaction.initiatedBy.firstName }}
            {{ transaction.initiatedBy.lastName }}
          </p>
        </div>

        <div class="text-right">
          <span
            v-if="
              transaction.type === 'DEPOSIT' ||
              (transaction.type === 'TRANSFER' && transaction.receiverIban === account.IBAN)
            "
            class="inline-block bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm"
          >
            +€{{ transaction.amount.toFixed(2) }}
          </span>
          <span v-else class="font-semibold text-sm"> -€{{ transaction.amount.toFixed(2) }} </span>
        </div>

      </div>
    </div>
  </div>
</template>
