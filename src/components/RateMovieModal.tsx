import React, { useEffect, useState } from "react";
import "../styles/UserRating.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

type RatingProps = {
  rating: number;
  movieTitle: string;
  handleRateMovie: (rating: number) => void;
};

const RATING = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function RateMovieModal({
  rating,
  movieTitle,
  handleRateMovie,
}: RatingProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="user-rating-wrapper"
        onClick={() => {
          setShowModal(true);
        }}
      >
        {rating ? (
          <div className="avg-rating">
            <AiFillStar color="blue" size={"30px"} />
            <div>
              <span style={{ fontSize: "20px" }}>{rating}</span>
              <span style={{ fontSize: "15px", color: "lightGray" }}>/10</span>
            </div>
          </div>
        ) : (
          <>
            <AiOutlineStar color="blue" size={"25px"} />
            <span style={{ color: "blue", fontSize: "25px" }}>Rate</span>
          </>
        )}
      </div>
      {showModal && (
        <RatingModal
          userRating={rating}
          movieTitle={movieTitle}
          setShowModal={setShowModal}
          handleRateMovie={handleRateMovie}
        />
      )}
    </>
  );
}

type ModalProps = {
  userRating: number;
  movieTitle: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleRateMovie: (rating: number) => void;
};

function RatingModal({
  userRating,
  movieTitle,
  setShowModal,
  handleRateMovie,
}: ModalProps) {
  const [temporaryRating, setTemporaryRating] = useState(userRating);

  const [hoverRating, setHoverRating] = useState(userRating);
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="modal-screen">
      <div className="modal-container">
        <div
          className="close-btn"
          onClick={() => {
            setShowModal(false);
          }}
        >
          x
        </div>
        <div className="modal-title">Rate This</div>
        <div className="movie-title">{movieTitle}</div>
        <div className="stars">
          {RATING.map((rating) => {
            return (
              <div
                onMouseEnter={() => {
                  setIsHover(true);
                  setHoverRating(rating);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                  setHoverRating(userRating);
                }}
                onClick={() => {
                  setTemporaryRating(rating);
                }}
                key={rating}
              >
                <Star
                  isRated={
                    isHover ? rating <= hoverRating : rating <= temporaryRating
                  }
                />
              </div>
            );
          })}
        </div>
        <button
          className="confirm-btn"
          onClick={() => {
            if (temporaryRating < 1) return setShowModal(false);
            handleRateMovie(temporaryRating);
            setShowModal(false);
          }}
        >
          Confirm rating
        </button>
      </div>
    </div>
  );
}

type StarProps = {
  isRated: boolean;
};

function Star({ isRated }: StarProps) {
  return (
    <>
      {isRated ? (
        <AiFillStar color="blue" size={"30px"} />
      ) : (
        <AiOutlineStar color="blue" size={"30px"} />
      )}
    </>
  );
}
