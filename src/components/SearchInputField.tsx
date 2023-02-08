import React, {
  ReactEventHandler,
  ReactHTMLElement,
  useRef,
  useState,
} from "react";
import "../styles/SearchInputField.css";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  const searchTerm = useRef<HTMLInputElement>(null);

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." ref={searchTerm} />
      <button className="search-button">
        <AiOutlineSearch />
      </button>
    </div>
  );
};

export default SearchInput;
