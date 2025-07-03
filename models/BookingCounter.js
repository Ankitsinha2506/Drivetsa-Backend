// models/BookingCounter.js
import mongoose from "mongoose";

const bookingCounterSchema = new mongoose.Schema({
  globalCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const BookingCounter = mongoose.model("BookingCounter", bookingCounterSchema);
export default BookingCounter;
