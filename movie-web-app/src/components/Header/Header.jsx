import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
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

        <ul className="nav-list">
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
