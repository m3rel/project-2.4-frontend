<template>
  <div>
    <RouterView v-if="!authStore.isLoggedIn" />

    <!-- Employee layout: nav + main content -->
    <div v-if="authStore.isEmployee" class="flex h-screen">
      <EmployeeNav/>
      <main class="flex overflow-auto p-6">
        <RouterView/>
      </main>
    </div>

    <!-- Customer layout: -->
    <div v-if="authStore.isCustomer">
      <RouterView/>
    </div>
  </div>
</template>

<script setup>
// import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import EmployeeNav from '@/components/EmployeeNav.vue'

const authStore = useAuthStore()
</script>
