/** * API for bookings */
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const bookingApi = {
  find: {
    auth: false,
    handler: async function () {
      return await db.bookingStore.getAllBookings();
    },
  },

  findOne: {
    auth: false,
    handler: async function (request) {
      const booking = await db.bookingStore.getBookingById(request.params.id);
      if (!booking) {
        return Boom.notFound("No booking with this id");
      }
      return booking;
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      const booking = await db.bookingStore.addBooking(request.payload);
      return h.response(booking).code(201);
    },
  },

  deleteAll: {
    auth: false,
    handler: async function () {
      await db.bookingStore.deleteAllBookings();
      return { success: true };
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request) {
      await db.bookingStore.deleteBookingById(request.params.id);
      return { success: true };
    },
  },
};