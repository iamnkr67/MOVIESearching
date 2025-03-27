import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "296dbc59";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Failed to fetch movie details", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-200">Loading...</div>
      </div>
    );
  }

  if (error || !movie.Title) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Movie not found!</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
        {/* Movie Poster */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            alt={movie.Title}
            className="rounded-lg shadow-lg w-full lg:w-80"
          />
        </div>

        {/* Movie Details */}
        <div className="w-full lg:w-2/3 space-y-4">
          <h1 className="text-3xl font-bold text-gray-200">{movie.Title}</h1>
          <p className="text-lg text-gray-200">
            📅 <span className="font-semibold">Released:</span>{" "}
            {movie.Released || "N/A"}
          </p>
          <p className="text-lg text-gray-200">
            ⭐ <span className="font-semibold">Rating:</span>{" "}
            <span className="text-red-500 font-black">
              {movie.imdbRating || "N/A"}
            </span>{" "}
            on IMDB
          </p>
          <p className="text-lg text-gray-200">
            🎥 <span className="font-semibold">Genre:</span>{" "}
            {movie.Genre || "N/A"}
          </p>
          <p className="text-lg text-gray-200">
            🎭 <span className="font-semibold">Actors:</span>{" "}
            {movie.Actors || "N/A"}
          </p>
          <p className="text-lg text-gray-200">
            📝 <span className="font-semibold">Plot:</span>{" "}
            {movie.Plot || "No plot available."}
          </p>
          <p className="text-lg text-gray-200">
            🎬 <span className="font-semibold">Director:</span>{" "}
            {movie.Director || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
