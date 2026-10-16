import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import axios from "axios";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          "https://raw.githubusercontent.com/sharmadhiraj/free-json-datasets/master/docs/sports-entertainment/imdb_top_movies.json",
        );

        setTimeout(() => {
          setMovies(response.data.data.slice(0, 100));
          setLoading(false);
        }, 400);
      } catch (error) {
        setError(`Failed to Fetch Movies: ${error.message}`);
      }
    };

    fetchMovie();
  }, []);

  const searchMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="home">
      <div className="search-container">
        <div className="search-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            className="search-movie"
            placeholder="Search Movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="section-title">Populer Movie</div>

      {loading && <p className="status-text">Loading Movies...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="movie-grid">
          {searchMovies.map((movie) => (
            <MovieCard key={movie.rank} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
