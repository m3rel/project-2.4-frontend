<template>
  <!-- main screen -->
  <div v-if="currentScreen === 'main'" class="flex flex-col items-center gap-4">
    <h1 class="text-5xl m-10">What would you like to do?</h1>
    <div class="flex gap-8">
      <button
        class="font-serif text-3xl bg-white rounded-2xl shadow-sm w-64 h-64 hover:bg-gray-50 transition-colors"
        @click="goToTransaction('DEPOSIT')"
      >
        Deposit
      </button>
      <button
        class="font-serif text-3xl bg-white rounded-2xl shadow-sm w-64 h-64 hover:bg-gray-50 transition-colors"
        @click="goToTransaction('WITHDRAWAL')"
      >
        Withdraw
      </button>
    </div>
  </div>

  <!-- transaction form -->
  <ATMTransactionForm
    v-else-if="currentScreen === 'transaction'"
    :type="transactionType"
    @confirmed="onTransactionConfirmed"
    @cancel="currentScreen = 'main'"
  />

  <!-- receipt -->
  <ATMReceipt
    v-else-if="currentScreen === 'receipt'"
    :transaction="lastTransaction"
    @return="currentScreen = 'main'"
  />
</template>

<script setup>
import ATMTransactionForm from '@/components/atm/ATMTransactionForm.vue'
import ATMReceipt from '@/components/atm/ATMReceipt.vue'
import { ref } from 'vue'

//when changed ATMVeiw automatically changes
const currentScreen = ref('main')
const transactionType = ref(null)
const lastTransaction = ref(null)

//type from button -> set transaction type, change current screen to transaction
function goToTransaction(type) {
  transactionType.value = type
  currentScreen.value = 'transaction'
}

//function that will be called when transaction succeeds
function onTransactionConfirmed(transaction) {
  lastTransaction.value = transaction
  currentScreen.value = 'receipt'
}
</script>
