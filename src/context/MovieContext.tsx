import exp from "constants";
import { createContext, useContext, ReactNode, useState } from "react";
import { getNowPlayingMovies } from "../api/movie";

type MovieContext = {
  movies: Movie[];
  getMovies: (page: number) => void;
};

const Context = createContext<MovieContext | null>(null);

export function useMovie() {
  return useContext(Context) as MovieContext;
}

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type Genre = {
  id: number;
  name: string;
};

type Collection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieProviderProps = {
  children: ReactNode;
};

export function MovieProvider({ children }: MovieProviderProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  function getMovies(page: number) {
    getNowPlayingMovies(page).then((data) => {
      setMovies((prevData: Movie[]) => {
        return [...prevData, ...data.results];
      });
    });
  }

  return (
    <Context.Provider value={{ movies, getMovies }}>
      {children}
    </Context.Provider>
  );
}
