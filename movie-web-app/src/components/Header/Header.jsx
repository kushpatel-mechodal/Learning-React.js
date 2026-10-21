import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  // menu open and close use for mobile responsive
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Movies",
      to: "/",
    },
  ];

  return (
    <header className="header">
      <nav className="navbar ">
        <Link to="/" className="logo">
          Movie App
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {/* if menu state true then display ✕ otherwise by default ☰ */}
          {menuOpen ? "✕" : "☰"}
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
