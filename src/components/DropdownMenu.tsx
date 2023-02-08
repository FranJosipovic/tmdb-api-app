import React, { useState } from "react";
import "../styles/DropdownMenu.css";

const Dropdown = () => {
  const [showMenu, setShowMenu] = useState(false);

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
        Category
      </button>
      {showMenu && (
        <ul className="dropdown-menu">
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
