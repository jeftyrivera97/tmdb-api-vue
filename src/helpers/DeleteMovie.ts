import { ref } from 'vue'
import { useMyMoviesStore } from '../stores/mymovies'
import type { MyMovie } from '../interfaces/MyMovie'

export const useDeleteMovie = () => {
  const moviesStore = useMyMoviesStore()
  const isDeleting = ref(false)
  const error = ref('')
  const success = ref('')

  // Delete movie from API and store
  const deleteMovie = async (movieId: number): Promise<boolean> => {
    isDeleting.value = true
    error.value = ''
    success.value = ''

    try {
      // Make DELETE request to Rails API
      const response = await fetch(`http://localhost:3000/api/v1/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Movie not found')
        }
        
        const errorData = await response.json()
        throw new Error(errorData.errors?.join(', ') || `HTTP error! status: ${response.status}`)
      }

      // If successful, remove from store
      moviesStore.removeMovie(movieId)
      
      success.value = 'Movie deleted successfully!'
      console.log(`Movie with ID ${movieId} deleted successfully`)
      
      return true

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting movie'
      error.value = errorMessage
      console.error('Error deleting movie:', err)
      return false
    } finally {
      isDeleting.value = false
    }
  }

  // Delete with confirmation dialog
  const deleteMovieWithConfirmation = async (movie: MyMovie): Promise<boolean> => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${movie.title}"?\n\nThis action cannot be undone.`
    )

    if (!confirmed) {
      return false
    }

    return await deleteMovie(movie.id)
  }



  // Clear messages
  const clearMessages = () => {
    error.value = ''
    success.value = ''
  }

  return {
    isDeleting,
    error,
    success,
    deleteMovie,
    deleteMovieWithConfirmation,
    clearMessages
  }
}