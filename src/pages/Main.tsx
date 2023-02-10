import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import TopActionBar from "../components/TopActionBar";
import { useMovie } from "../context/MovieContext";
import { BsShuffle } from "react-icons/bs";
import { addListener } from "process";

export default function Main() {
  const { setCurrentPage, movies } = useMovie();

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
        <div className="load-shuffle-wrapper">
          <button
            className="load-btn"
            onClick={() => setCurrentPage((prevState) => prevState + 1)}
          >
            Load More
          </button>
          <button className="shuffle-btn">
            <BsShuffle size={"50%"} />
          </button>
        </div>
      </div>
    </div>
  );
}
