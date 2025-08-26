import { defineStore } from 'pinia'
import { getPopularMovies, type Movie } from '../api'

interface MoviesState {
  movies: Movie[]
  loading: boolean
  error: string | null
}

export const useMoviesStore = defineStore('movies', {
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
        this.error = 'Error al cargar las películas. Por favor, intenta de nuevo.'
        console.error('Error fetching movies:', err)
      } finally {
        this.loading = false
      }
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
