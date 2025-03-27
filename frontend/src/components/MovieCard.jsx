import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out bg-white w-full sm:w-64">
      
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-72 object-cover rounded-md"
      />

  
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{movie.Title}</h3>
        <p className="text-sm text-gray-600">📅 Year: {movie.Year}</p>
        <p className="text-sm text-gray-500">🎬 IMDB ID: {movie.imdbID}</p>
      </div>

 
      <Link to={`/movies/${movie.imdbID}`} className="block mt-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
          🎥 View Details
        </button>
      </Link>
    </div>
  );
}

export default MovieCard;
