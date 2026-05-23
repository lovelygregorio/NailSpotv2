import Mongoose from "mongoose";

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