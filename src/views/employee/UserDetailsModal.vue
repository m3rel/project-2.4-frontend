<template>
  <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-6 w-96 shadow-lg">
      <h2 class="text-lg font-medium mb-4">{{ user.firstName }} {{ user.lastName }}</h2>

      <div class="flex flex-col gap-2 text-sm text-gray-500 mb-4">
        <span>Email: {{ user.email }}</span>
        <span>BSN: {{ user.bsn }}</span>
        <span>Phone: {{ user.phoneNumber }}</span>
        <span>Status: {{ user.status }}</span>
      </div>

      <div>
        <label class="text-xs text-gray-500 mb-1 block">Daily Transfer Limit (€)</label>
        <input
          v-model="dailyTransferLimit"
          type="number"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div v-if="error" class="text-red-500 text-xs mt-2">{{ error }}</div>

      <div class="flex gap-2 mt-6">
        <button
          @click="save"
          class="flex-1 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200"
        >
          Save
        </button>
        <button
          @click="$emit('close')"
          class="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({ user: Object })
const emit = defineEmits(['close', 'saved'])

const authStore = useAuthStore()
const dailyTransferLimit = ref(props.user.dailyTransferLimit ?? '')
const error = ref('')

const save = async () => {
  if (!dailyTransferLimit.value) {
    error.value = 'Please enter a limit'
    return
  }
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${props.user.id}`,
      { dailyTransferLimit: Number(dailyTransferLimit.value) },
      { headers: { Authorization: `Bearer ${authStore.token}` } },
    )
    emit('saved')
  } catch (err) {
    const data = err.response?.data
    const firstFieldError = data?.fieldErrors ? Object.values(data.fieldErrors)[0] : null
    error.value = firstFieldError || data?.message || 'Failed to save, please try again'
  }
}
</script>
