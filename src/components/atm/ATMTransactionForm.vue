<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="flex flex-col gap-5 bg-white rounded-2xl shadow-sm px-8 py-12 w-120">
      <!-- title -->
      <h1 class="text-3xl">{{ props.type }}</h1>

      <!-- dropdown accounts -->
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 mb-1 block">Select Account</label>
        <select
          v-model="selectedIban"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option v-for="account in accounts" :key="account.IBAN" :value="account.IBAN">
            {{ account.accountName }} - €{{ account.balance }}
          </option>
        </select>
      </div>

      <!-- input amount --->
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 mb-1 block">Amount</label>
        <input
          v-model="amount"
          type="number"
          min="0"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          placeholder="0.00"
        />
      </div>

      <div class="flex flex-col gap-2">
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="w-full bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
        >
          {{ loading ? 'Processing...' : 'Confirm' }}
        </button>
        <button
          class="w-full bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-150"
          @click="emit('cancel')"
        >
          Cancel
        </button>
      </div>

      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMyAccounts, deposit, withdrawal } from '@/services/api.js'

const props = defineProps({
  type: String,
})

const emit = defineEmits(['confirmed', 'cancel'])

const amount = ref('')
const loading = ref(false)
const error = ref(null)
const accounts = ref([])
const selectedIban = ref('')

async function handleSubmit() {
  if (!selectedIban.value || !amount.value) {
    error.value = 'Please select an account and enter an amount.'
    return
  }

  loading.value = true
  error.value = null

  try {
    const response =
      props.type === 'DEPOSIT'
        ? await deposit(selectedIban.value, amount.value)
        : await withdrawal(selectedIban.value, amount.value)

    emit('confirmed', response.data)
  } catch (err) {
    //console.log(err.response.data)
    error.value = err.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}

const fetchAccounts = async () => {
  try {
    const response = await getMyAccounts()
    accounts.value = response.data

    if (accounts.value.length > 0) {
      selectedIban.value = accounts.value[0].IBAN
    }
  } catch (err) {
    error.value = 'Failed to load accounts'
  }
}

onMounted(fetchAccounts)
</script>
