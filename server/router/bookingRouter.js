import express from "express";
import { Booking } from "../db/schema.js";

const router = express.Router();

router.post("/api/booking", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.get("/api/booking", async (req, res) => {
  try {
    const lastBooking = await Booking.find().sort({ _id: -1 }).limit(1);
    if (!lastBooking) {
      res.status(404).json({ status: "error", message: "No bookings found" });
    } else {
      res.status(200).json({ status: "success", data: lastBooking });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.all("*", (req, res) => {
  res.status(404).json({ status: "error", message: "Not found" });
});

export default router;
