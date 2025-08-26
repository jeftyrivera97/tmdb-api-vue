import { defineStore } from 'pinia'
import { type MyMoviesState, type MyMovie } from '../interfaces/MyMovie';

export const useMyMoviesStore = defineStore('movies', {
  state: (): MyMoviesState => ({
    movies: [],
    loading: false,
    error: null
  }),

  actions: {
    // Fetch movies from API
    async fetchMovies() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('http://localhost:3000/api/v1/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        // Handle different response formats
        let movies: MyMovie[] = []
        if (Array.isArray(data)) {
          movies = data
        } else if (data.movies && Array.isArray(data.movies)) {
          movies = data.movies
        }

        this.movies = movies
        console.log(`${movies.length} movies loaded from API`)

      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error fetching movies'
        console.error('Error fetching movies:', err)
      } finally {
        this.loading = false
      }
    },

    async saveMovie() {
      this.loading = true
      this.error = null

      try {
        // This method will be called from the helper after API success
        this.loading = false
      } catch (err) {
        this.error = 'Error Loading Movies'
        console.error('Error fetching movies:', err)
      } finally {
        this.loading = false
      }
    },

    // Add a new movie to the store
    addMovie(movie: MyMovie) {
      this.movies.unshift(movie) // Add to the beginning of the array
    },

    clearMovies() {
      this.movies = []
    },

    clearError() {
      this.error = null
    },
    removeMovie(movieId: number) {
      this.movies = this.movies.filter(movie => movie.id !== movieId)
    }
  },

  getters: {
    hasMovies: (state) => state.movies.length > 0,
    moviesCount: (state) => state.movies.length,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error
    
  }
})
