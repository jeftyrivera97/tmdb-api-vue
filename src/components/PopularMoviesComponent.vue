<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { getImageUrl } from '../api'
import { useMoviesStore } from '../stores/movies'

// Usar el store
const moviesStore = useMoviesStore()

// Destructuring reactivo del store usando storeToRefs
const { movies, loading, error, hasMovies } = storeToRefs(moviesStore)

onMounted(() => {
  // Si no hay películas, las cargamos
  if (!hasMovies.value) {
    moviesStore.fetchPopularMovies()
  }
})

// Función para recargar películas
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
      {{ error }}
    </div>

    <!-- Loading spinner -->
    <div v-if="loading && movies.length === 0" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Movies Grid -->
    <div v-else-if="movies.length > 0" class="space-y-8">
      <div class="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <div 
          v-for="movie in movies" 
          :key="movie.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Movie Poster -->
          <div class="aspect-[2/3] bg-gray-200 dark:bg-gray-700">
            <img 
              :src="getImageUrl(movie.poster_path)" 
              :alt="movie.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <!-- Movie Info -->
          <div class="p-3">
            <h3 class="font-bold text-sm text-gray-800 dark:text-white mb-2 line-clamp-2">
              {{ movie.title }}
            </h3>
            
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ new Date(movie.release_date).getFullYear() }}
              </span>
              
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {{ movie.vote_average.toFixed(1) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Movies count -->
      <div class="text-center">
        <p class="text-gray-500 dark:text-gray-400">
          Showing {{ movies.length }} movies
        </p>
      </div>
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