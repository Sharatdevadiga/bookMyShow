import { useContext } from "react";
import "./Navbar.css";
import Navlinks from "./Navlinks";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { bookingContext } from "../../App";

function Navbar() {
  const { isHamOpen, setIsHamOpen } = useContext(bookingContext);

  const handleHamClick = () => {
    setIsHamOpen((isHamOpen) => !isHamOpen);
  };

  const closeHam = () => {
    setIsHamOpen(false);
  };

  return (
    <div className="nav-container">
      <div className="nav">
        <img className="nav-logo" src="/bookmyshow-white.png" alt="" />
      </div>
      <div className="nav-button-container">
        <Navlinks />
      </div>
      <button className="ham-button" onClick={() => handleHamClick()}>
        {isHamOpen ? (
          <IoClose className="ham-icon" />
        ) : (
          <HiMiniBars3BottomRight className="ham-icon" />
        )}
      </button>
      {isHamOpen ? (
        <>
          <div className="nav-bar-container-mobile">
            <Navlinks closeHam={closeHam} />
          </div>
          <div className="hamOverlay" onClick={() => closeHam()}></div>
        </>
      ) : null}
    </div>
  );
}

export default Navbar;
