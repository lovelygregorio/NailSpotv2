/** * Controller for handling booking-related operations.
 *
 * This controller manages the booking process, 
 * including displaying bookings,  
 * adding new bookings, and canceling existing bookings.
 * It interacts with the database to retrieve and manipulate booking data, 
 * and renders appropriate views for the user.        
 * 
 */
import { db } from "../models/db.js";

export const bookingController = {

  index: {
    handler: async function (request, h) {

      const loggedInUser = request.auth.credentials;

      const bookings = await db.bookingStore.getAllBookings();

      const bookingsWithOwnership = bookings.map((booking) => ({
        ...booking,
        canCancel: String(booking.userid) === String(loggedInUser._id),
      }));

      return h.view("booking-view", {
        title: "Booking Board",
        user: loggedInUser,
        bookings: bookingsWithOwnership,
      });
    },
  },

  // Handler function to add a new booking for the logged-in user
  addBooking: {
    handler: async function (request, h) {

      const loggedInUser = request.auth.credentials;

      const booking = {
        salonName: request.payload.salonName,
        service: request.payload.service,
        date: request.payload.date,
        time: request.payload.time,
        contact: request.payload.contact,
        notice: request.payload.notice,
        status: "Pending",
        userid: loggedInUser._id,
      };

      await db.bookingStore.addBooking(booking);

      return h.redirect("/bookings");
    },
  },

  // Handler function to cancel an existing booking for the logged-in user
  cancelBooking: {
    handler: async function (request, h) {

      await db.bookingStore.deleteBooking(request.params.id);

      return h.redirect("/bookings");
    },
  },
  
  accept: {
  handler: async function (request, h) {
    await db.bookingStore.updateBookingStatus(request.params.id, "Appoitment Confirmed");
    return h.redirect("/dashboard");
  },
},

reject: {
  handler: async function (request, h) {
    await db.bookingStore.updateBookingStatus(request.params.id, "Unavailable");
    return h.redirect("/dashboard");
  },
},

};