import React from "react";
import "./style.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TodoApp. All rights reserved.</p>
    </footer>
  );
}
