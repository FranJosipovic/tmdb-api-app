import React from "react";
import "../styles/TopActionBar.css";
import Dropdown from "./DropdownMenu";
import SearchInput from "./SearchInputField";

export default function TopActionBar() {
  return (
    <div className="TABwrapper">
      <h5 className="title">TMDB-API-APP</h5>
      <SearchInput />
      <Dropdown />
    </div>
  );
}
