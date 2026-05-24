<template>
  <div>

     <!-- <p>Role: {{ authStore.role }}</p>
    <p>IsEmployee: {{ authStore.isEmployee }}</p>
    <p>IsCustomer: {{ authStore.isCustomer }}</p>
     -->
    <div v-if="authStore.isEmployee">
      <h1>Employee Dashboard</h1>
      <!--<router-link to="/users">Manage Users</router-link>-->
    </div>

    <div v-if="authStore.isCustomer">
      <h1>Welcome!</h1>
      <p>Your accounts will appear here</p>
    </div>

    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>