import { createBrowserRouter, Outlet } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { SessionProvider } from "./context/SessionContext";
import MainLayout from "./layouts/MainLayout";
import CreateNewSession from "./pages/CreateNewSession";
import Main from "./pages/Main";
import MovieDetails from "./pages/MovieDetails";

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        path: "/",
        element: <CreateNewSession />,
      },
      {
        element: <MainLayout />,
        children: [
          { path: "/main", element: <Main /> },
          { path: "/main/:movieId", element: <MovieDetails /> },
        ],
      },
    ],
  },
]);

function ContextWrapper() {
  return (
    <SessionProvider>
      <MovieProvider>
        <Outlet />
      </MovieProvider>
    </SessionProvider>
  );
}
