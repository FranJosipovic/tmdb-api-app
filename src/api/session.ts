export const REACT_APP_API_KEY = "f7622ff39a4206d941a6a4e87268320d";
export const createNewSessionApi = () => {
  return fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${REACT_APP_API_KEY}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};
