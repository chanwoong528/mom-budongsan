import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">매물 리스트</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
