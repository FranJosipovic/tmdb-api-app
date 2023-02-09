import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import TopActionBar from "../components/TopActionBar";
import { useMovie } from "../context/MovieContext";
import { Movie } from "../context/MovieContext";

export default function Main() {
  const { getMovies, movies } = useMovie();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

  return (
    <div className="screen">
      <TopActionBar />
      <div className="movies-wrapper">
        <div className="movies-list">
          {movies.length > 0 &&
            movies.map((movie) => {
              return <MovieCard movie={movie} />;
            })}
        </div>
        <div
          style={{
            width: "100%",
            height: "3vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            paddingBottom: "3vh",
          }}
        >
          <button
            className="load-btn"
            onClick={() => setCurrentPage((prevState) => prevState + 1)}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
