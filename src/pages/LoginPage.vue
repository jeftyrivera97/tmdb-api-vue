<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

// Redirect if already authenticated
onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md">

      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          🎬 Movie API App
        </h1>
      
      </div>
      <!-- Login Form -->
      <LoginForm />

    </div>
  </div>
</template>

<style scoped>
/* Styles are handled by Tailwind CSS */
</style>
