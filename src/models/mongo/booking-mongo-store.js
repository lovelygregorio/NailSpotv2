/** * MongoDB store for managing booking data.
 *
 * This module defines the `bookingMongoStore` object, which provides methods for interacting with the MongoDB database to perform CRUD operations on booking data. It includes methods to retrieve all bookings, add a new booking, get a booking by its ID, delete a booking, and update the status of a booking. The store uses Mongoose models to interact with the MongoDB collection for bookings.
 * 
 */

import { Booking } from "./booking.js";

// MongoDB store object for managing booking data
export const bookingMongoStore = {

  async getAllBookings() {
    return Booking.find().lean();
  },

  async addBooking(booking) {
    const newBooking = new Booking(booking);
    return newBooking.save();
  },

  async getBookingById(id) {
    return Booking.findOne({ _id: id }).lean();
  },

  async deleteBooking(id) {
    try {
      await Booking.deleteOne({ _id: id });
    } catch {
      console.log("bad id");
    }
  },
  async updateBookingStatus(id, status) {
  const booking = await Booking.findById(id);

  if (booking) {
    booking.status = status;
    await booking.save();
  }

  return booking;
},

};