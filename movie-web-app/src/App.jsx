import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import MovieCard from "./components/MovieCard/MovieCard";

function App() {
  return (
    <>
      <Header />
      <Home/>
      <MovieCard/>
      <Footer />

    </>
  );
}

export default App;
