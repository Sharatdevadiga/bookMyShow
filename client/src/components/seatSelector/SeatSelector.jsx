import "./SeatSelector.css";
import { seats } from "../../../public/data";
import { bookingContext } from "../../App";
import { useContext } from "react";
import BookTheShow from "../booking/BookTheShow";

// import { useState } from "react";
// ["A1", "A2", "A3", "A4", "D1", "D2"]

function SeatSelector() {
  const { selectedMovie, selectedTime, selectedSeats, setSelectedSeats } =
    useContext(bookingContext);

  function toggleSeat(row, seat) {
    setSelectedSeats((prev) => {
      if (selectedSeats[row].includes(seat)) {
        const updatedRow = prev[row].filter((s) => s !== seat);
        console.log("calling the function: deleting seat");
        console.log(selectedSeats);
        return { ...prev, [row]: updatedRow };
      } else {
        console.log("calling the function: adding seat");
        console.log(selectedSeats);
        const updatedRow = [...prev[row], seat];
        return { ...prev, [row]: updatedRow };
      }
    });
  }

  const seatNumbers = new Array(10).fill(0).map((_, i) => i + 1);
  return (
    <>
      <div className="seatSelector-container flex-v-center">
        <h2 className="heading-secondary">Select Your Seats</h2>
        <div
          className="screen"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${selectedMovie?.poster}) center/cover no-repeat`,
          }}
        >
          <div className="time-inScreen">{selectedTime}</div>
        </div>
        <div className="seat-container">
          {seats.map((row) => (
            <div key={row} className="seat-row">
              <div className="row-label">{row}</div>
              {seatNumbers.map((seat) => (
                <button
                  key={seat}
                  onClick={() => toggleSeat(row, seat)}
                  className={`seat-button ${
                    selectedSeats[row].includes(seat)
                      ? "seat-button-selected"
                      : ""
                  }`}
                >
                  {seat}
                </button>
              ))}
            </div>
          ))}
        </div>
        <BookTheShow></BookTheShow>
      </div>
    </>
  );
}

export default SeatSelector;
