import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Search, Camera } from "lucide-react";

const API_KEY = "296dbc59";
const DEBOUNCE_DELAY = 200;

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMovies = useCallback(async () => {
    if (!query.trim()) {
      setError("⚠️ Please enter a movie title to search.");
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError("");
      } else {
        setMovies([]);
        setError("❌ No movies found. Try a different search.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("⚡ Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        searchMovies();
      } else {
        setMovies([]);
        setError("");
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [query, searchMovies]);

  return (
    <div className="min-h-screen py-10 bg-gray-900">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-8 flex justify-center items-center gap-2">
        <Camera className="w-10 h-10" />
        Movie Search
      </h1>

      <div className="flex justify-center items-center max-w-2xl mx-auto px-4">
        <input
          className="w-full border border-gray-300 p-3 h-12 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchMovies}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-12 rounded-r-lg transition duration-200 flex items-center justify-center flex-shrink-0"
        >
          <Search className="w-6 h-7" />
        </button>
      </div>

      {loading && (
        <p className="text-blue-400 text-lg text-center mt-4">Loading...</p>
      )}
      {error && (
        <p className="text-red-500 text-lg text-center mt-4">{error}</p>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 md:px-20">
        {movies.length > 0
          ? movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          : !loading &&
            !error && (
              <p className="text-gray-200 text-center col-span-full">
                🎬 No movies found! Try a different query.
              </p>
            )}
      </div>
    </div>
  );
}

export default Home;
