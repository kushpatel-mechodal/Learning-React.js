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
  const [currentPage, setCurrentPage] = useState(1); //use for current page and inital value 1 page
  const [itemPerPage, setItemPerPage] = useState(20); //use for movie can be display in per page

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

  //ceil function return the full number
  const totalPages = Math.ceil(searchMovies.length / itemPerPage);

  //it returns the index of page
  const startIndex = (currentPage - 1) * itemPerPage;

  //it return the movie par page
  const currentMovies = searchMovies.slice(
    startIndex,
    startIndex + itemPerPage,
  );

  //pagination function and increase page number
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const pages = [];

  // Calculate the first page number in the current group
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;

  // Add up to 5 page numbers
  for (let i = startPage; i < startPage + 5 && i <= totalPages; i++) {
    pages.push(i);
  }

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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="section-title">Populer Movie</div>

      <div className="categories">
        <button
          type="button"
          className={selectedGenre === "All" ? "active" : ""}
          onClick={() => {
            setSelectedGenre("All");
            setCurrentPage(1);
          }}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={selectedGenre === genre ? "active" : ""}
            onClick={() => {
              setSelectedGenre(genre);
              setCurrentPage(1);
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading && <p className="status-text">Loading Movies...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="movie-grid">
            {currentMovies.map((movie) => (
              <MovieCard key={movie.rank} movie={movie} />
            ))}
          </div>
          <div className="pagination">
            <button
              type="button"
              className="prev-btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* display the 1 to 5 page numbers */}
            {pages.map((page, index) => (
              <button
                key={index}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="next-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Home;
