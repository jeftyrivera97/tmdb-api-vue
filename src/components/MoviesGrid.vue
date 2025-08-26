<template>
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
            {{ movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A' }}
          </span>
          
          <div class="flex items-center gap-1" v-if="movie.vote_average && movie.vote_average > 0">
            <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-300">
              {{ movie.vote_average.toFixed(1) }}
            </span>
          </div>
          
          <div v-else class="flex items-center gap-1">
            <span class="text-xs text-gray-400">No rating</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center mt-6">
    <p class="text-gray-500 dark:text-gray-400">
      Showing {{ movies.length }} movies
    </p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '../stores/movies'
import { getImageUrl } from '../api/movies'

// Use the store
const moviesStore = useMoviesStore()

// Reactive destructuring from store using storeToRefs
const { movies } = storeToRefs(moviesStore)
</script>

<style scoped>
/* Utility to limit text lines */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>