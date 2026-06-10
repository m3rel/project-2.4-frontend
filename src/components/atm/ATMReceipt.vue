<template>
  <div class="flex flex-col gap-5 bg-white rounded-2xl shadow-sm px-8 py-12 w-96">
    <!-- header -->
    <div class="text-center border-b border-gray-100 pb-4">
      <p class="text-xs text-gray-400 uppercase mb-1">Receipt</p>
      <h2 class="text-2xl">{{ transaction.type }}</h2>
    </div>

    <!-- details -->
    <div class="flex flex-col gap-3 text-sm">
      <div class="flex justify-between">
        <span class="text-gray-400">Amount</span>
        <span class="font-medium">€{{ transaction.amount }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-400">{{ transaction.type === 'DEPOSIT' ? 'To' : 'From' }}</span>
        <span class="font-medium text-xs">{{
          transaction.type === 'DEPOSIT' ? transaction.receiverIban : transaction.senderIban
        }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-400">Date</span>
        <span class="font-medium">{{ new Date(transaction.timestamp).toLocaleDateString() }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-400">Time</span>
        <span class="font-medium">{{ new Date(transaction.timestamp).toLocaleTimeString() }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-400">By</span>
        <span class="font-medium"
          >{{ transaction.initiatedBy.firstName }} {{ transaction.initiatedBy.lastName }}</span
        >
      </div>
    </div>

    <!-- status -->
    <div class="text-center py-2">
      <span class="px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
        Transaction Successful
      </span>
    </div>

    <!-- return button -->
    <button
      @click="emit('return')"
      class="w-full bg-gray-900 text-white rounded-lg p-2 text-sm font-medium hover:bg-gray-700 transition-colors"
    >
      Return
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  transaction: Object,
})

const emit = defineEmits(['return'])
</script>
