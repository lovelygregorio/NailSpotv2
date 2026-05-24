/// MongoDB model for booking data
/**
 * This module defines the MongoDB store for managing booking data in the NailSpot application. It provides methods to interact with the MongoDB database to perform CRUD operations on booking data, including retrieving all bookings, adding a new booking, getting a booking by its ID, deleting a booking, and updating the status of a booking.
 *   The store uses Mongoose models to interact with the MongoDB 
 * collection for bookings.
 * */

import Mongoose from "mongoose";

// MongoDB store object for managing booking data
const { Schema } = Mongoose;

const bookingSchema = new Schema({
  customerName: String,
  customerContact: String,

  salonName: String,
  service: String,
  date: String,
  time: String,
  notice: String,

  status: {
    type: String,
    default: "Pending",
  },

  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Booking = Mongoose.model("Booking", bookingSchema);