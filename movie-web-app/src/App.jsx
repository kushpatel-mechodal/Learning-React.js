import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import MovieCard from "./components/MovieCard/MovieCard";

function App() {
  
  const [themeToggle, setThemeToggle] = useState(false);

  return (
    <>
      <div className={`${themeToggle ? "light-mode" : "dark-mode"}`}>
        <Header themeToggle={themeToggle} setThemeToggle={setThemeToggle} />
        <Home />
        <MovieCard />
        <Footer themeToggle={themeToggle} />
      </div>
    </>
  );
}

export default App;
