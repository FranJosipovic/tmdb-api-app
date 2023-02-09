export const getNowPlayingMovies = (page: number = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      import.meta.env.VITE_APP_API_KEY
    }&language=en-US&page=${page}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

export const getPopularMovies = (page: Number = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_APP_API_KEY
    }&language=en-US&page=${page}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

export const getMovieDetailsApi = (movieId: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
      import.meta.env.VITE_APP_API_KEY
    }&language=en-US`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

export const rateMovie = (
  movieId: number,
  rating: number,
  sessionId: string
) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${
      import.meta.env.VITE_APP_API_KEY
    }&guest_session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        value: rating,
      }),
    }
  ).then((res) => res.json());
};
