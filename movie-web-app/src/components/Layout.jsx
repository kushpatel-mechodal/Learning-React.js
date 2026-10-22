import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  const [themeToggle, setThemeToggle] = useState(() => {
    return localStorage.getItem("theme") === "light-mode";
  });

  useEffect(() => {
    localStorage.setItem("theme", themeToggle ? "light-mode" : "dark-mode");
  }, [themeToggle]);  

  return (
    <div className={themeToggle ? "light-mode" : "dark-mode"}>
      <Header themeToggle={themeToggle} setThemeToggle={setThemeToggle} />
      <Outlet />
      <Footer themeToggle={themeToggle} />
    </div>
  );
}

export default Layout;
