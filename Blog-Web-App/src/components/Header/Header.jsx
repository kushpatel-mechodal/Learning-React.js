import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth?.status);
  const navigate = useNavigate();
  const location = useLocation();

  //use this array-object for add items directly
  const navItems = [
    {
      name: "Home",
      to: "/",
      active: true,
    },
    {
      name: "Login",
      to: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      to: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      to: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      to: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 py-3.5 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-6">
            <Link
              to="/"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex items-center gap-1 sm:gap-2 ml-auto flex-wrap">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className={`inline-block px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                      location.pathname === item.to
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                    onClick={() => navigate(item.to)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
