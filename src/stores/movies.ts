import { defineStore } from 'pinia'
import { getPopularMovies } from '../api'
import type { MoviesState, Movie } from "../interfaces/Movie";
 

export const useMoviesStore = defineStore('tmdb-movies', {
  state: (): MoviesState => ({
    movies: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchPopularMovies() {
      this.loading = true
      this.error = null

      try {
        this.movies = await getPopularMovies()
      } catch (err) {
        this.error = 'Error Loading Movies'
        console.error('Error fetching movies:', err)
      } finally {
        this.loading = false
      }
    },

    // Add a new movie to the store
    addMovie(movie: Movie) {
      this.movies.unshift(movie) // Add to the beginning of the array
    },

    clearMovies() {
      this.movies = []
    },

    clearError() {
      this.error = null
    }
  },

  getters: {
    hasMovies: (state) => state.movies.length > 0,
    moviesCount: (state) => state.movies.length,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error
  }
})
