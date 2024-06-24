import MovieCard from "../movieSelector/MovieCard";
import "./PrevBooking.css";
// import { FaAngleRight } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
// import { movies } from "../../../public/data";
import { seats } from "../../../public/data";
import { bookingContext } from "../../App";
import { useContext, useEffect, useState } from "react";

import { MdError } from "react-icons/md";

function PrevBooking() {
  const { isPrevBookingOpen, setIsPrevBookingOpen } =
    useContext(bookingContext);

  const {
    movie: prevMovie,
    slot: prevSlot,
    seats: prevSeats,
  } = useContext(bookingContext).previousBooking;

  const [isDataValid, setisDataValid] = useState(false);

  useEffect(() => {
    const isSeatSelected = Object.keys(prevSeats).some(
      (key) => prevSeats[key].length !== 0
    );
    if (prevMovie && prevSlot && isSeatSelected) {
      setisDataValid(true);
    } else {
      setisDataValid(false);
    }
  }, [prevMovie, prevSlot, prevSeats]);

  const seatNumbers = new Array(10).fill(0).map((_, i) => i + 1);
  return (
    <>
      <div
        className={`overlay ${isPrevBookingOpen && "active"}`}
        onClick={() => setIsPrevBookingOpen((o) => !o)}
      >
        <div className=" prevBooking-container">
          <h3 className="heading-tertiary prev-booking-title">
            Previous booking
          </h3>
          <div>
            {!isDataValid ? (
              <div className="flex-v-center">
                <MdError className="error-icon " />
                <p className="no-booking">
                  No booking found. please book a show first
                </p>
              </div>
            ) : (
              <div className="booking-content flex-v-center ">
                <MovieCard
                  poster={isDataValid ? prevMovie.poster : null}
                  title={isDataValid ? prevMovie.title : null}
                ></MovieCard>
                <div className="booked-time flex-h-center">
                  <FaClock /> {isDataValid ? prevSlot : ""}
                </div>
                <div className="booked-seats flex-v-center">
                  {seats.map((row) => (
                    <div key={row} className="booked-seat-row">
                      <div className="booked-seat-label">{row}</div>
                      {seatNumbers.map((seat) => (
                        <div
                          key={seat}
                          className={`booking-seat flex-h-center ${
                            prevSeats[row].includes(seat) ? "selected-seat" : ""
                          }`}
                        >
                          {seat}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrevBooking;
