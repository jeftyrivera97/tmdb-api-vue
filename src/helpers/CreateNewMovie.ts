import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMyMoviesStore } from '../stores/mymovies'
import type { MyMovie } from '../interfaces/MyMovie'

export const useCreateMovie = () => {
  const moviesStore = useMyMoviesStore()

  // Form data reactive
  const movieForm = reactive({
    title: '',
    director: '',
    year: new Date().getFullYear(),
    rating: 0
  })

  // Loading and error states
  const isLoading = ref(false)
  const error = ref('')
  const success = ref('')

  // Reset form function
  const resetForm = () => {
    movieForm.title = ''
    movieForm.director = ''
    movieForm.year = new Date().getFullYear()
    movieForm.rating = 0
    error.value = ''
    success.value = ''
  }

  // Submit function
  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    
    // Reset states
    error.value = ''
    success.value = ''
    isLoading.value = true

    try {
      // Prepare data for Rails API
      const movieData = {
        movie: {
          title: movieForm.title,
          director: movieForm.director,
          year: movieForm.year, // Send year as integer
          rating: movieForm.rating
        }
      }

      // Make POST request to Rails API
      const response = await fetch('http://localhost:3000/api/v1/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(movieData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.errors?.join(', ') || 'Error creating movie')
      }

      const createdMovie = await response.json()
      console.log('Movie created:', createdMovie)
      
      // Add movie to store immediately for instant UI update
      const movieForStore: MyMovie = {
        id: createdMovie.id,
        title: createdMovie.title,
        director: createdMovie.director,
        year: createdMovie.year,
        rating: createdMovie.rating
      }
      
      moviesStore.addMovie(movieForStore)
      console.log('Movie added to store:', movieForStore)
      
      // Show success message
      success.value = 'Movie created successfully!'
      console.log('Success message set:', success.value)
      
      // Wait before resetting form to show success message
      setTimeout(() => {
        resetForm()
      }, 2000)

      // Optional: Redirect after success (commented out to stay on the same page)
      // setTimeout(() => {
      //   router.push('/popular')
      // }, 3000)

      return createdMovie

    } catch (err) {
      console.error('Error creating movie:', err)
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    movieForm,
    isLoading,
    error,
    success,
    handleSubmit,
    resetForm
  }
}