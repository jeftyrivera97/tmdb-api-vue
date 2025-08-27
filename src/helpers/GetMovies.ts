import { ref } from "vue";
import { useMyMoviesStore } from "../stores/mymovies";
import type { MyMovie } from "../interfaces/MyMovie";

export const useGetMovies = () => {
  const moviesStore = useMyMoviesStore();
  const isLoading = ref(false);
  const error = ref("");

  // Get all movies from Rails API
  const fetchMovies = async (): Promise<MyMovie[]> => {
    isLoading.value = true;
    error.value = "";
    moviesStore.loading = true;
    moviesStore.error = null;

    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Movies fetched from API:", data);

      // Handle different response formats
      let movies: MyMovie[] = [];

      if (Array.isArray(data)) {
        // Direct array response
        movies = data;
      } else if (data.movies && Array.isArray(data.movies)) {
        // Paginated response { movies: [...], total_count: X, ... }
        movies = data.movies;
      } else {
        throw new Error("Invalid response format");
      }

      // Clear store and add all movies
      moviesStore.clearMovies();
      movies.forEach((movie) => {
        moviesStore.addMovie(movie);
      });

      console.log(`${movies.length} movies loaded into store`);
      return movies;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error fetching movies";
      error.value = errorMessage;
      moviesStore.error = errorMessage;
      console.error("Error fetching movies:", err);
      throw err;
    } finally {
      isLoading.value = false;
      moviesStore.loading = false;
    }
  };

  // Refresh movies (fetch and update store)
  const refreshMovies = async () => {
    try {
      await fetchMovies();
    } catch (err) {
      console.error("Error refreshing movies:", err);
    }
  };

  return {
    isLoading,
    error,
    fetchMovies,
    refreshMovies,
    // Store getters for convenience
    movies: () => moviesStore.movies,
    hasMovies: () => moviesStore.hasMovies,
    moviesCount: () => moviesStore.moviesCount,
  };
};
