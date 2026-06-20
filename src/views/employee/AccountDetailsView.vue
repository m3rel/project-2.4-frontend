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

    form.value = {
      accountName: response.data.accountName,
      accountLimit: response.data.accountLimit,
      accountStatus: response.data.accountStatus
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const updateAccount = async () => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/accounts/${route.params.iban}`,
      {
        accountName: form.value.accountName,
        accountLimit: form.value.accountLimit,
        accountStatus: form.value.accountStatus
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )

    alert('Account updated')
    await fetchAccount()
  } catch (err) {
    console.error(err)
    alert('Failed to update account')
  }
}

const handleBack = () => {
  window.history.back()
}

const form = ref({
  accountName: '',
  accountLimit: 0,
  accountStatus: ''
})

onMounted(fetchAccount)
</script>

<template>
  <div class="p-8">     
    <button
      @click="handleBack"
      class="p-3 rounded-lg text-sm text-gray-700 hover:bg-white/40 transition-colors text-left"
    >
      Back
    </button>
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
      <div class="space-y-4">
        <h1 class="text-3xl font-bold mb-6">
            Edit Account Details
        </h1>
        <div>
          <label class="block mb-1">Account Name</label>
          <input
            v-model="form.accountName"
            class="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label class="block mb-1">Account Limit</label>
          <input
            v-model.number="form.accountLimit"
            type="number"
            class="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label class="block mb-1">Status</label>
          <select
            v-model="form.accountStatus"
            class="border rounded p-2 w-full"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
            <option value="BLOCKED">BLOCKED</option>
          </select>
        </div>
      </div>
    </div>
    
  

    <button
      @click="updateAccount"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Save Changes
    </button>

  </div>
</template>