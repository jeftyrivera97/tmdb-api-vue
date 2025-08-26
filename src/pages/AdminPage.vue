<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { users } from '../data/users'

const authStore = useAuthStore()
const { isAdmin, user } = storeToRefs(authStore)

const allUsers = computed(() => users)
const activeUsers = computed(() => users.filter(u => u.isActive))
const inactiveUsers = computed(() => users.filter(u => !u.isActive))

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-8">
    <!-- Access Denied for non-admins -->
    <div v-if="!isAdmin" class="text-center py-16">
      <div class="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 rounded-lg p-6">
        <h2 class="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">Access Denied</h2>
        <p class="text-red-600 dark:text-red-300">You need administrator privileges to view this page.</p>
        <RouterLink 
          to="/" 
          class="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Go to Home
        </RouterLink>
      </div>
    </div>

    <!-- Admin Panel -->
    <div v-else class="space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          👥 User Administration
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Welcome {{ user?.name }}! Here you can manage all users.
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Total Users</h3>
          <p class="text-3xl font-bold text-blue-500">{{ allUsers.length }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Active Users</h3>
          <p class="text-3xl font-bold text-green-500">{{ activeUsers.length }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Inactive Users</h3>
          <p class="text-3xl font-bold text-red-500">{{ inactiveUsers.length }}</p>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">All Users</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Created
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Login Info
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="userItem in allUsers" :key="userItem.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img 
                      :src="userItem.avatar" 
                      :alt="userItem.name"
                      class="w-10 h-10 rounded-full"
                    />
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ userItem.name }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ userItem.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="userItem.role === 'admin' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'">
                    {{ userItem.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="userItem.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'">
                    {{ userItem.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(userItem.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-xs text-gray-600 dark:text-gray-400">
                    <div><strong>Email:</strong> {{ userItem.email }}</div>
                    <div><strong>Password:</strong> {{ userItem.password }}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Back Button -->
      <div class="text-center">
        <RouterLink 
          to="/" 
          class="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
        >
          ← Back to Home
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles are handled by Tailwind CSS */
</style>
