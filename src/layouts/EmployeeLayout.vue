<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <EmployeeNav />
    <main class="flex-1 overflow-y-auto p-8 bg-gray-50">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import EmployeeNav from '@/components/EmployeeNav.vue'
</script>

