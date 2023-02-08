import React from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../context/MovieContext";
import "../styles/MovieCard.css";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`${movie.id}`);
      }}
      className="card"
    >
      <div className="dark-third" style={{ width: "185px", textAlign: "left" }}>
        <img
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={movie.poster_path}
          className="img-style"
        />
        <div className="mt-2">
          {movie.title} ( {movie.release_date.slice(0, 4)} )
        </div>
        <div className="mt-2">language: {movie.original_language}</div>
      </div>
      <div
        className="rating"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          translate: "40% -40%",
          width: "30px",
          height: "30px",
        }}
      >
        {movie.vote_average}
      </div>
    </div>
  );
}
