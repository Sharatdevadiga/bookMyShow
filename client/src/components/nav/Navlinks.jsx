import { useContext } from "react";
import { bookingContext } from "../../App";
import smoothScrollTo from "../../util/smoothScroll";

// eslint-disable-next-line react/prop-types
function Navlinks({ closeHam = null }) {
  const { setIsPrevBookingOpen } = useContext(bookingContext);

  const handleClick = (id) => {
    if (closeHam) {
      closeHam();
    }
    smoothScrollTo(id, 1000);
  };

  return (
    <>
      <button className="nav-button" onClick={() => handleClick("home", 1000)}>
        Home
      </button>
      <button
        className="nav-button"
        onClick={() => {
          if (closeHam) closeHam();
          setIsPrevBookingOpen((isOpen) => !isOpen);
        }}
      >
        Prev booking
      </button>
      <button
        className="nav-button"
        onClick={() => handleClick("footer", 1000)}
      >
        Contact
      </button>
      <button
        className="nav-button button-cta"
        onClick={() => handleClick("movieSelector", 500)}
      >
        Book Now
      </button>
    </>
  );
}

export default Navlinks;
