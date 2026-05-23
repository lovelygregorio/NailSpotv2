import { Booking } from "./booking.js";

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