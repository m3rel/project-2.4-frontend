<template>
  <div class="w-full">
    <h2 class="text-2xl font-medium mb-6">Pending Approvals</h2>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div v-else class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 text-gray-500 text-left">
            <th class="p-4 font-medium">Name</th>
            <th class="p-4 font-medium">Email</th>
            <th class="p-4 font-medium">BSN</th>
            <th class="p-4 font-medium">Phone</th>
            <th class="p-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in pendingUsers"
            :key="user.id"
            class="border-b border-gray-50 hover:bg-gray-50 transition-colors"
          >
            <td class="p-4">{{ user.firstName }} {{ user.lastName }}</td>
            <td class="p-4 text-gray-500">{{ user.email }}</td>
            <td class="p-4 text-gray-500">{{ user.bsn }}</td>
            <td class="p-4 text-gray-500">{{ user.phoneNumber }}</td>
            <td class="p-4">
              <button
                @click="openApproveModal(user)"
                class="px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
              >
                Approve
              </button>
            </td>
          </tr>

          <tr v-if="pendingUsers.length === 0">
            <td colspan="5" class="p-4 text-center text-gray-400">No pending approvals</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 class="text-lg font-medium mb-4">
          Approve {{ selectedUser?.firstName }} {{ selectedUser?.lastName }}
        </h2>

        <div class="flex flex-col gap-3">
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Checkings Account Limit (€)</label>
            <input
              v-model="accountLimit"
              type="number"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="-500"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Savings Account Limit (€)</label>
            <input
              v-model="savingsLimit"
              type="number"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Daily Transfer Limit (€)</label>
            <input
              v-model="dailyTransferLimit"
              type="number"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="1000"
            />
          </div>
        </div>

        <div v-if="modalError" class="text-red-500 text-xs mt-2">{{ modalError }}</div>

        <div class="flex gap-2 mt-6">
          <button
            @click="approveCustomer"
            class="flex-1 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
          >
            Confirm
          </button>
          <button
            @click="showModal = false"
            class="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
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
const pendingUsers = ref([])
const loading = ref(true)
const error = ref('')
const showModal = ref(false)
const selectedUser = ref(null)
const accountLimit = ref('')
const dailyTransferLimit = ref('')
const modalError = ref('')
const savingsLimit = ref('')

const fetchPendingUsers = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?isPending=true`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    pendingUsers.value = response.data.content
  } catch (err) {
    error.value = 'Failed to load pending users'
  } finally {
    loading.value = false
  }
}

const openApproveModal = (user) => {
  selectedUser.value = user
  accountLimit.value = ''
  savingsLimit.value = ''
  dailyTransferLimit.value = ''
  modalError.value = ''
  showModal.value = true
}

const approveCustomer = async () => {
  if (accountLimit.value === '' || savingsLimit.value === '' || dailyTransferLimit.value === '') {
    modalError.value = 'Please fill in all fields'
    return
  }

  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/users/${selectedUser.value.id}/approve`,
      {
        dailyTransferLimit: Number(dailyTransferLimit.value),
        checkingAccountLimit: Number(accountLimit.value),
        savingsAccountLimit: Number(savingsLimit.value),
      },
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )

    showModal.value = false
    await fetchPendingUsers()
  } catch (err) {
    const data = err.response?.data
    const firstFieldError = data?.fieldErrors ? Object.values(data.fieldErrors)[0] : null
    modalError.value = firstFieldError || data?.message || 'Something went wrong, please try again'
    console.error(err)
  }
}

onMounted(fetchPendingUsers)
</script>
