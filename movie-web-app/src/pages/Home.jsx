import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import axios from "axios";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          "https://raw.githubusercontent.com/sharmadhiraj/free-json-datasets/master/docs/sports-entertainment/imdb_top_movies.json",
        );

        setTimeout(() => {
          setMovies(response.data.data.slice(0, 200));
          setLoading(false);
        }, 400);
      } catch (error) {
        setError(`Failed to Fetch Movies: ${error.message}`);
      }
    };

    fetchMovie();
  }, []);

  // flatmap function return the multiple array data and collect the data
  const allGenres = movies.flatMap((movie) => movie.genres ?? []);

  // set method can be remove duplicate data, ... spard operator to collect data and return to new array
  const genres = [...new Set(allGenres)].filter(Boolean);

  const filterMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genres.includes(selectedGenre));

  // use filter movie for only show particular category movie
  const searchMovies = filterMovies.filter((movie) =>
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

      <div className="categories">
        <button
          type="button"
          className={selectedGenre === "All" ? "active" : ""}
          onClick={() => setSelectedGenre("All")}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={selectedGenre === genre ? "active" : ""}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
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
