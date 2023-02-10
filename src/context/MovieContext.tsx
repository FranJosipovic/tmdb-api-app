import exp from "constants";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  getMovieDetailsApi,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  rateMovie,
  searchMovie,
} from "../api/movie";
import { getRatedMovies } from "../api/session";
import { useSession } from "./SessionContext";

type MovieContext = {
  movies: Movie[];
  movie: MovieDetails | null;
  movieRating: number | null;
  searchData: SearchData[];
  currentMovieCategory: string;
  MOVIE_CATEGORIES: string[];
  getMovies: (page: number) => void;
  getMovieDetails: (movieId: string) => void;
  setMovie: React.Dispatch<React.SetStateAction<MovieDetails | null>>;
  handleRateMovie: (rating: number) => void;
  setMovieRating: React.Dispatch<React.SetStateAction<number | null>>;
  search: (query: string) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentMovieCategory: React.Dispatch<React.SetStateAction<string>>;
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

type SearchData = {
  id: number;
  title: string;
};

export function MovieProvider({ children }: MovieProviderProps) {
  const { session } = useSession();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [movieRating, setMovieRating] = useState<number | null>(null);

  const MOVIE_CATEGORIES = ["Now Playing", "Popular", "Top Rated", "Upcoming"];

  const [currentMovieCategory, setCurrentMovieCategory] = useState<string>(
    MOVIE_CATEGORIES[0]
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage, currentMovieCategory]);

  function getMovies(page: number) {
    switch (currentMovieCategory) {
      case "Now Playing":
        console.log("now playing");
        getNowPlayingMovies(page).then((data) => {
          setMovies((prevData: Movie[]) => {
            if (page === 1) {
              return [...data.results];
            }
            return [...prevData, ...data.results];
          });
        });
        break;
      case "Popular":
        console.log("popular");
        getPopularMovies(page).then((data) => {
          setMovies((prevData: Movie[]) => {
            if (page === 1) {
              return [...data.results];
            }
            return [...prevData, ...data.results];
          });
        });
        break;
      case "Top Rated":
        console.log("top rated");
        getTopRatedMovies(page).then((data) => {
          setMovies((prevData: Movie[]) => {
            if (page === 1) {
              return [...data.results];
            }
            return [...prevData, ...data.results];
          });
        });
        break;
      case "Upcoming":
        console.log("upcoming");
        getUpcomingMovies(page).then((data) => {
          setMovies((prevData: Movie[]) => {
            if (page === 1) {
              return [...data.results];
            }
            return [...prevData, ...data.results];
          });
        });
        break;
    }
  }

  function getMovieDetails(movieId: string) {
    getMovieDetailsApi(movieId).then((movieDetails: MovieDetails) => {
      getRatedMovies(session?.guest_session_id!).then((ratedMovies) => {
        let ratedMovie = ratedMovies.results.find((r: any) => {
          return r.id === Number(movieId);
        });
        if (ratedMovie) {
          setMovieRating(ratedMovie.rating);
        } else {
          setMovieRating(null);
        }
      });
      setMovie(movieDetails);
    });
  }

  function handleRateMovie(rating: number) {
    if (!session) {
      return;
    }
    rateMovie(movie?.id!, rating, session.guest_session_id).then((data) => {
      if (data.success) {
        setMovieRating(rating);
      }
    });
  }

  const [searchData, setSearchData] = useState<SearchData[]>([]);

  function search(query: string) {
    searchMovie(query).then((data) => {
      console.log(data.results);
      let originalArray = data.results.slice(0, 6);
      let newArray = originalArray.map((object: SearchData) => {
        return { id: object.id, title: object.title };
      });
      setSearchData(newArray);
    });
  }

  return (
    <Context.Provider
      value={{
        movies,
        movie,
        movieRating,
        searchData,
        currentMovieCategory,
        MOVIE_CATEGORIES,
        getMovies,
        getMovieDetails,
        setMovie,
        handleRateMovie,
        setMovieRating,
        search,
        setCurrentPage,
        setCurrentMovieCategory,
      }}
    >
      {children}
    </Context.Provider>
  );
}
