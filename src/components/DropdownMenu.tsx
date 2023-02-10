import React, { useState } from "react";
import { useMovie } from "../context/MovieContext";
import "../styles/DropdownMenu.css";

const Dropdown = () => {
  const [showMenu, setShowMenu] = useState(false);

  const {
    currentMovieCategory,
    MOVIE_CATEGORIES,
    setCurrentMovieCategory,
    setCurrentPage,
  } = useMovie();

  return (
    <div className="dropdown">
      <button
        className="dropdown-button"
        onClick={() => {
          setShowMenu((prevState) => {
            return !prevState;
          });
        }}
      >
        {currentMovieCategory}
      </button>
      {showMenu && (
        <ul className="dropdown-menu">
          {MOVIE_CATEGORIES.map((category) => {
            return (
              <li
                onClick={() => {
                  setCurrentPage(1);
                  setCurrentMovieCategory(category);
                  setShowMenu(false);
                }}
              >
                {category}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
