import { createContext, Suspense, useEffect, useState } from "react";

import { lazy } from "react";

const Navbar = lazy(() => import("./components/nav/Navbar"));
const Home = lazy(() => import("./components/home/Home"));
const MovieSelector = lazy(() =>
  import("./components/movieSelector/MovieSelector")
);
const Footer = lazy(() => import("./components/footer/Footer"));
const TimeSlot = lazy(() => import("./components/timeSlot/TimeSlot"));
const SeatSelector = lazy(() =>
  import("./components/seatSelector/SeatSelector")
);
const PrevBooking = lazy(() => import("./components/prevBooking/PrevBooking"));
const SliderButton = lazy(() =>
  import("./components/sliderButton/SliderButton")
);

// Rest of the code remains the same
import { seats } from "../public/data";
import Spinner from "./components/spinner/Spinner";

export const bookingContext = createContext();

function App() {
  const getLocalStorageValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  // initialize state from local storage or default value
  const [selectedMovie, setSelectedMovie] = useState(
    getLocalStorageValue("selectedMovie", null)
  );
  const [selectedTime, setSelectedTime] = useState(
    getLocalStorageValue("selectedTime", null)
  );
  const [selectedSeats, setSelectedSeats] = useState(
    getLocalStorageValue(
      "selectedSeats",
      seats.reduce((acc, seatRow) => ({ ...acc, [seatRow]: [] }), {})
    )
  );

  const [isHamOpen, setIsHamOpen] = useState(false);

  const reset = () => {
    setSelectedMovie(null);
    setSelectedTime(null);
    setSelectedSeats(
      seats.reduce((acc, seatRow) => ({ ...acc, [seatRow]: [] }), {})
    );
  };

  const [previousBooking, setPreviousBooking] = useState(
    getLocalStorageValue("previousBooking", {
      movie: {},
      slot: "",
      seats: seats.reduce((acc, seatRow) => ({ ...acc, [seatRow]: [] }), {}),
    })
  );

  const [isPrevBookingOpen, setIsPrevBookingOpen] = useState(false);

  // update local storage values
  useEffect(() => {
    localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
  }, [selectedMovie]);

  useEffect(() => {
    localStorage.setItem("selectedTime", JSON.stringify(selectedTime));
  }, [selectedTime]);

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  useEffect(() => {
    localStorage.setItem("previousBooking", JSON.stringify(previousBooking));
  }, [previousBooking]);

  const contextValue = {
    selectedMovie,
    setSelectedMovie,
    selectedTime,
    setSelectedTime,
    selectedSeats,
    setSelectedSeats,
    previousBooking,
    setPreviousBooking,
    isPrevBookingOpen,
    setIsPrevBookingOpen,
    reset,
    isHamOpen,
    setIsHamOpen,
  };

  return (
    <Suspense
      fallback={
        <div className="page-spinner"> 
          <Spinner /> Loading...
        </div>
      }
    >
      <bookingContext.Provider value={contextValue}>
        <SliderButton />
        <section>
          <Navbar />
          <Home />
        </section>
        <section>
          <PrevBooking />
        </section>
        <section>
          <MovieSelector />
        </section>
        <section>
          <TimeSlot />
        </section>
        <section>
          <SeatSelector />
        </section>
        <section>
          <Footer />
        </section>
      </bookingContext.Provider>
    </Suspense>
  );
}

export default App;
