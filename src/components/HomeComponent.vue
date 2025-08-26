<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <!-- Hero Section -->
        <div class="hero min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <!-- Movie Icon -->
                    <div class="text-8xl mb-6">🎬</div>

                    <!-- Welcome Message -->
                    <h1 class="text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Welcome{{ user ? `, ${user.name}` : '' }}!
                    </h1>

                    <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Discover, organize, and manage your favorite movies in one place.
                    </p>

                    <!-- Action Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <!-- Popular Movies Card -->
                        <RouterLink to="/popular" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div class="card-body">
                                <div class="text-3xl mb-2">🔥</div>
                                <h2 class="card-title text-lg">Popular Movies</h2>
                                <p class="text-sm">Explore trending movies from TMDb</p>
                            </div>
                        </RouterLink>

                        <!-- My Movies Card -->
                        <RouterLink to="/my-movies"
                            class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div class="card-body">
                                <div class="text-3xl mb-2">📚</div>
                                <h2 class="card-title text-lg">My Collection</h2>
                                <p class="text-sm">Manage your personal movie library</p>
                            </div>
                        </RouterLink>
                    </div>




                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped></style>