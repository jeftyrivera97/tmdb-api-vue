import type { Movie, TMDbResponse } from "../interfaces/Movie";


// API
const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGRmYzEwN2ZmMmQ4MzY3YzE1ZTQyMjBkNjE3NTk0ZSIsIm5iZiI6MTc1NjE2MDk0OS4wNTMsInN1YiI6IjY4YWNlM2I1MzQxM2U5OTg4ZjFlNTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z3R0UfTgSTNCOea-Myr4QDph1bZ8vEPoDhAiLd1_3TY";



// Function to make API requests with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in TMDb API request:', error);
    throw error;
  }
}

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  const data = await apiRequest<TMDbResponse>(`/movie/popular?language=en-US&page=${page}`);
  return data.results;
}

// Function to get the complete image URL
export function getImageUrl(path: string | null, size: 'w200' | 'w300' | 'w400' | 'w500' | 'original' = 'w500'): string {
  if (!path) return '/placeholder-movie.jpg'; // Default image
  return `https://image.tmdb.org/t/p/${size}${path}`;
}