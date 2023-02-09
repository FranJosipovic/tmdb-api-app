export const REACT_APP_API_KEY = "f7622ff39a4206d941a6a4e87268320d";
export const createNewSessionApi = () => {
  return fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${
      import.meta.env.VITE_APP_API_KEY
    }`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

export const getRatedMovies = (sessionId: string) => {
  return fetch(
    `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${
      import.meta.env.VITE_APP_API_KEY
    }&language=en-US&sort_by=created_at.asc`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};
