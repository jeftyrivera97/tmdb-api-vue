export interface MyMovie {
  id: number;
  title: string;
  director: string;
  year: number;
  rating: number;

}

export interface MyMoviesState {
  movies: MyMovie[]
  loading: boolean
  error: string | null
}