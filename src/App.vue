<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Navigation Bar -->
    <nav class="bg-white dark:bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-800 dark:text-white">Movie App</h1>
          </div>
          
          <div class="flex space-x-4">
            <RouterLink 
              to="/" 
              class="text-gray-600 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium transition-colors"
              :class="{ 'text-blue-500 font-semibold': route.path === '/' }"
            >
              Home
            </RouterLink>
              <RouterLink 
              to="/popular" 
              class="text-gray-600 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium transition-colors"
              :class="{ 'text-blue-500 font-semibold': route.path === '/popular' }"
            >
              Popular Movies
            </RouterLink>
            <RouterLink 
              to="/about" 
              class="text-gray-600 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium transition-colors"
              :class="{ 'text-blue-500 font-semibold': route.path === '/about' }"
            >
              About
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Los estilos ahora están manejados por Tailwind CSS */
</style>
