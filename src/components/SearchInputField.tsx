import React, { useEffect, useRef, useState } from "react";
import "../styles/SearchInputField.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();

  const { search, searchData } = useMovie();

  const searchTerm = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");

  useEffect(() => {
    search(query);
  }, [query]);

  return (
    <div className="search-section">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          ref={searchTerm}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={() => {
            search(query);
          }}
        >
          <AiOutlineSearch />
        </button>
      </div>
      {searchData.length > 0 && (
        <ul className="search-list">
          {searchData.map((searchObj) => {
            return (
              <li
                className="search-item"
                onClick={() => {
                  navigate(`${searchObj.id}`);
                }}
              >
                {searchObj.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
