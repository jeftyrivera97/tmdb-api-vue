<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { getAllUsers } from '../data/users'

const router = useRouter()
const authStore = useAuthStore()
const { loading, error } = storeToRefs(authStore)

// Form data
const email = ref('admin@movies.com')
const password = ref('password')
const showPassword = ref(false)
const showUsersList = ref(false)

// Get available users for demo
const availableUsers = getAllUsers()

// Form submission
const handleSubmit = async () => {
  authStore.clearError()
  
  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    // Redirect to home page after successful login
    router.push('/')
  }
}

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Quick login with demo users
const quickLogin = (userEmail: string, userPassword: string) => {
  email.value = userEmail
  password.value = userPassword
  showUsersList.value = false
}

// Toggle users list
const toggleUsersList = () => {
  showUsersList.value = !showUsersList.value
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Login to Movie App
      </h2>
      
      <!-- Demo credentials info -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-blue-800 dark:text-blue-200 font-medium">Available Demo Users:</p>
          <button
            type="button"
            @click="toggleUsersList"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm underline"
          >
            {{ showUsersList ? 'Hide' : 'Show' }} Users
          </button>
        </div>
        
        <div v-if="showUsersList" class="space-y-2">
          <div 
            v-for="user in availableUsers" 
            :key="user.id"
            @click="quickLogin(user.email, user.password)"
            class="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-center space-x-3">
              <img 
                :src="user.avatar" 
                :alt="user.name"
                class="w-8 h-8 rounded-full"
              />
              <div>
                <p class="text-sm font-medium text-gray-800 dark:text-white">{{ user.name }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">{{ user.email }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs px-2 py-1 rounded-full" 
                    :class="user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'">
                {{ user.role }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-else class="text-sm text-blue-600 dark:text-blue-300">
          <p>Current: <strong>{{ email || 'admin@movies.com' }}</strong> / <strong>{{ password || 'password' }}</strong></p>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Email field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>
