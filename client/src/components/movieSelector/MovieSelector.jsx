import MovieCard from "./MovieCard";
import { movies } from "../../../public/data";

function MovieSelector() {
  return (
    <div className="movieSelector-container flex-v-center" id="movieSelector">
      <h2 className="heading-secondary">Select your Movie</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            poster={movie.poster}
            title={movie.title}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
}

export default MovieSelector;
