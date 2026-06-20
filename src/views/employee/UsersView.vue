<template>
  <div class="w-full">
    <h2 class="text-2xl font-medium mb-6">All users</h2>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 text-gray-500 text-left">
            <th class="p-4 font-medium">Name</th>
            <th class="p-4 font-medium">Email</th>
            <th class="p-4 font-medium">BSN</th>
            <th class="p-4 font-medium">Phone</th>
            <th class="p-4 font-medium">Daily limit</th>
            <th class="p-4 font-medium">Role</th>
            <th class="p-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b cursor-pointer border-gray-50 hover:bg-gray-50 transition-colors"
            @click="openUserModal(user)"
          >
            <td class="p-4">{{ user.firstName }} {{ user.lastName }}</td>
            <td class="p-4 text-gray-500">{{ user.email }}</td>
            <td class="p-4 text-gray-500">{{ user.bsn }}</td>
            <td class="p-4 text-gray-500">{{ user.phoneNumber }}</td>
            <td class="p-4 text-gray-500">{{ user.dailyTransferLimit}}</td>
            <td class="p-4">
              <span
                class="px-2 py-1 rounded-lg text-xs font-medium"
                :class="
                  user.role === 'ROLE_EMPLOYEE'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                "
              >
                {{ user.role === 'ROLE_EMPLOYEE' ? 'Employee' : 'Customer' }}
              </span>
            </td>
            <td class="p-4">
              <span
                class="px-2 py-1 rounded-lg text-xs font-medium"
                :class="
                  user.status === 'APPROVED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
              >
                {{ user.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex items-center justify-between p-4 text-sm text-gray-500">
        <span>Showing {{ users.length }} of {{ totalElements }} users</span>
        <div class="flex gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 0"
            class="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="px-3 py-1">{{ currentPage + 1 }} / {{ totalPages }}</span>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage + 1 >= totalPages"
            class="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
  </div>

  <UserDetailModal
    v-if="selectedUser"
    :user="selectedUser"
    @close="selectedUser = null"
    @saved="selectedUser = null; fetchUsers(currentPage)"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUsers } from '@/services/api.js'
import UserDetailModal from '@/views/employee/UserDetailsModal.vue'

const users = ref([])
const currentPage = ref(0)
const totalPages = ref(0)
const totalElements = ref(0)
const error = ref('')
const selectedUser = ref(null)

const openUserModal = (user) => (selectedUser.value = user)

const fetchUsers = async (page = 0) => {
  try {
    const response = await getUsers(page)
    users.value = response.data.content
    currentPage.value = response.data.number
    totalPages.value = response.data.totalPages
    totalElements.value = response.data.totalElements
  } catch (err) {
    error.value = 'Failed to load users'
  }
}

const changePage = (page) => {
  fetchUsers(page)
}

onMounted(() => fetchUsers())
</script>
