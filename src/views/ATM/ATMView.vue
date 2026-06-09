<template>
  <!-- main screen -->
  <div v-if="currentScreen === 'main'">
    <div class="flex items-center justify-center gap-2">
      <button class="bg-amber-300 p-8" @click="goToTransaction('DEPOSIT')">Deposit</button>
      <button class="bg-cyan-500 p-8" @click="goToTransaction('WITHDRAWAL')">Withdraw</button>
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
