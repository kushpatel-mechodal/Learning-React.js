import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.rank}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-poster">
          <img src={movie.image} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">Rank #{movie.rank}</p>
          <p className="movie-rating">⭐ {movie.rating}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
