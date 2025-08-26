<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMyMoviesStore } from '../stores/mymovies'  // Correct store
import { useGetMovies } from '../helpers/GetMovies'   // Helper to get movies
import { TrashIcon } from "@heroicons/vue/24/solid";
import { useDeleteMovie } from '../helpers/DeleteMovie';


// My Movies Store
const moviesStore = useMyMoviesStore()

// Helper to get movies
const { fetchMovies } = useGetMovies()

// Helper to delete movies
const { deleteMovieWithConfirmation, isDeleting } = useDeleteMovie()

// Destructuring reactive from using storeToRefs
const { movies, moviesCount  } = storeToRefs(moviesStore)

onMounted(() => {
  // Load Movies
  fetchMovies()
})

// Reload Movies

// Handle delete movie
const handleDeleteMovie = async (movie: any) => {
  try {
    await deleteMovieWithConfirmation(movie)
  } catch (err) {
    console.error('Error deleting movie:', err)
  }
}

</script>


<template>
    <div class="flex justify-between items-center">
        <p class="text-sm text-gray-600">{{ moviesCount }} movie{{ moviesCount !== 1 ? 's' : '' }} in your collection
        </p>
    </div>

    <div class="grid gap-4">
        <div v-for="movie in movies" :key="movie.id"
            class="card card-side bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <div class="card-body p-4">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="card-title text-lg">{{ movie.title }}</h3>
                        <p class="text-sm text-gray-600 mb-2">
                            <span class="font-medium">Director:</span> {{ movie.director }}
                        </p>
                        <div class="flex items-center gap-4 text-sm text-gray-500">
                            <span>📅 {{ movie.year }}</span>
                            <span v-if="movie.rating > 0">
                                ⭐ {{ movie.rating }}/10
                            </span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button @click="handleDeleteMovie(movie)"
                            class="btn btn-sm btn-ghost text-red-500 hover:bg-red-200" :disabled="isDeleting"
                            :title="`Delete ${movie.title}`">
                            <span v-if="isDeleting" class="loading loading-spinner loading-xs"></span>
                            <TrashIcon v-else class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>