import React from "react";
import "./Footer.css";

function Footer({ themeToggle }) {
  return (
    <footer className={`footer ${themeToggle ? "light-mode" : "dark-mode"}`}>
      <div>
        <p> © 2026 Movie App. All rights reserved.</p>
      </div>
      <div>
        <p>Discover your next favorite movie</p>
      </div>
    </footer>
  );
}

export default Footer;
