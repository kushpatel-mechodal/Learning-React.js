import React from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <div className="section-title">Populer Movie</div>
      <MovieCard />
    </main>
  );
}

export default Home;
