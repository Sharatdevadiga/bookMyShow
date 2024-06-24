import { useContext } from "react";
import "./SliderButton.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { bookingContext } from "../../App";

function SliderButton() {
  const { isPrevBookingOpen, setIsPrevBookingOpen } =
    useContext(bookingContext);

  const handleClick = () => {
    setIsPrevBookingOpen(!isPrevBookingOpen);
  };

  return (
    <div className="slider-button-container">
      <button className="slider-button" onClick={handleClick}>
        {isPrevBookingOpen ? (
          <FaAngleRight className="slider-icon" />
        ) : (
          <FaAngleLeft className="slider-icon" />
        )}
      </button>
      <div className="slider-text flex-v-center">
        <p>prev</p>
        <p>booking</p>
      </div>
    </div>
  );
}

export default SliderButton;
