import React from "react";
import "./MovieCard.css";

function MovieCard() {
  const movies = [
    {
      id: 1,
      name: "Dhurandhar",
      year: 2025,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1Xqn_Tw-5j4lg_Kiw9tyke4FBiHZFZqNpvl7kfY9gg&s=10",
    },
    {
      id: 2,
      name: "Dhurandhar: The Revange",
      year: 2026,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwq0eWrnC8MxuuiVT8D-OyicTlfPL0mPaPwMvle8tNXg&s",
    },
    {
      id: 3,
      name: "War 2",
      year: 2025,
      image:
        "https://m.media-amazon.com/images/M/MV5BNjY5OTg4NTYtZjVkZS00YTZmLWIwNDEtM2Y0ODQyMzM2NTJiXkEyXkFqcGc@._V1_.jpg",
    },

    {
      id: 4,
      name: "Animal: part 1",
      year: 2023,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM4BP6pyzMYx3QOnN3XcK7PcJTDcDNh_iH7La6G6Z-0g&s=10",
    },
  ];
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <div className="movie-poster">
            <img src={movie.image} alt="movie image" />
          </div>

          <div className="movie-info">
            <h3 className="movie-title">{movie.name}</h3>
            <p className="movie-year">{movie.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieCard;
