import { useContext } from "react";
import "./MovieSelector.css";
import { bookingContext } from "../../App";

/* eslint-disable react/prop-types */
function MovieCard({ poster, title }) {
  const { selectedMovie, setSelectedMovie } = useContext(bookingContext);

  function handleMovieSelect(movie) {
    setSelectedMovie(movie);
    console.log(selectedMovie);
  }

  return (
    <div
      className={`movie-card ${
        selectedMovie?.title === title ? "selected" : ""
      }`}
      onClick={() => handleMovieSelect({ title, poster })}
    >
      <img src={poster} alt={title} />
      <h3 className="movie-card-title">{title}</h3>
    </div>
  );
}

export default MovieCard;
