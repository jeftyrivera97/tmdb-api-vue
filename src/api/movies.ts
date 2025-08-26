// API
const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGRmYzEwN2ZmMmQ4MzY3YzE1ZTQyMjBkNjE3NTk0ZSIsIm5iZiI6MTc1NjE2MDk0OS4wNTMsInN1YiI6IjY4YWNlM2I1MzQxM2U5OTg4ZjFlNTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z3R0UfTgSTNCOea-Myr4QDph1bZ8vEPoDhAiLd1_3TY";

// Tipos de película (según TMDb)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
}

export interface TMDbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Función para hacer peticiones a la API con manejo de errores
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
    console.error('Error en la petición a TMDb:', error);
    throw error;
  }
}

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  const data = await apiRequest<TMDbResponse>(`/movie/popular?language=en-US&page=${page}`);
  return data.results;
}

// Función para obtener la URL completa de la imagen
export function getImageUrl(path: string | null, size: 'w200' | 'w300' | 'w400' | 'w500' | 'original' = 'w500'): string {
  if (!path) return '/placeholder-movie.jpg'; // Imagen por defecto
  return `https://image.tmdb.org/t/p/${size}${path}`;
}