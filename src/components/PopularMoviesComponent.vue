<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '../stores/movies'
import AlertComponent from './AlertComponent.vue'
import MoviesGrid from './MoviesGrid.vue'


// Use the store
const moviesStore = useMoviesStore()

// Reactive destructuring from store using storeToRefs
const { movies, loading, error, hasMovies } = storeToRefs(moviesStore)

onMounted(() => {
  // If there are no movies, load them
  if (!hasMovies.value) {
    moviesStore.fetchPopularMovies()
  }
})

// Function to reload movies
const reloadMovies = () => {
  moviesStore.fetchPopularMovies()
}
</script>

<template>
    <!-- Control buttons -->
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Popular Movies (Store)</h2>
      <button 
        @click="reloadMovies"
        :disabled="loading"
        class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
        {{ loading ? 'Loading...' : 'Reload Movies' }}
      </button>
    </div>

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
      <AlertComponent :message="error" type="error" />
    </div>

    <!-- Loading spinner -->
    <div v-if="loading && movies.length === 0" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Movies Grid -->
    <div v-else-if="movies.length > 0" class="space-y-8">
      <MoviesGrid />
   
      
    </div>

    <!-- No movies message -->
    <div v-else-if="!loading" class="text-center py-16">
      <p class="text-gray-500 dark:text-gray-400 text-lg">No movies found</p>
      <button 
        @click="reloadMovies"
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Try Loading Again
      </button>
    </div>
</template>



<style lang="scss" scoped>

</style>