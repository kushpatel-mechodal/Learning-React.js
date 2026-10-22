import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header({ themeToggle, setThemeToggle }) {
  // menu open and close use for mobile responsive
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Movies",
      to: "/",
    },
  ];

  return (
    <header className={`header ${themeToggle ? "light-mode" : "dark-mode"}`}>
      <nav className="navbar ">
        <Link to="/" className="logo">
          Movie App
        </Link>

        <button
          type="button"
          className={`theme-toggle ${themeToggle ? "light-mode" : "dark-mode"}`}
          onClick={() => setThemeToggle(!themeToggle)}
          aria-label="Toggle dark and light mode"
        >
          {/* if them state true then display ☽ otherwise by default  */}
          <FontAwesomeIcon icon={themeToggle ? faSun : faMoon} />
        </button>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {/* if menu state true then display ✕ otherwise by default ☰ */}
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>

        <ul
          // if menuopen true then add menu class
          className={`nav-list  ${menuOpen ? "menu" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
