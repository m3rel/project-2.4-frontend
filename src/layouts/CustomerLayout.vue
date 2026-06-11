<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <CustomerNav />
    <main class="flex-1 overflow-y-auto p-8 bg-gray-50">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import CustomerNav from '@/components/customer/CustomerNav.vue'
</script>
