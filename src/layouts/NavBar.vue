<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import NavBarLinks from './NavBarLinks.vue'
import NavBarAuthSection from './NavBarAuthSection.vue'
import NavBarTitle from './NavBarTitle.vue'

const authStore = useAuthStore()

// Initialize auth on app load
onMounted(() => {
    authStore.initializeAuth()
})



</script>

<template>
    <nav class="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <NavBarTitle />
                </div>

                <div class="flex items-center space-x-4">
                    <!-- Navigation Links -->
                    <div class="flex space-x-4">
                        <NavBarLinks />
                    </div>

                    <!-- Auth Section -->
                    <div class="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                        <NavBarAuthSection />
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped></style>