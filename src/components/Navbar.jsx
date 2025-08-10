import React from "react";
import "./style.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">TodoApp</div>
        <ul className="navbar-menu">
          <li><a href="#my-todos">My Todos</a></li>
          <li><a href="#previous-todos">Previous Todos</a></li>
        </ul>
      </div>
    </nav>
  );
}
