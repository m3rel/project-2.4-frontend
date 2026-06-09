<template>
  <div class="h-screen w-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-2xl shadow-sm p-8 w-96">

      <!-- title -->
      <h1>{{ props.type }}</h1>


      <!-- dropdown accounts -->


      <!-- input amount --->



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
  loading.value = true
  error.value = null

  try {
    const response =
      props.type === 'DEPOSIT'
        ? await deposit(selectedIban.value, amount.value)
        : await withdrawal(selectedIban.value, amount.value)

    emit('confirmed', response.data)
  } catch (err) {
    error.value = 'something went wrong.......'
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
