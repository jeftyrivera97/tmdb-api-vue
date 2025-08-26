<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'
import NavBar from './layouts/NavBar.vue'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

// Initialize auth on app load
onMounted(() => {
  authStore.initializeAuth()
})


</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Navigation Bar - If User is authenticated -->
    <header v-if="isAuthenticated" class="sticky top-0 z-50">
      <NavBar />
    </header>

    <!-- Main Content -->
    <main :class="isAuthenticated ? 'container mx-auto px-4 py-8' : 'w-full'">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>
