import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header: React.FC = () => (
  <header className="header">
    <h1>SpaceX Launches</h1>
    <nav>
      <h1><Link to="/">Home</Link></h1>
    </nav>
  </header>
);

export default Header;
