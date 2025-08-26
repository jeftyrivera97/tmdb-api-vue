<script setup lang="ts">

import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { isAdmin } = storeToRefs(authStore)
const route = useRoute()
</script>

<template>
    <RouterLink to="/"
        class="text-gray-600 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium transition-colors"
        :class="{ 'text-blue-500 font-semibold': route.path === '/' }">
        Home
    </RouterLink>
    <RouterLink to="/popular"
        class="text-gray-600 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium transition-colors"
        :class="{ 'text-blue-500 font-semibold': route.path === '/popular' }">
        TMDB Popular Movies
    </RouterLink>
    <RouterLink to="/mymovies"
        class="text-gray-600 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium transition-colors"
        :class="{ 'text-blue-500 font-semibold': route.path === '/mymovies' }">
        My Movies
    </RouterLink>
    <RouterLink to="/about"
        class="text-gray-600 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md font-medium transition-colors"
        :class="{ 'text-blue-500 font-semibold': route.path === '/about' }">
        About
    </RouterLink>

    <!-- Admin link (only for admins) -->
    <RouterLink v-if="isAdmin" to="/admin"
        class="text-gray-600 dark:text-gray-300 hover:text-red-500 px-3 py-2 rounded-md font-medium transition-colors"
        :class="{ 'text-red-500 font-semibold': route.path === '/admin' }">
        👥 Admin
    </RouterLink>
</template>



<style scoped></style>