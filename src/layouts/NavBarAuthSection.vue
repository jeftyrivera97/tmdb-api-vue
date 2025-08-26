<script setup lang="ts">

import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'


const authStore = useAuthStore()
const router = useRouter()
const { isAuthenticated, user } = storeToRefs(authStore)


const handleLogout = () => {
    authStore.logout()
    router.push('/login')
}

</script>

<template>
    <div v-if="isAuthenticated" class="flex items-center space-x-3">
        <!-- User Avatar and Info -->
        <div class="flex items-center space-x-2">
            <img :src="user?.avatar" :alt="user?.name"
                class="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600" />
            <div class="text-sm">
                <span class="text-gray-600 dark:text-gray-300">Welcome, </span>
                <span class="font-medium text-gray-800 dark:text-white">{{ user?.name }}</span>
                <span v-if="user?.role === 'admin'"
                    class="ml-2 text-xs px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">
                    Admin
                </span>
            </div>
        </div>

        <!-- Logout Button -->
        <button @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
            Logout
        </button>
    </div>

    <div v-else>
        <!-- Login Button -->
        <RouterLink to="/login"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Login
        </RouterLink>
    </div>
</template>



<style scoped></style>