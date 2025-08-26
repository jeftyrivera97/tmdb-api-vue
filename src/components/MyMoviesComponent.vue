<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMyMoviesStore } from '../stores/mymovies'  // Correct store
import { useGetMovies } from '../helpers/GetMovies'   // Helper to get movies
import { useDeleteMovie } from '../helpers/DeleteMovie';
import AlertComponent from './AlertComponent.vue';
import MyMoviesList from './MyMoviesList.vue';


// My Movies Store
const moviesStore = useMyMoviesStore()

// Helper to get movies
const { fetchMovies, refreshMovies } = useGetMovies()

// Helper to delete movies
const {error: deleteError, success: deleteSuccess } = useDeleteMovie()

// Destructuring reactive from using storeToRefs
const { loading, error, hasMovies  } = storeToRefs(moviesStore)

onMounted(() => {
  // Load Movies
  fetchMovies()
})

// Reload Movies
const reloadMovies = () => {
  refreshMovies()
}

</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex justify-between items-center mb-4">
                <h2 class="card-title text-xl">My Movie Collection</h2>
                <button 
                    @click="reloadMovies" 
                    class="btn btn-sm btn-outline"
                    :disabled="loading"
                >
                    <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                    {{ loading ? 'Loading...' : 'Refresh' }}
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-8">
                <div class="loading loading-spinner loading-lg"></div>
                <p class="mt-2">Loading your movies...</p>
            </div>

            <!-- Delete Success Message -->
            <div v-if="deleteSuccess" class="alert alert-success mb-4">
              <AlertComponent :message="deleteSuccess" type="success" />
            </div>

            <!-- Delete Error Message -->
            <div v-if="deleteError" class="alert alert-error mb-4">
                <AlertComponent :message="deleteError" type="error" />
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="alert alert-error">
                <AlertComponent :message="error" type="error" />
                   
            </div>

            <!-- Empty State -->
            <div v-else-if="!hasMovies" class="text-center text-gray-500 py-12">
                <div class="text-6xl mb-4">🎬</div>
                <p class="text-lg">No movies in your collection yet</p>
                <p class="text-sm text-gray-400">Start by adding your first movie!</p>
            </div>

            <!-- Movies List -->
            <div v-else class="space-y-4">
             <MyMoviesList />
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Your styles here */
</style>
<!-- Your component content here -->
