import { REACT_APP_API_KEY } from "./session";

export const getNowPlayingMovies = (page: number = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${REACT_APP_API_KEY}&language=en-US&page=${page}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

export const getPopularMovies = (page: Number = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_API_KEY}&language=en-US&page=${page}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};
