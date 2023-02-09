import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovie } from "../context/MovieContext";
import "../styles/DetailsScreen.css";
import { AiFillStar } from "react-icons/ai";
import RateMovieModal from "../components/RateMovieModal";

export default function MovieDetails() {
  const {
    movie,
    movieRating,
    setMovie,
    getMovieDetails,
    handleRateMovie,
    setMovieRating,
  } = useMovie();

  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(movieId!);
    return () => {
      setMovie(null);
      setMovieRating(null);
    };
  }, [movieId]);

  return (
    <div className="details-screen-wrapper">
      {movie && (
        <div className="info-container">
          <div className="header-section">
            <div className="movie-title">{movie.title}</div>
            <div className="ratings">
              <div className="avg-rating-wrap">
                <p style={{ fontSize: "10px", color: "gray" }}>
                  AVERAGE RATIGN
                </p>
                <div className="avg-rating">
                  <AiFillStar color="yellow" size={"30px"} />
                  <div>
                    <span style={{ fontSize: "20px" }}>
                      {movie.vote_average.toString().slice(0, 3)}
                    </span>
                    <span style={{ fontSize: "15px", color: "lightGray" }}>
                      /10
                    </span>
                  </div>
                </div>
              </div>
              <div className="user-rating">
                <p style={{ fontSize: "10px", color: "gray" }}>YOUR RATING</p>
                <RateMovieModal
                  rating={movieRating ? movieRating : 0}
                  movieTitle={movie.title}
                  handleRateMovie={handleRateMovie}
                />
              </div>
            </div>
          </div>
          <div className="poster-wrapper">
            <img
              className="poster"
              src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="poster"
            />
            <div className="overview-wrapper">
              <p className="overview">{movie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
