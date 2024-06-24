import { createContext, useEffect, useState } from "react";

import Navbar from "./components/nav/Navbar";
import Home from "./components/home/Home";
import MovieSelector from "./components/movieSelector/MovieSelector";
import Footer from "./components/footer/Footer";
import TimeSlot from "./components/timeSlot/TimeSlot";
import SeatSelector from "./components/seatSelector/SeatSelector";
import PrevBooking from "./components/prevBooking/PrevBooking";
import SliderButton from "./components/sliderButton/SliderButton";
import { seats } from "../public/data";

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
  );
}

export default App;
