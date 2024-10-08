import "./BookTheShow.css";

import { useContext, useState } from "react";
import { bookingContext } from "../../App";
import ShowAlert from "../showAlert/ShowAlert";
import axios from "axios";
import Spinner from "../spinner/Spinner";

function BookTheShow() {
  // const URL = "https://bookmyshow-fdtn.onrender.com";
  const URL = "https://bookmyshow-fdtn.onrender.com";

  const {
    selectedMovie,
    selectedTime,
    selectedSeats,
    setPreviousBooking,
    reset,
  } = useContext(bookingContext);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertKey, setAlertKey] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function bookTheShow() {
    function setAlert(code, message) {
      setBookingStatus(() => code);
      setAlertMessage(() => message);
      setAlertKey(new Date().getTime());
    }

    if (!selectedMovie) {
      setAlert("error", "Please select a Movie");
      return;
    }

    if (!selectedTime) {
      setAlert("error", "Please select a Time Slot");
      return;
    }

    if (
      Object.keys(selectedSeats).every((key) => selectedSeats[key].length === 0)
    ) {
      setAlert("error", "Please select at least one seat");
      return;
    }

    setIsLoading(() => true);

    try {
      const res = await axios({
        method: "post",
        url: `${URL}/api/booking`,
        data: {
          movie: selectedMovie,
          slot: selectedTime,
          seats: selectedSeats,
        },
      });
      // console.log(res);

      if (
        res.status === 200 ||
        res.status === 204 ||
        res.data ||
        res.status === "success"
      ) {
        setAlert(
          "success",
          `Booking successful, (${selectedMovie.title} at ${selectedTime})`
        );
        setPreviousBooking({
          movie: selectedMovie,
          slot: selectedTime,
          seats: selectedSeats,
        });
        reset();
      } else {
        setAlert("error", "Booking Failed, try again later");
      }
    } catch (err) {
      setAlert("error", "Booking Failed, try again later");
    } finally {
      setIsLoading(() => false);
    }
  }

  return (
    <>
      <div className="flex-v-center book-the-show">
        <button className="button button-cta" onClick={() => bookTheShow()}>
          {isLoading ? <Spinner /> : "Book Now"}
        </button>
      </div>
      {bookingStatus === "success" ? (
        <ShowAlert message={alertMessage} type="success" alertKey={alertKey} />
      ) : bookingStatus === "error" ? (
        <ShowAlert message={alertMessage} type="error" alertKey={alertKey} />
      ) : null}
    </>
  );
}

export default BookTheShow;

// /* eslint-disable react/prop-types */
// import "./ShowAlert.css";

// import { useEffect, useState } from "react";
// // import { BiSolidError } from "react-icons/bi";
// import { MdError } from "react-icons/md";
// import { FaCheckCircle } from "react-icons/fa";

// function ShowAlert({ message, type = "error" }) {
//   const [isOpen, setIsOpen] = useState(true);

//   const handleClose = () => {
//     setIsOpen(() => false);
//   };

//   useEffect(() => {
//     const timeOutId = setTimeout(() => {
//       setIsOpen(() => false);
//     }, 10000);

//     return () => clearTimeout(timeOutId);
//   }, []);

//   return (
//     <div
//       className={`alert-container container-${type} flex-v-center ${
//         !isOpen ? "hide-alert" : ""
//       }`}
//     >
//       {type === "error" ? (
//         <MdError className="alert-icon-error" />
//       ) : (
//         <FaCheckCircle className="alert-icon-success" />
//       )}
//       <p>{message}</p>
//       <button className="alert-button" onClick={() => handleClose()}>
//         Ok
//       </button>
//     </div>
//   );
// }

// export default ShowAlert;
