import smoothScrollTo from "../../util/smoothScroll";
import ContentCircle from "./ContentCircle";
import "./Home.css";

import { FaArrowDownLong } from "react-icons/fa6";

function Home() {
  function scrolltoMovieSelector() {
    const movieSelector = document.getElementById("movieSelector");
    if (movieSelector) smoothScrollTo("movieSelector", 500);
  }

  return (
    <div className="home-container flex-v-center" id="home">
      <div className="flex-v-center home-textContainer">
        <h1 className="heading-primary">
          Book your Movie Tickets Online Today
        </h1>
        <p className="welcome-text">
          welcome to our movie ticket booking app, where you can enjoy a hassel
          free booking experience
        </p>
      </div>
      <button
        className="button button-cta"
        onClick={() => scrolltoMovieSelector()}
      >
        Book now{" "}
        <span className="bounce">
          <FaArrowDownLong />{" "}
        </span>
      </button>
      <div className="flex-h-center contectCircle-container">
        <ContentCircle>1. Select Your Movie</ContentCircle>
        <ContentCircle>2. Select Time Slot</ContentCircle>
        <ContentCircle>3. Select Your Seats</ContentCircle>
      </div>
    </div>
  );
}

export default Home;
