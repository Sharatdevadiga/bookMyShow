import { useContext, useEffect, useState } from "react";
import "./TimeSlotClock.css";
import { slots } from "../../../public/data";
import { bookingContext } from "../../App";

function TimeSlot() {
  const { selectedTime, setSelectedTime } = useContext(bookingContext);

  const [prevHrDeg, setPrevHrDeg] = useState(0);
  const [prevMinDeg, setPrevMinDeg] = useState(0);

  const handleTimeSlotClick = (time) => {
    setPrevHrDeg(+hrDeg);
    setPrevMinDeg(+minDeg);
    setSelectedTime(time);
    console.log(selectedTime);
  };

  const getHourDegrees = (hours, minutes) => {
    hours = Number(hours);
    minutes = Number(minutes);
    return Number((+hours % 12) * 30 + minutes * 0.5);
  };

  const getMinuteDegrees = (minutes) => {
    minutes = Number(minutes);
    return Number(+minutes * 6);
  };

  const time = selectedTime ? selectedTime.split(" ")[0] : "00:00";
  const [selectedHours, selectedMinutes] = selectedTime
    ? time.split(":").map(Number)
    : [0, 0];
  let hrDeg = getHourDegrees(selectedHours, selectedMinutes);
  let minDeg = getMinuteDegrees(selectedMinutes);

  if (hrDeg < prevHrDeg) {
    hrDeg += 360;
  }
  if (minDeg < prevMinDeg) {
    minDeg += 360;
  }

  useEffect(() => {
    setPrevHrDeg(hrDeg);
    setPrevMinDeg(minDeg);
  }, [selectedTime]);

  return (
    <div className="time-slot-container">
      <h2 className="heading-secondary">Select Time Slot</h2>
      <div className="clock">
        <div
          className="hour-hand"
          style={{
            transform: `rotate(${hrDeg < prevHrDeg ? 360 + hrDeg : hrDeg}deg)`,
          }}
        ></div>
        <div
          className="minute-hand"
          style={{
            transform: `rotate(${
              minDeg < prevMinDeg ? 360 + minDeg : minDeg
            }deg)`,
          }}
        ></div>
      </div>

      <div className="time-slot-buttons">
        {slots.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleTimeSlotClick(slot)}
            className={`button ${
              selectedTime === slot ? "button-selected" : ""
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimeSlot;
