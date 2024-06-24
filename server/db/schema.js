import { Schema } from "mongoose";
import mongoose from "mongoose";

const bookMovieSchema = new Schema({
  movie: {
    title: { type: String, required: true },
    poster: { type: String, required: true },
  },
  slot: { type: String, required: true },
  seats: {
    A1: { type: [Number], default: [] },
    A2: { type: [Number], default: [] },
    A3: { type: [Number], default: [] },
    A4: { type: [Number], default: [] },
    D1: { type: [Number], default: [] },
    D2: { type: [Number], default: [] },
  },
});

export { bookMovieSchema };

export const Booking = mongoose.model("bookmovietickets", bookMovieSchema);
