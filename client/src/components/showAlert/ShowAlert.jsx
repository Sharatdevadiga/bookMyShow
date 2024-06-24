/* eslint-disable react/prop-types */
import "./ShowAlert.css";

import { useContext, useEffect, useState } from "react";
// import { BiSolidError } from "react-icons/bi";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { bookingContext } from "../../App";

function ShowAlert({ message, type = "error", alertKey }) {
  const [isOpen, setIsOpen] = useState(true);
  const { setIsPrevBookingOpen } = useContext(bookingContext);

  const handleClose = () => {
    if (type === "success") setIsPrevBookingOpen((isOpen) => !isOpen);
    setIsOpen(() => false);
  };

  useEffect(() => {
    setIsOpen(true);
  }, [message, type, alertKey]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timeOutId);
  }, [isOpen]);

  return (
    <div
      className={`alert-container container-${type} flex-v-center ${
        !isOpen ? "hide-alert" : ""
      }`}
    >
      {type === "error" ? (
        <MdError className="alert-icon-error" />
      ) : (
        <FaCheckCircle className="alert-icon-success" />
      )}
      <p>{message}</p>
      <button className="alert-button" onClick={() => handleClose()}>
        Ok
      </button>
    </div>
  );
}

export default ShowAlert;
