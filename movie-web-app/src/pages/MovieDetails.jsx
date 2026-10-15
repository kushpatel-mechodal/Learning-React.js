import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

function formatDuration(durationStr) {
  if (!durationStr) return "N/A";
  return durationStr
    .replace("PT", "")
    .replace("H", "h ")
    .replace("M", "m");
}

function MovieDetails() {
  const { rank } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://raw.githubusercontent.com/sharmadhiraj/free-json-datasets/master/docs/sports-entertainment/imdb_top_movies.json",
        );

        const allMovies = response.data?.data || [];
        const selectedMovie = allMovies.find(
          (item) => String(item.rank) === String(rank),
        );

        if (!selectedMovie) {
          throw new Error(`Movie with rank #${rank} was not found.`);
        }

        setMovie(selectedMovie);
      } catch (err) {
        setError(err.message || "Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [rank]);

  return (
    <main className="movie-details-page">
      <div className="details-wrapper">
        {/* ========================================================= */}
        {/* ⭐⭐⭐ BACK TO MOVIES BUTTON (આ રહ્યું બટન) ⭐⭐⭐ */}
        {/* ========================================================= */}
        <Link to="/" className="back-btn">
          <i className="fa-solid fa-arrow-left"></i> Back to Movies
        </Link>
        {/* ========================================================= */}

        {loading && <p className="status-text">Loading movie details...</p>}
        {error && <p className="status-text error">{error}</p>}

        {!loading && !error && movie && (
          <div className="movie-details-card">
            <div className="poster-container">
              <img
                src={movie.image}
                alt={movie.title}
                className="details-poster"
              />
              <span className="rank-tag">Rank #{movie.rank}</span>
            </div>

            <div className="details-info">
              <h1 className="details-title">{movie.title}</h1>

              <div className="details-meta">
                <span className="rating-badge">
                  <i className="fa-solid fa-star"></i> {movie.rating} / 10
                </span>
                {movie.rating_count && (
                  <span className="votes-text">
                    ({movie.rating_count.toLocaleString()} votes)
                  </span>
                )}
                {movie.duration && (
                  <span className="meta-tag">
                    <i className="fa-regular fa-clock"></i> {formatDuration(movie.duration)}
                  </span>
                )}
                {movie.content_rating && (
                  <span className="meta-tag cert">{movie.content_rating}</span>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="genres-container">
                  {movie.genres.map((genre) => (
                    <span key={genre} className="genre-badge">
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className="storyline-box">
                <h3>Storyline</h3>
                <p>{movie.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MovieDetails;
