<script setup>
import ATMNav from '@/components/atm/ATMNav.vue'
</script>
<template>
  <div class="h-screen w-screen flex flex-col bg-blue-200">
    <ATMNav />
    <main class="flex-1 flex items-center justify-center">
      <RouterView />
    </main>
  </div>
</template>
